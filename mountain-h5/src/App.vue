<template>
  <div :style="device" id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  import { http } from './store/Http'
  import wxInit from './common/wxjs'
  import { GET_USER_INFO, LOGIN_WEB_SERVER, SET_WX_INFO_DATA } from './store/user/types'

  export default {
    name: 'App',
    computed: {
      ...mapState({
        device: state => `height: 100%;width:${ state.home.Device.width }px;min-height:${ state.home.Device.height }px;`
      })
    },
    methods: {
      ...mapActions({
        login: LOGIN_WEB_SERVER,
        getInfo: GET_USER_INFO
      }),
      ...mapMutations({
        setWxInfo: SET_WX_INFO_DATA
      })
    },
    mounted () {
      if (this.$route.query.code) {
        http.get('op/succeed.json', {
          code: this.$route.query.code
        }).then(val => {
          val = {
            isSing: 1,//是否绑定手机号
            wxName: '测试微信名称',// 微信名字
            wxImg: 'http://placehold.it/152x220',//微信头像
            wxOpenId: 'wxd32b4e7c28f0800a',// 用户wxid
            appId: 'wxd32b4e7c28f0800a', // 必填，公众号的唯一标识
            timestamp: '1552151564', // 必填，生成签名的时间戳
            nonceStr: 'CyMt5V2qXcYQbRea', // 必填，生成签名的随机串
            signature: 'e350c62a6f936a6742cc9aceff1db552e16770f0',// 必填，签名
          }
          this.setWxInfo(val)
          wxInit({
            appId: val.appId,
            timestamp: val.timestamp,
            nonceStr: val.nonceStr,
            signature: val.signature,
          })
          if (val.isSing === 1) {
            // 注册绑定手机号过 登陆
            this.login({ wxOpenId: val.wxOpenId }).then(data => {
              this.getInfo({ wxOpenId: val.wxOpenId })// 获取个人信息
            })
          } else if (val.isSing === 0) {
            // 未绑定
            this.$router.push({ path: '/phone_num' })
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import './assets/css/init.scss';
  @import './style/common.css';
  @import './style/animate.css';
</style>
