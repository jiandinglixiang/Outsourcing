<template>
  <div class="sift-modal">
    <div class="panel">
      <div class="sift-close">
        <span class=" hd-close-icon" @click="closeNav"></span>
      </div>
      <div class="sift-panel">
          <router-link to="/"><div class="nav home-icon">驿站首页</div></router-link>
          <router-link to="/points"><div class="nav qd-icon">用户签到</div></router-link>
          <router-link to="跳转第三方系统"><div class="nav wyjf-icon">物业缴费</div></router-link>
          <router-link to="/warranty"><div class="nav bsbx-icon">报事报修</div></router-link>
          <router-link to="/library"><div class="nav gxkj-icon">共享空间</div></router-link>
          <router-link to="缺失"><div class="nav fkxt-icon">访客系统</div></router-link>
          <router-link to="/notice"><div class="nav sqgg-icon">社区公告</div></router-link>
          <router-link to="/phone_list"><div class="nav bmdh-icon">便民电话</div></router-link>
          <router-link to="/points"><div class="nav jf-icon">我的积分</div></router-link>
          <router-link to="/mall"><div class="nav jfsc-icon">积分商城</div></router-link>
          <router-link to="/list_house"><div class="nav fw-icon">我的房屋</div></router-link>
          <router-link to="/message"><div class="nav msg-icon">我的消息</div></router-link>
          <router-link to="/quest_survey"><div class="nav wjdc-icon">问卷调查</div></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router/index';
  export default {
    name: 'siftnav',
    methods: {
      closeNav () {
        document.documentElement.classList.remove('sift-move');
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/icon.css";
  .sift-modal {display: none;}
  .sift-move {
      height: 100%;
      overflow: hidden;
      animation: sift-body-move .5s 1 ease 0;
      -webkit-animation: sift-body-move .5s 1 ease 0;
      position: relative;
      left: -50%;
      body {
        height: 100%;
        overflow: hidden;
      }
      .panel {
        position: absolute;
        top: 0;
        left: 100%;
        width: 50%;
        height: 100%;
        z-index: 105;
      }
      .sift-modal {display: block;}
      .sift-close {
        position: absolute;
        top: 0;
        left:-45px;
        width: 45px;
        height: 45px;
        line-height: 45px;
        background-color: $blue;
        text-align: center;
        .hd-close-icon {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
      .sift-panel {
        overflow: hidden;
        height: 100%;
        background: #fff;
      }
  }
  .sift-back {
      animation: sift-body-back .2s 1 ease 0;
      -webkit-animation: sift-body-back .2s 1 ease 0;
      left: 0;
  }
  //show
  @keyframes sift-body-move {
    0% {left: 0;}
    100% {left: -50%;}
  }
  @-webkit-keyframes sift-body-move {
      0% {left: 0;}
      100% {left: -50%;}
  }
  //hide
  @keyframes sift-body-back {
    0% {left: -50%;}
    100% { left: 0;}
  }
  @-webkit-keyframes sift-body-back {
      0% {left: -50%;}
      100% {left: 0;}
  }
  .sift-panel {
    padding-left: 12px;
    .nav {
      position: relative;
      padding-left: 41px;
      height: 38px;
      line-height: 37px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #333;
      &:after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        width: 25px;
        height: 25px;
        background-size: cover;
      }
    }
  }
</style>
