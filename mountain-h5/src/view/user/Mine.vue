<template>
  <div class="user-mine">
    <div class="top-bg">
      <v-head :back="back" hideNav="true" title=""/>
      <div class="mine-top bg-size-cover">
        <div @click.stop="isLogin" class="top-info" data-top='y' v-if="info.uaMobile">
          <img alt="" class="portrait" data-route="route" data-to="/information" src="http://placehold.it/160">
          <div class="username text-center" data-route="route" data-to="/information">{{
            info.uaRealName||info.uaNickName}}
          </div>
          <hr>
          <div class="addr ellipsis c-gray" data-query="add,1" data-route="route" data-to="/list_house">
            当前房源：{{info.uaMyHouse || '' }}
          </div>
        </div>
        <div class="welcome" v-else>
          <div class="margin-bottom-10 text-mx"><b>Hi~欢迎来到业主中心</b></div>
          <p class="">愿您的每一天都是阳光明媚</p>
          <!--<a class="btn bg-green"-->
          <!--href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd32b4e7c28f0800a&redirect_uri=http%3A%2F%2F172.16.3.30%3A6161%2Fmine&response_type=code&scope=snsapi_userinfo&state=%7Ba%3A1%7D#wechat_redirect"><i-->
          <!--class="icon wechat-icon"></i>微信登录</a>-->
          <a class="btn bg-green"
             href="http://localhost:6161/mine?code=1321321132132113213211321321"><i
            class="icon wechat-icon"></i>微信登录</a>
        </div>

      </div>
    </div>
    <div @click.stop="isLogin" class="info row margin-bottom-10 bg-white text-center" data-top='y'>
      <div class="col border-right" data-route="route" data-to="/Ccertified">
        <div class="tit">认证住户</div>
        <div class="c-gray">{{info.uaHouseholdCount ? `${info.uaHouseholdCount}人`:'无'}}</div>
      </div>
      <div class="col border-right" data-to="/list_house">
        <div class="tit">我的房屋</div>
        <div class="c-gray">{{info.uaMyHouseCount? `${info.uaMyHouseCount}套`: '无'}}</div>
      </div>
      <div class="col" data-to="/information">
        <div class="tit">联系电话</div>
        <div class="c-gray">{{info.uaMobile|| '无'}}</div>
      </div>
    </div>
    <ul @click.stop="isLogin" class="padding-left-12 bg-white sub-nav" data-top='y'>
      <li class="control border-b-ddd" data-route="route" data-to="/my_maintaining">
        <div class="tit"><i class="icon service-icon"></i>我的报修</div>
        <span class="msg bg-red text-sm">12</span>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/library/borrow">
        <div class="tit"><i class="icon close-icon"></i>我的租借</div>
        <span class="msg bg-red text-sm">12</span>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/library/donate_book">
        <div class="tit"><i class="icon close-icon"></i>我的共享</div>
        <span class="msg bg-red text-sm">12</span>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/mine">
        <div class="tit"><i class="icon bill-icon"></i>我的账单</div>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/pay/order_list">
        <div class="tit"><i class="icon close-icon"></i>我的订单</div>
        <span class="msg bg-red text-sm">12</span>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/message">
        <div class="tit"><i class="icon message-icon"></i>我的消息</div>
        <span class="msg bg-red text-sm">3</span>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/points">
        <div class="tit"><i class="icon coin-icon"></i>我的积分</div>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/information">
        <div class="tit"><i class="icon info-icon"></i>个人信息</div>
      </li>
      <li class="control border-b-ddd" data-route="route" data-to="/about_us">
        <div class="tit"><i class="icon set-icon"></i>关于我们</div>
      </li>
      <li class="control" data-route="route" data-to="/set" v-show="info.uaMobile">
        <div class="tit"><i class="icon set-icon"></i>设置</div>
      </li>
    </ul>
    <div @click="loginOut" class="fixed-bottom bottom-btn text-center bg-white" v-if="info.uaMobile">安全退出</div>
    <div class="showModal" v-if="showModal">
      <div class="child">
        <img alt="" src="../../assets/表情.png" width="100">
        <p style="font-weight: bold;font-size: 1.5em;">恭喜您已成功绑定</p>
        <p>{{info.uaMobile}}</p>
        <button @click="closeModal">进入业主中心</button>
      </div>
      <div @click="closeModal" class="modal-child"></div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { mapState } from 'vuex'
  import Modal from '../../components/Modal'
  import Toast from '../../common/toast'
  import { eventNo } from '../../common/util'

  export default {
    name: 'mine',
    data () {
      const showModal = localStorage.getItem('oneMobile') === '1'
      showModal && localStorage.removeItem('oneMobile')
      return {
        showModal
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info,
        wxInfo: state => state.user.wxInfo
      })
    },
    methods: {
      back () {
        this.$router.replace({ path: '/' })
      },
      loginOut () {
        location.reload()
      },
      closeModal (event) {
        event.stopPropagation()
        this.showModal = false
      },
      isLogin (event) {
        if (!this.info.uaMobile) {
          Toast('请登陆')
          return false
        }
        // 事件捕获禁止冒泡
        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break//到达捕获就结束for
            if (event.path[i].dataset.route) {
              if (event.path[i].dataset.query) {
                const query = event.path[i].dataset.query.split(',')
                let obj = {}
                for (let i = 0; i < query.length; i += 2) {
                  obj[query[i]] = query[i + 1]
                }
                this.$router.push({ path: event.path[i].dataset.to, query: obj })
              } else {
                this.$router.push({ path: event.path[i].dataset.to })
              }
              break
            }
          }
        }
      }
    },
    components: { Modal, VHead }
  }
