<template>
  <div class="user-bundlephone">
    <v-head title="绑定手机"></v-head>
    <sift-nav></sift-nav>
    <div class="padding-left-10 bg-white">
      <div class="text-md border-b-ddd">
        <input placeholder="请输入手机号码" type="number" v-model="phone">
      </div>
      <div class="validate ofh text-md border-b-ddd">
        <input placeholder="请输入验证码" type="number" v-model="code">
        <div class="verify bg-green" @click="getCode" v-show="time===0">点击获取验证码</div>
        <div class="verify bg-gray" v-show="time"><span>{{time}}</span>s秒后重新获取</div>
      </div>
      <div class="tips" v-show="isModalVisible==='msg'">
        <p class="c-orange text-sm"><i class="icon bulb-icon"></i>验证码错误,请重新输入</p>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="btn bg-white" @click="$router.back()">取消</div>
      <div @click="submitPhone" class="btn bg-blue">确定</div>
    </div>
    <modal @close="closeModal" content="您已成功绑定手机" hidebtns='true' :hlight="phone"
           imgurl='../../assets/success.png' title="绑定成功" v-show="isModalVisible===true"/>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Modal from '../../components/Modal.vue'
  import util from '../../common/util'
  import Toast from '../../common/toast'
  import { http } from '../../store/Http'
  import { mapState } from 'vuex'

  export default {
    name: 'bundlephone',
    data () {
      return {
        isModalVisible: false,
        phone: '',
        code: '',
        time: 0
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      submitPhone () {
        if (util.isMobile(this.phone) === false) {
          Toast('手机号错误')
          return
        }
        if (util.smsValid(this.code) === false) {
          Toast('验证码错误')
          return
        }
        // 提交验证码和手机号
        http.get('op/Capttcha.json', {
          validateNum: this.code,
          mobile: this.phone
        }).then(val => {
          if (val.data.Capttcha) {
            this.isModalVisible = true
          } else {
            this.isModalVisible = 'msg'
          }
        })
      },
      closeModal () {
        this.$router.back()
      },
      getCode () {
        if (this.time !== 0) return
        if (util.isMobile(this.phone) === false) {
          Toast('手机号错误')
          return
        }
        if (this.phone === this.info.uaMobile) {
          Toast('与当前手机号相同,无需修改')
          return
        }

        // 获取验证码
        http.get('op/Capttcha.json', {
          mobile: this.phone
        })
        let s = 60
        const ti = setInterval(() => {
          if (s === 0) {
            clearInterval(ti)
          } else {
            this.time = --s
          }
        }, 1000)
      }
    },
    components: {VHead, SiftNav, Modal}
  }
</script>
<style lang="scss">
  .user-bundlephone {
    .vhead {
      background-color: $blue;
      color: #fff;
    }

    .bg-white > div {
      height: 44px;
      line-height: 44px;

      .icon {
        margin-bottom: 2px;
        margin-right: 5px;
      }

    }

    .validate {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      > input {
        width: 70%;
      }

      > .verify {
        margin: 0 10px;
        width: 30%;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        font-size: 12px;
        text-align: center;
      }

      .bg-green {
        background-color: #1bae19;
        color: white;
      }

      .bg-gray {
        background-color: gray;
        color: #333333;
      }
    }
  }


</style>
