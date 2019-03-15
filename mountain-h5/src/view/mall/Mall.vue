<template>
    <div class="mall-mall">
        <v-head title="积分商城"></v-head>
        <sift-nav></sift-nav>
        <search-box title="请输入商品名称"></search-box>
        <div class="mod-goods bg-white">
            <div class="hd border-b-ddd text-center c-gray">
                <form class="row top-form">
                    <div class="col">
                        <div class="select-type">
                            <select
                                    data-ico="ico-arrow"
                                    data-toggle="select">
                                <option value="0">综合排序</option>
                                <option value="1">销量</option>
                                <option value="2">新品</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <span>人气排序</span>
                    </div>
                    <div class="col">
                        <span>积分排序</span>
                    </div>
                </form>
            </div>
            <div class="bd">
                <div class="goods">

                    <div class="item mask">
                        <div class="thumb margin">
                            <img alt="" src="http://placehold.it/320">
                            <div class="txt text-center">售罄</div>
                        </div>
                        <div class="desc">
                            <div class="tit text-md">进户门保洁</div>
                            <div class="padding-tb-2">
                                <span class="c-red margin-right-10">299 积分</span>
                                <div class="btn bg-red text-sm">固定兑换</div>
                            </div>
                            <div class="c-gray text-sm">561人兑换</div>
                        </div>
                    </div>

                    <template v-for="item in mall.goods.list">
                        <div @click="goMallDetail(item.id)" class="item">
                            <div class="thumb">
                                <img :src="item.shgImg" alt="">
                            </div>
                            <div class="desc">
                                <div class="tit">{{ item.shgTitle }}</div>
                                <div class="padding-tb-2">
                                    <span class="c-red margin-right-10">{{ item.shgIntegralCurr }} 积分</span>
                                    <div class="btn bg-red text-sm">{{ item.shgLab }}</div>
                                </div>
                                <div class="c-gray text-sm">{{ item.shgExchangeCount }}人兑换</div>
                            </div>
                        </div>
                    </template>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import SearchBox from '../../components/SearchBox.vue'
  import { GET_MALL_GOODS_LIST } from '../../store/mall/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'mall',
    data () {
      return {}
    },
    computed: {
      mall () {
        return this.$store.state.mall
      }
    },
    methods: {
      goMallDetail (id) {
        this.$router.push({
          name: 'StoreDetail',
          params: { id: id }
        })
      },
      ...mapActions({
        getMallGoodsList: GET_MALL_GOODS_LIST
      })
    },
    created () {
      this.getMallGoodsList()
    },
    components: { VHead, SiftNav, SearchBox }
  }
</script>
<style lang="scss">
    .mall-mall {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .mod-goods {
            .hd {
                height: 44px;
                line-height: 44px;
            }
        }

        .goods {
            overflow: hidden;

            .item {
                float: left;
                padding: 10px;
                height: 250px;
                width: 50%;
                border-bottom: 1px solid $cddd;
                border-left: 1px solid $white;

                &:nth-child(even) {
                    border-left: 1px solid $cddd;
                }

                &.mask {
                    .thumb {
                        position: relative;

                        .txt {
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            margin: auto;
                            width: 70px;
                            height: 70px;
                            line-height: 70px;
                            background: rgba(#000, .6);
                            border-radius: 100%;
                            font-size: 20px;
                            color: $white;
                        }
                    }
                }
            }

            .desc {
                padding: 5px 0;
            }

            .thumb {
                overflow: hidden;
                // width: 160px;
                height: 160px;

                img {
                    width: 100%;
                    height: 160px;
                }
            }

            .btn {
                display: inline-block;
                width: auto;
                padding: 0 5px;
                height: 20px;
                line-height: 20px;
            }
        }
    }

</style>
