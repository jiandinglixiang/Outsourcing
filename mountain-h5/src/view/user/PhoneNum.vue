<template>
  <div class="user-phone-num-back">
    <div class="vhead">
      <span @click="goBack" class="back-icon"></span>
    </div>
    <div class="bd">
      <div class="margin-bottom-10 text-mx">绑定手机号</div>
      <div class="margin-bottom-10 picture"><img alt="" :src="wxInfo.wxImg"></div>
      <div class="name">{{ wxInfo.wxName}}</div>
      <div class="form">
        <div class="margin-bottom-15 tit">帐号需要绑定业主手机号</div>
        <div class="input-text">
          <input type="number" v-model="Mobile">
        </div>
        <div class="btns">
          <div class="btn bg-blue" @click="getCapttcha">获取验证码</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { mapState } from 'vuex'
  import util from '../../common/util'
  import Toast from '../../common/toast'
  import http from '../../store/Http'

  export default {
    name: 'phonenum',
    data () {
      return {
        Mobile: ''
      }
    },
    computed: {
      ...mapState({
        wxInfo: state => state.user.wxInfo
      })
    },
    methods: {
      goBack () {
        this.$router.replace({path: '/mine'})
      },
      getCapttcha () {
        // 获取验证码
        if (util.isMobile(this.Mobile)) {
          // 获取验证码
          http.get('op/Capttcha.json', {Mobile: this.Mobile}).then(() => {
            Toast('短信已发送').then(() => {
              this.$router.push({path: '/code', query: {mobile: this.Mobile, code: this.$route.query.code}})
            })
          })
        } else {
          Toast('需验证业主手机')
        }
      }
    },
    components: {VHead}
  }
</script>
<style lang="scss" scoped>
  @import "../../style/icon.css";

  .user-phone-num-back {
    min-height: 100vh;
    width: 100%;
    background-image: url(../../assets/bg01.png);
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
        top: 5px;
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
        width: 80px;
        height: 80px;
      }
    }

    .form {
      padding-top: 30px;

      .tit {
        color: #bab6b6;
      }

      .input-text {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 20px;

        input {
          background-color: transparent;
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
