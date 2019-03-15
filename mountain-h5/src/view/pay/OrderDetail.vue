<template>
	<div class="order-detail padding-bottom-50">
    <v-head title="订单详情" hideNav="true"></v-head>
    <div class="card bg-white margin-bottom-10">
      <div class="card-detail padding-left-20">
        <div :key="index" class="control curr" v-for="(n,index) in order.track">
          <div class="margin-bottom-3 text-normal">{{n.shtTitle}}</div>
          <p class="text-sm c-gray">{{n.createTime}}</p>
        </div>
        <div class="control curr">
          <div class="margin-bottom-3 text-normal">待支付</div>
        </div>
        <div class="control curr">
          <div class="margin-bottom-3 text-normal">待发货</div>
        </div>
        <div class="control">
          <div class="text-normal">待确认</div>
        </div>
      </div>
    </div>
    <div class="bg-white padding margin-bottom-10 info">
      <p>订单号: {{$route.query.shoNo}}</p>
      <p>配送方式: {{order.shoDeliveryState>0? '物业自提':'上门配送'}}</p>
      <p>取货地址: {{order.shoAddress}}</p>
    </div>
    <div class="bg-white padding  margin-bottom-10 content">
      <div class="thumb">
        <img :src="order.shoImg" alt="">
      </div>
      <div class="ct">
        <div class="l fl">
          <div class="tit text-md">{{ order.shoTitle }}</div>
          <p class="c-gray text-normal">{{ order.shoMemo }}</p>
        </div>
        <div class="r num text-right c-gray">x{{ order.shoStoreCount }}</div>
      </div>
    </div>
    <div class="bg-white padding-left-10 pay-info">
      <div class="row border-b-ddd">
        <div class="col">商品总额</div>
        <div class="col text-right">{{ order.shoSubTotal/order.shoStoreCount }}积分</div>
      </div>
      <div class="row">
        <div class="col">实付积分</div>
        <div class="col text-right c-red">{{ order.shoSubTotal }}积分</div>
      </div>
    </div>
    <div @click.stop="OrderAction" class="fixed-bottom row" data-top="y">
      <div class="col btn bg-white" data-value="1" v-show="order.shoState<=2">取消订单</div>
      <div class="col btn bg-red" data-value="4" v-show="order.shoState<=0">去支付</div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { http } from '../../store/Http'

  export default {
    name: 'orderDetail',
    data () {
      return {
        order: {
          track: []
        }
      }
    },
    computed: {},
    methods: {
      payOrder () {
        // 去支付
        MessageBox.confirm('去支付?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('支付成功')
          })
        })
      },
      unOrder () {
        // 取消订单
        MessageBox.confirm('确认取消订单?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('取消成功')
          })
        })
      },
      OrderAction (event) {
        if (event.target.attributes['data-top']) return
        if (event.target.attributes['data-value']) {
          if(event.target.attributes['data-value'].value==='1'){
            // 取消订单
            this.unOrder()
          }else if(event.target.attributes['data-value'].value==='4'){
            // 去支付
            this.payOrder()
          }
        }
      }
    },
    created () {
      if (this.$route.query.shoNo) {
        http.get('op/myGoodsOrderDetail.json', {
          itemId: '',
          shoNo: ''
        }).then(data => {
          this.order = data.data
        })
      }
    },
    components: {VHead}
  }
</script>
<style lang="scss">
.order-detail{
  .vhead {
    background-color: $blue;
    color: $white;
  }
  .card {
    padding: 18px 15px 5px;
  }
  .card-detail {
    position: relative;
    &:before {
      position: absolute;
      left: 0;
      top: 5px;
      content: '';
      width: 0;
      height: 160px;
      // height: 80%;
      border-left: 1px solid $cCcc;
    }
    .control {
      position: relative;
      height: 50px;
      &:before {
        position: absolute;
        top: 5px;
        left: -25px;
        content: '';
        width: 11px;
        height: 11px;
        border-radius: 100%;
        background: $cCcc;
      }
      >div {
        color: $c999;
        &.c-red {
          color: #fc4538;
        }
      }
      &.curr {
        &:before {
          background: $green;
        }
        .text-normal {
          color: $text;
        }
      }
    }
  }
  .content {
    overflow: hidden;
    .thumb {
      overflow: hidden;
      float: left;
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 60px;
      }
    }
    .ct {
      margin-left: 75px;
    }
    .l {
      width: 225px;
    }
    .r {
      margin-left: 225px;
    }
  }
  .info {
    line-height: 2;
  }
  .pay-info {
    .row {
      padding-right: 10px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
