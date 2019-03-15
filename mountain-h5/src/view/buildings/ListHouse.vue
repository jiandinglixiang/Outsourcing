<template>
  <div class="buildings-listhouse">
    <v-head title="选择房屋"  hideNav="1">
      <span v-show="list.length"
            slot="headRight"
            style="position: absolute;right: 0; top: 0; padding: 0 10px;"
            @click="saveName">保存</span>
    </v-head>
    <div class="top-row margin-bottom-10 bg-white">
      <div class="tit"><span>{{topList}}</span></div>
    </div>
    <div class="padding-left-10 bg-white">
      <div class="card" v-for="(n,index) in list" :key="index">
        <input name="optionsRadios" type="radio" :value="n.hoNo" v-model="optOfr">
        <div class="tit ofh margin-bottom-10">
          <div class="fl">{{n.hoItem}}</div>
          <div class="fr c-gray">房屋1</div>
        </div>
        <div class="row">
          <div class="col margin-bottom-5 c-gray">房号:{{`#${n.hoBuildNumber}#${n.hoRoomNumber}室`}}</div>
          <div class="col margin-bottom-5 c-gray">房型:三室</div>
        </div>
        <div class="row">
          <div class="col margin-bottom-5 c-gray">已绑定住户:{{n.hoCount}}</div>
          <div class="col margin-bottom-5 c-gray">业主:test</div>
        </div>
      </div>
    </div>
    <div class="img-tip data-null" v-if="list.length===0">
      <img alt="" src="../../assets/buildings/null.png">
      <p>暂无房屋认证,请先提交房屋认证</p>
    </div>
    <router-link to="/housing_certification" tag="div" class="fixed-bottom">
      <div class="btn bg-blue">房屋认证</div>
    </router-link>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { http } from '../../store/Http'

  export default {
    name: 'listhouse',
    data () {
      return {
        list: [],
        optOfr: ''
      }
    },
    computed: {
      topList () {
        const index = this.list.findIndex(i => i.hoUsed > 0)
        if (index === -1) return '暂无'
        this.optOfr = this.list[index].hoNo
        return `选中${this.list[index].hoItem}`
      }
    },
    methods: {
      getList () {
        http.get('op/myHouseList.json',
          {itemId: '1'}).then(data => {
          this.list = [] || data.data
        })
      },
      saveName () {
        // 修改默认房屋
        http.get('op/succeed.json',
          {itemId: '1'}).then(data => {
          this.getList()// 更新
        })
      }
    },
    created () {
      this.getList()
    },
    components: {VHead, SiftNav}
  }
</script>
<style lang="scss">
  .buildings-listhouse {
    padding-bottom: 60px;

    .vhead {
      background-color: $blue;
      color: $white;
    }

    .top-row {
      position: relative;
      padding: 0 40px 015px;
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
      position: relative;
      padding: 15px 10px 15px 30px;
      border-top: 1px solid #ddd;

      &:first-child {
        border-top: 0;
      }

      input[type="radio"] {
        position: absolute;
        left: 0;
        top: 15px;
      }
    }
  }

</style>
