<template>
    <div class="library-bookdetail">
        <v-head title="共享详情"></v-head>
        <sift-nav></sift-nav>
        <div class="card bg-white margin-bottom-10">
            <div class="card-detail padding-left-20">
                <div class="control curr"  v-for="(n,index) in detail.track" :key="index">
                    <div class="margin-bottom-3 text-normal">{{n.seitTitle}}</div>
                    <p class="text-sm c-gray">{{ n.createTime}}</p>
                </div>
                <div class="control">
                    <div class="margin-bottom-3 text-normal">等待指派人员(张师傅12587546588上门取书)</div>
                    <p class="text-sm c-gray">2018-11-20 11:00:00</p>
                </div>
                <div class="control">
                    <div class="margin-bottom-3 text-normal">捐书完成</div>
                    <p class="text-sm c-gray">2018-11-20 11:00:00</p>
                </div>
                <!-- <div class="control">
                  <div class="text-normal">已取消</div>
                </div> -->
            </div>
        </div>
        <div class="mod-card bg-white">
            <div class="hd">
                <div class="tit">捐书内容</div>
            </div>
            <div class="bd padding-left-10">
                <div class="control ofh">
                    <div class="fl c-gray">捐书数量</div>
                    <div class="fr">{{1}}</div>
                </div>
                <div class="control ofh">
                    <div class="fl c-gray">捐书名称</div>
                    <div class="fr">{{detail.sedTitle}}</div>
                </div>
                <div class="control ofh">
                    <div class="fl c-gray">联系姓名</div>
                    <div class="fr">{{detail.sedName}}</div>
                </div>
                <div class="control ofh">
                    <div class="fl c-gray">联系电话</div>
                    <div class="fr">{{detail.sedPhone}}</div>
                </div>
                <div class="control ofh">
                    <div class="fl c-gray">期望上门日期</div>
                    <div class="fr">{{detail.sedDelivery}}</div>
                </div>
                <div class="control ofh">
                    <div class="fl margin-right-10 c-gray">备注</div>
                    <div class="fl">{{detail.sedMemo}}</div>
                </div>
            </div>
        </div>
        <div class="fixed-bottom">
          <div class="btn bg-blue" @click.stop="offApply">取消捐书</div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { http } from "../../store/Http";

  export default {
    name: 'DonationParticulars',
    data () {
      return {
        detail: {
          track: []
        }
      }
    },
    methods: {
      offApply () {
        // 取消申
        http.get('op/myRepairOrderCancel.json', {
          itemId: '',
          reoNo: ''
        }).then(() => {
          this.getDetail()
        })
      },
      getDetail () {
        http.get('op/myShareDetail.json', {
          itemId: '',
          sebNo: this.$route.query.reoNo
        }).then(data => {
          this.detail = data.data
          console.log(data.data)
        })
      }
    },
    created () {
      if (this.$route.query.reoNo) {
        this.getDetail()
      }
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .library-bookdetail {
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
                height: 110px;
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

                .text-normal {
                    color: $c999;
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

        .mod-card {
            .hd {
                border-bottom: 0;
            }

            .bd {
                padding-bottom: 10px;
            }

            .control {
                padding: 0 15px 0 5px;
                height: 44px;
                line-height: 43px;
                border-top: 1px solid #ddd;
                font-size: 14px;
            }
        }

        .btn {
            border-radius: 0;
        }
    }

</style>