</script>
<style lang="scss">
  .user-mine {
    margin-bottom: 60px;

    .showModal {
      > div.modal-child {
        position: fixed;
        background-color: rgba(51, 51, 51, 0.5);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
      }

      > div.child {
        z-index: 1;
        background-color: white;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 256px;
        text-align: center;
        padding: 10px;
        border-radius: 10px;

        > button {
          background-color: #4297e8;
          color: white;
          width: 80%;
          font-weight: bold;
          line-height: 40px;
          border-radius: 15px;
        }
      }
    }

    .top-bg {
      height: 211px;
      background: #f2f2f2 url(../../assets/user/bg.png) top center no-repeat;
      background-size: cover;
    }

    .vhead {
      background: transparent;
      color: $white;
    }

    .info {
      padding: 10px 0;

      .border-right {
        border-right: 1px solid $cddd;
      }

      .col {
        padding: 12px 0;

        .tit {
          margin-bottom: 5px;
        }
      }
    }

    .mine-top {
      .top-info {
        position: relative;
        padding-top: 90px;
        height: 166px;
      }

      .portrait {
        width: 80px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 3px;
        margin-left: -40px;
        border-radius: 100%;
      }

      .username {
        padding-bottom: 10px;
        font-size: 16px;
        color: $white;
      }

      hr {
        margin: 0;
        border-top: 1px solid #000;
        border-bottom: 1px solid #494e52;
      }

      .addr {
        position: relative;
        padding-left: 11px;
        padding-right: 40px;
        height: 43px;
        line-height: 43px;

        &:after {
          position: absolute;
          content: '';
          top: 50%;
          margin-top: -10px;
          right: 10px;
          content: '';
          width: 20px;
          height: 20px;
          background: url(../../assets/icon/arrow_right_white.png) no-repeat;
          background-size: cover;
        }
      }
    }

    .welcome {
      padding: 30px 20px 0;
      color: #fff;

      .icon {
        margin-bottom: 2px;
        margin-right: 10px;
      }

      .btn {
        margin-top: 25px;
        display: inline-block;
        padding: 0 25px;
        width: auto;
        height: 40px;
        line-height: 40px;
      }

      .bg-green {
        background-color: #1bae19;
        border-radius: 20px;
      }
    }

    .sub-nav {
      .control {
        display: block;
        color: #333;
      }
    }

    .control {
      position: relative;
      height: 45px;
      padding-right: 70px;
      font-size: 16px;

      .tit {
        line-height: 45px;
      }

      .icon {
        margin-bottom: 2px;
        margin-right: 10px;
        padding: 0 15px 0 5px;
      }

      &:after {
        position: absolute;
        top: 50%;
        margin-top: -10px;
        right: 14px;
        content: '';
        width: 20px;
        height: 20px;
        background: url(../../assets/icon/arrow_right_black.png) no-repeat;
        background-size: cover;
      }

      .msg {
        display: inline-block;
        position: absolute;
        right: 40px;
        top: 50%;
        margin-top: -10px;
        padding: 2px 6px;
        border-radius: 10px;
        color: $white;
      }
    }
  }
</style>
