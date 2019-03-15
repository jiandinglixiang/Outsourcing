<template>
    <div class="mall-store">
        <div class="vhead">
            <span @click="goBack" class="back-icon"></span>
            <div>商品详情</div>
            <span @click="share" class="right share-white-icon"></span>
        </div>
        <div class="swiper"></div>
        <div class="goods-info bg-white margin-bottom-10">
            <div class="tit">{{ store.detail.shgTitle }}</div>
            <div class="border-b-ddd padding">
                <span class="c-red margin-right-10"><b class="text-ml">{{ store.detail.shgIntegralCurr }} </b>积分</span>
                <del class="price c-gray"><b>¥</b>{{ store.detail.shgPrice }}</del>
                <span class="c-gray fr">库存:{{ store.detail.shgStoreCount }}</span>
            </div>
            <div class="meta">
                <div class="tit fl"><i class="icon data-icon margin-right-10"></i>有效期</div>
                <div class="date fr c-gray">{{ store.detail.shgStartTime }}至{{ store.detail.shgEndTime }}</div>
            </div>
        </div>
        <div class="goods-detail bg-white padding text-normal">
            <div class="tit text-ml">商品详情</div>
            <p>{{ store.detail.shgContext }}</p>
        </div>
        <div class="fixed-bottom row">
            <div class="col btn bg-white">当前积分:999</div>
            <div @click="goFirmOrder" class="col btn bg-red">立即兑换</div>
        </div>
    </div>
</template>
<script>
  import router from '../../router/index'
  import VHead from '../../components/VHead.vue'
  import { GOODS_DETAIL_REQUEST } from '../../store/mall/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'store',
    data () {
      return {}
    },
    computed: {
      store () {
        return this.$store.state.mall.goods
      }
    },
    methods: {
      ...mapActions({
        getGoodsDetail: GOODS_DETAIL_REQUEST
      }),
      goBack () {
        router.go(-1)
      },
      share () {
        console.log('分享按钮')
      },
      goFirmOrder () {
        this.$router.push({
          name: 'Order',
          // params: { id: id }
        })
      }
    },
    created () {
      this.getGoodsDetail(this.$route.params.id)
      console.log(this.$route.params.id)
    },
    components: { VHead }
  }
</script>
<style lang="scss">
    .mall-store {
        .vhead {
            position: relative;
            padding: 0 20px;
            height: 45px;
            background: #fff;
            font-size: 18px;
            color: #333;
            text-align: center;
            line-height: 45px;
        }

        .vhead .back-icon {
            position: absolute;
            left: 5px;
            top: 5px;
        }

        .vhead .right {
            position: absolute;
            right: 20px;
            top: 12px;
        }

        .vhead {
            background-color: $blue;
            color: $white;
        }

        .goods-info {
            > .tit {
                padding: 5px 10px 0;
            }

            b {
                font-weight: normal;
            }
        }

        .meta {
            overflow: hidden;
            padding: 0 10px;
            height: 44px;
            line-height: 44px;

            .icon {
                margin-bottom: 3px;
            }
        }

        .btn {
            border-radius: 0;
        }

        .bg-white {
            color: $text;
        }

        .goods-detail {
            line-height: 1.5;

            p {
                margin-bottom: .5em;
            }
        }
    }

</style>.
