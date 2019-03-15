<template>
    <div class="pay-order padding-bottom-90">
        <v-head hideNav="true" title="确认订单"></v-head>
        <div class="top-bg"></div>
        <div @click="goChangeAddr" class="addr margin-bottom-10">
            <div class="info margin-bottom-5"><span class="name">admin test</span><span class="tel">186***1345</span>
            </div>
            <div class="c-gray">福建省福州市鼓楼区某某街道实际地址几楼几号</div>
        </div>
        <div class="sum bg-white margin-bottom-10">
            <div class="height-lh-44 row">
                <div class="col">商品总额</div>
                <div class="col c-gray text-right">2300积分</div>
            </div>
            <div class="height-lh-44 row">
                <div class="col">积分余额</div>
                <div class="col c-gray text-right">2300积分</div>
            </div>
        </div>
        <div class="goods bg-white ofh margin-bottom-10">
            <img alt="" src="http://placehold.it/120">
            <div class="content fl">
                <div class="tit margin-bottom-5 text-ml">智能扫地机器人</div>
                <div class="c-gray text-sm">2300积分</div>
            </div>
            <div class="num fr text-right">x1</div>
        </div>
        <div class="bg-white">
            <div class="tabs row  text-center">
                <div class="col height-lh-44 active">送货上门</div>
                <div class="col height-lh-44">自取</div>
            </div>
            <div class="content">
                <div class="padding-left-10">
                    <div class="control border-b-ddd height-lh-44 arrow-r">
                        <label for="">期望上门日期</label>
                        <div class="input-text fr">
                            <input class="text-right" placeholder="选择日期" type="data">
                        </div>
                    </div>
                    <div class="control">
                        <label class="height-lh-44" for="">备注</label>
                        <div>
                            <textarea placeholder="请输入内容"></textarea>
                        </div>
                    </div>
                </div>
                <!-- 自取 -->
                <div class="padding-left-10" hidden>
                    <div class="control border-b-ddd height-lh-44 arrow-r">
                        <label for="">自取地址</label>
                        <div class="input-text fr">优胜美地小区物业处</div>
                    </div>
                    <div class="control">
                        <label class="height-lh-44" for="">备注</label>
                        <div>
                            <textarea placeholder="请输入内容"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed-bottom row">
            <div class="col btn bg-white">应付积分: <span>2300</span></div>
            <div @click="goPaymennt" class="col btn bg-red">立即下单</div>
            <!-- 余额不足情况 -->
            <!-- <div class="col btn bg-white error">积余额不足</div> -->
            <!-- <div class="col btn bg-gray">立即下单</div> -->
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'

  export default {
    name: 'order',
    data () {
      return {}
    },
    computed: {},
    methods: {
      goChangeAddr () {
        this.$router.push({
          name: 'Address',
          // params: { id: id }
        })
      },
      goPaymennt () {
        this.$router.push({
          name: 'Pay',
          // params: { id: id }
        })
      }
    },
    created () {
    },
    components: { VHead }
  }
</script>
<style lang="scss">
    .pay-order {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .fixed-bottom .bg-white {
            color: $c666;

            span {
                color: $text;
            }

            &.error {
                color: $red;
            }
        }

        .top-bg {
            height: 5px;
            background: #fffdf4 url(../../assets/addr_top_bg.png) center top repeat;
            background-size: contain;
        }

        .addr {
            position: relative;
            padding: 15px 30px 15px 15px;
            background: #fffdf4;

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                right: 10px;
                margin-top: -11px;
                width: 22px;
                height: 22px;
                background: url(../../assets/icon/arrow_right_black.png);
                background-size: cover;
            }
        }

        .sum {
            padding: 0 15px;
        }

        .goods {
            position: relative;
            padding: 12px 12px 12px 85px;

            img {
                position: absolute;
                top: 12px;
                left: 12px;
                width: 60px;
                height: 60px;
            }

            .content {
                width: 80%;
                min-height: 60px;
            }

            .num {
                width: 20%;
            }

            .tit {
                color: #000;
            }
        }

        .tabs {
            .col {
                border-bottom: 1px solid #ddd;
                background-color: #fbfbfb;
                color: $c999;

                &:first-child {
                    border-right: 1px solid #ddd;
                }

                &.active {
                    background-color: $white;
                    color: #000;
                    border-bottom: 0;
                }
            }
        }

        .control {
            padding: 0 30px 0 5px;
            // height: 44px;
            // line-height: 43px;
            font-size: 14px;

            label {
                display: inline-block;
            }

            textarea {
                padding: 0px 10px 13px 0;
                width: 100%;
                min-height: 44px;
            }

            input,
            textarea {
                color: $c999;
            }

            &.arrow-r {
                position: relative;

                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    margin-top: -8px;
                    width: 16px;
                    height: 16px;
                    background: url(../../assets/icon/arrow_right_black.png);
                    background-size: cover;
                }
            }
        }
    }

</style>
