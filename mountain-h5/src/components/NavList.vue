<template>
  <div class="navlist">
    <router-link to="/points" class="col">
      <img src="../assets/home/img01.png" alt="">
      <p>用户签到</p>
    </router-link>
    <router-link to="跳转第三方系统" class="col">
      <img src="../assets/home/img02.png" alt="">
      <p>物业缴费</p>
    </router-link>
    <router-link to="warranty" class="col">
      <img src="../assets/home/img03.png" alt="">
      <p>报事报修</p>
    </router-link>
    <router-link to="/library" class="col">
      <img src="../assets/home/img14.png" alt="">
      <p>共享空间</p>
    </router-link>
    <router-link to="/message" class="col">
      <img src="../assets/home/img11.png" alt="">
      <p>我的消息</p>
    </router-link>
    <router-link to="/quest_survey" class="col">
      <img src="../assets/home/img05.png" alt="">
      <p>问卷调查</p>
    </router-link>
    <router-link to="缺失" class="col">
      <img src="../assets/home/img07.png" alt="">
      <p>访客系统</p>
    </router-link>
    <router-link to="/notice" class="col">
      <img src="../assets/home/img08.png" alt="">
      <p>社区公告</p>
    </router-link>
    <router-link to="/phone_list" class="col">
      <img src="../assets/home/img04.png" alt="">
      <p>便民电话</p>
    </router-link>
    <router-link to="/points" class="col">
      <img src="../assets/home/img09.png" alt="">
      <p>我的积分</p>
    </router-link>
    <router-link to="/mall" class="col">
      <img src="../assets/home/img10.png" alt="">
      <p>积分商城</p>
    </router-link>
    <router-link to="/list_house" class="col">
      <img src="../assets/home/img12.png" alt="">
      <p>我的房屋</p>
    </router-link>
    <router-link to="/mine" class="col">
      <img src="../assets/home/img13.png" alt="">
      <p>业主中心</p>
    </router-link>
  </div>
</template>

<script>
  import router from '../router/index';
  export default {
    name: 'navlist',
    methods: {
    }
  }
</script>

<style lang="scss">
.navlist {
  overflow: hidden;
  padding: 10px 0;
  background-color: $white;
  text-align: center;
  font-size: 14px;
  .col {
    float: left;
    padding: 10px;
    width: 25%;
    img {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    p {
      padding: 5px 0;
      color: #333;
    }
  }
}
</style>
