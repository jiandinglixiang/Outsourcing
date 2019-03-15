<template>
  <div class="buildings-choosehouse">
    <v-head title="选择房屋"></v-head>
    <sift-nav></sift-nav>
    <div class="top-row margin-bottom-10 bg-white">
      <div class="tit">已选择:<span>优胜美地小区</span></div>
    </div>
    <ul class="padding-left-10 bg-white">
      <li :key="index" @click="addHousing(n)" class="card" v-for="(n,index) in list">
        <div class="tit ofh margin-bottom-10">
          <div class="fl">{{n.hoItem}}</div>
          <div class="fr c-gray">房屋1</div>
        </div>
        <div class="row">
          <div class="col margin-bottom-5 c-gray">房号:{{`#${n.hoBuildNumber}#${n.hoUnit}单元${n.hoRoomNumber}室`}}</div>
          <div class="col margin-bottom-5 c-gray">房型:三室</div>
        </div>
        <div class="row">
          <div class="col margin-bottom-5 c-gray">已绑定住户:3</div>
          <div class="col margin-bottom-5 c-gray">业主:test</div>
        </div>
      </li>
      <!--<li class="card">-->
      <!--<div class="tit ofh margin-bottom-10">-->
      <!--<div class="fl">优胜美地小区一期</div>-->
      <!--<div class="fr c-gray">房屋2</div>-->
      <!--</div>-->
      <!--<div class="row">-->
      <!--<div class="col margin-bottom-5 c-gray">房号:#12#2301室</div>-->
      <!--<div class="col margin-bottom-5 c-gray">房型:三室</div>-->
      <!--</div>-->
      <!--<div class="row">-->
      <!--<div class="col margin-bottom-5 c-gray">已绑定住户:3</div>-->
      <!--<div class="col margin-bottom-5 c-gray">业主:test</div>-->
      <!--</div>-->
      <!--</li>-->
    </ul>
    <!--<div class="fixed-bottom">-->
    <!--<div class="btn bg-blue">房屋认证</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { http } from '../../store/Http'
  import { HousingData } from '../../common/city'

  export default {
    name: 'chooseHouse',
    data () {
      return {
        list: []
      }
    },
    methods: {
      addHousing (item) {
        HousingData.add({
          housing: JSON.parse(JSON.stringify(item))
        })
        this.$router.back()
      }
    },
    created () {
      http.get('op/getHouseInfo.json', {
        hoType: 0,
        itemId: this.$route.query.itemId
      }).then(data => {
        this.list = data.data
      })
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
  .buildings-choosehouse {
    .vhead {
      background-color: $blue;
      color: $white;
    }

    .top-row {
      position: relative;
      padding: 0 40px 0 15px;
      height: 50px;
      line-height: 50px;

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
    }

    .card {
      padding: 17px 10px 15px 5px;
      border-top: 1px solid #ddd;

      &:first-child {
        border-top: 0;
      }
    }
  }

</style>
