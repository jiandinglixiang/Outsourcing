<template>
  <div class="user-phone-num-back">
    <div class="vhead">
      <span @click="goBack" class="back-icon"></span>
    </div>
    <div class="bd">
      <div class="margin-bottom-10 text-mx">绑定手机号</div>
      <div class="margin-bottom-10 picture"><img :src="info.wxImg" alt=""></div>
      <div class="name">{{ info.wxName}}</div>
      <div class="form">
        <div class="margin-bottom-15">已发送验证码至 <span>{{Mobile}}</span></div>
        <div @click="addCode" class="margin-bottom-10 input-num">
          <div data-index="0">{{code[0]}}</div>
          <div data-index="1">{{code[1]}}</div>
          <div data-index="2">{{code[2]}}</div>
          <div data-index="3">{{code[3]}}</div>
          <div data-index="4">{{code[4]}}</div>
          <div data-index="5">{{code[5]}}</div>
        </div>
        <div class="tips">重新发送（<span>{{time}}</span>s）</div>
        <div class="btns">
          <div @click="submit" class="btn bg-blue">提交</div>
        </div>
        <input @blur="blurCode"
               @input="inputCode"
               ref="codeInputNum"
               style="width: 1px;height: 1px;overflow: hidden;padding: 0;margin: 0;border: 0;position: absolute;left: -100%;"
               type="number">
      </div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { mapActions, mapMutations, mapState } from 'vuex'
  import Http from '../../store/Http'
  import Toast from '../../common/toast'
  import { GET_USER_INFO, LOGIN_WEB_SERVER, SET_INFO_DATA } from '../../store/user/types'

  export default {
    name: 'phonenum',
    data () {
      return {
        code: ['', '', '', '', '', ''],
        Mobile: this.$route.query.mobile,
        time: 60
      }
    },
    computed: {
      ...mapState({
        wxInfo: state => state.user.wxInfo,
        info: state => state.user.info
      })
    },
    methods: {
      ...mapMutations({
        setInfo: SET_INFO_DATA
      }),
      ...mapActions({
        login: LOGIN_WEB_SERVER,
        getInfo: GET_USER_INFO
      }),
      goBack () {
        if (!this.$route.query.mobile) {
          this.$router.replace({path: '/mine'})
        } else {
          this.$router.back()
        }
      },
      addCode () {
        this.code = ['|', '', '', '', '', '']; //视觉反馈
        this.$refs.codeInputNum.focus() //获取焦点
      },
      inputCode (event) {
        // console.log(event.data);
        if (event.inputType === 'insertText') {
          // 输入
          if (/^\d{1}$/.test(event.data)) {
            if (this.code[0] && this.code[0] === '|') {
              this.$set(this.code, 0, event.data)
            } else {
              let val = true;
              this.code = this.code.map(function (item) {
                if (val && item === '') {
                  val = !val;
                  return event.data
                }
                return item
              })
            }
          }
        } else if (event.inputType === 'deleteContentBackward') {
          // 删除
          if (this.code[0] && this.code[0] !== '|') {
            for (let i = 5; i >= 0; i--) {
              if (this.code[i] !== '') {
                this.$set(this.code, i, '');
                break
              }
            }
          }
        }
      },
      blurCode () {
        if (this.code[0] && this.code[0] === '|') {
          this.code = ['', '', '', '', '', '']
        }
      },
      submit () {
        if (this.code.every(i => /^\d{1}$/.test(i)) === false) {
          Toast('验证码错误');
          return
        }
        Http.get('op/register.json', {
          wxOpenId: this.wxInfo.wxOpenId,
          wxImg: this.wxInfo.wxImg,
          wxName: this.wxInfo.wxName,
          mobile: this.$route.query.mobile,
          validateNum: this.code.join('')
        }).then(val => {
          if (val.data) {
            localStorage.setItem('oneMobile', '1')
            // 注册绑定手机号过 登陆
            this.login({ wxOpenId: this.wxInfo.wxOpenId }).then(data => {
              return this.getInfo({ wxOpenId: this.wxInfo.wxOpenId })// 获取个人信息
            }).then(val => {
              this.$router.replace({ path: '/mine' })
            })
          }
        })
      }
    },
    created () {
      if (!this.$route.query.mobile) {
        this.$router.replace({path: '/mine'})
      }
    },
    mounted () {
      const time = setInterval(() => {
        if (this.time === 0) {
          clearInterval(time)
        } else {
          this.time--
        }
      }, 1000)
    },
    components: {VHead}
  }
</script>
<style lang="scss" scoped>
  @import "../../style/icon.css";

  .user-phone-num-back {
    min-height: 100vh;
    width: 100%;
    background-image: url(../../assets/bg02.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    position: relative;

    .vhead {
      position: absolute;
      left: 0;
      top: 0;
      height: 45px;
      width: 100%;
      background-color: transparent;

      .back-icon {
        position: absolute;
        left: 5px;
        top: 10px;
        background-size: 70% 70%;
        height: 35px;
        width: 35px;
      }
    }

    .bd {
      padding: 45px 18px 0 18px;
    }


    .picture {
      overflow: hidden;
      width: 80px;
      height: 80px;
      border-radius: 100%;

      img {
        width: 100%;
      }
    }

    .form {
      padding-top: 30px;

      .tit {
        color: #bab6b6;
      }

      .input-num {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        height: 50px;

        div {
          width: 50px;
          height: 50px;
          line-height: 50px;
          background-color: rgba(255, 255, 255, 0.2);
          text-align: center;
          color: #fff;
        }
      }

      .btns {
        margin-top: 20px;

        .btn {
          border-radius: 20px;
        }
      }
    }
  }
</style>
