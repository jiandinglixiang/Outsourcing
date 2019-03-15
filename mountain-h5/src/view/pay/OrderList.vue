<template>
  <div class="orderlist">
    <v-head title="我的订单"></v-head>
    <sift-nav></sift-nav>
    <div @click.stop="SwitchItem" class="tab row bg-white margin-bottom-10" data-top="y">
      <div :class="{active:listIndex==='0'}" class="col" data-value="0"><span>全部</span></div>
      <div :class="{active:listIndex==='1'}" class="col" data-value="1"><span>待支付</span></div>
      <div :class="{active:listIndex==='2'}" class="col" data-value="2"><span>待发货</span></div>
      <div :class="{active:listIndex==='3'}" class="col" data-value="3"><span>待确认</span></div>
      <div :class="{active:listIndex==='4'}" class="col" data-value="4"><span>已完成</span></div>
    </div>
    <div infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="isMax"
         v-infinite-scroll="loadMore">
      <ul class="item-list">
        <li :key="index"
            class="item bg-white"
            v-for="(n,index) in list[listIndex]">
          <div class="hd ofh border-b-ddd">
            <div class="orderid fl c-gray">订单号{{n.shoNo}}</div>
            <div class="fr"><span :class="OrderState(n.shoState,1)">{{n.shoState|OrderState}}</span></div>
          </div>
          <div class="bd padding-left-10">
            <router-link :to="{path:'/pay/order_detail',query:{shoNo:n.shoNo}}" class="content ofh" tag="div">
              <div class="thumb">
                <img :src="n.shoImg" alt="">
              </div>
              <div class="ct">
                <div class="l fl">
                  <div class="tit text-md">{{n.shoTitle}}</div>
                  <p class="c-gray text-normal">...</p>
                </div>
                <div class="r num text-right c-gray">x{{ n.shoStoreCount }}</div>
              </div>
            </router-link>
            <div class="text-right border-b-ddd pay-info">共<span>{{ n.shoStoreCount }}</span>商品 实付积分<span>{{n.shoSubTotal}}</span>
            </div>
            <div @click.stop="OrderAction($event,n)" class="btns text-right" data-top="y">
              <div class="btn bg-white" data-value="1" v-show="n.shoState<3">取消订单</div>
              <div class="btn bg-blue" data-value="2" v-show="n.shoState==2">确认收货</div>
              <div class="btn bg-white" data-value="3" v-show="n.shoState==9">申请售后</div>
              <div class="btn bg-red" data-value="4" v-show="n.shoState==0">去支付</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { SET_ORDER_INDEX } from '../../store/home/types'
  import { mapMutations, mapState } from 'vuex'
  import { http } from '../../store/Http'
  import { copy } from '../../common/util'
  import { MessageBox } from 'mint-ui'
  import Toast from '../../common/toast'

  export function OrderState (e, cla) {
    switch (e) {
      case '0':
        return cla ? `c-red` : `待支付`
      case '1':
      case '2':
        return cla ? `c-blue` : `待确认`
      case '9':
        return cla ? `` : `完成`
      default:
        return
    }
  }

  export default {
    name: 'orderList',
    data () {
      return {
        list: [[], [], [], [], []],// 数据列表
        loading: true, // 是否加载
        isMax: true, // 当加载数据未撑满容器就再加载一次数据
        pageSize: 10 //每次数据大小
      }
    },
    computed: {
      ...mapState({
        listIndex: state => state.home.orderIndex,
        info: state => state.user.info
      })
    },
    methods: {
      ...mapMutations({
        setListIndex: SET_ORDER_INDEX
      }),
      loadMore () {
        this.getList(this.listIndex, parseInt(this.list[this.listIndex].length / 10 + 1))
      },
      SwitchItem (event) {
        // 切换
        function ff (dataset) {
          const unEqual = dataset.value !== this.listIndex //不相等
          const isData = this.list[dataset.value].length === 0 //没有数据
          if (unEqual && isData) {
            this.getList(dataset.value, parseInt(this.list[dataset.value].length / this.pageSize + 1)).then(() => {
              // 加载完后切换
              this.setListIndex(dataset.value)
            })
          } else {
            this.loading = this.list[dataset.value].length % this.pageSize !== 0 //可被整除
            this.setListIndex(dataset.value)
          }
        }

        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break
            if (event.path[i].dataset.value) {
              ff.call(this, event.path[i].dataset)
              break
            }
          }

        }
      },
      getList (index = 0, page = 1) {
        // if (!this.info.itemId) return Promise.reject(new Error('没有this.info.itemId'))
        this.loading = 'true'
        return http.get('op/myGoodsOrderList.json', {
          itemId: 'this.info.itemId',
          startPage: page,
          pageSize: this.pageSize
        }).then(data => {
          if (data.data && data.data.length) {
            this.loading = data.data.length < this.pageSize
            this.$set(this.list, index, (copy(this.list[index])).concat(data.data))
          } else {
            this.loading = true
          }
          return data
        })
      },
      OrderAction (event, item) {
        if (event.target.attributes['data-top']) return
        if (event.target.attributes['data-value']) {
          switch (event.target.attributes['data-value'].value) {
            case '1':
              // 取消订单
              this.unOrder(item)
              break
            case '2':
              // 确认收货
              this.okHarvest(item)
              break
            case '3':
              // 申请售后
              this.orderAfterSale(item)
              break
            case '4':
              // 去支付
              this.payOrder(item)
              break
            default:
          }
        }

      },
      unOrder () {
        // 取消订单
        MessageBox.confirm('确认取消订单?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('取消成功')
          })
        })
      },
      okHarvest () {
        // 确认收货
        MessageBox.confirm('确认收货?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('确认收货成功')
          })
        })
      },
      orderAfterSale () {
        // 申请售后
        MessageBox.confirm('申请售后?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('申请售后成功,客服会联系您')
          })
        })
      },
      payOrder () {
        // 去支付
        MessageBox.confirm('去支付?').then(action => {
          http.get('op/succeed.json', {}).then(data => {
            Toast('支付成功')
          })
        })
      },
      OrderState
    },
    filters: {
      OrderState
    },
    created () {
      this.getList(this.listIndex)
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
  .orderlist {
    .vhead {
      background-color: $blue;
      color: $white;
    }

    .item-list {
      .item {
        margin-bottom: 10px;

        .hd {
          padding: 0 10px;
          height: 40px;
          line-height: 40px;
        }
      }

      .content {
        padding: 12px 10px 0 0;

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

      .pay-info {
        padding-right: 10px;
        height: 32px;
        line-height: 32px;
        color: #666;
      }

      .btns {
        padding: 8px 10px 8px 0;

        .btn {
          display: inline-block;
          margin-left: 8px;
          padding: 0 16px;
          width: auto;
          height: 26px;
          line-height: 26px;
          border-radius: 13px;

          &.bg-white {
            border: 1px solid #ddd;
            line-height: 24px;
            color: #666;
          }
        }
      }
    }
  }
</style>
