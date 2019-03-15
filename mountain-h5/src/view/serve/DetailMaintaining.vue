<template>
    <div class="server-detailmaintaining">
        <v-head title="报修详情"></v-head>
        <sift-nav></sift-nav>
        <div class="card bg-white margin-bottom-10">
            <div class="card-detail padding-left-20">
              <div class="control curr">
                    <div class="margin-bottom-3 text-normal">报事报修申请</div>
                    <p class="text-sm c-gray">2018-11-20 11:00:00</p>
                </div>
              <div class="control" v-for="(n,index) in detail.track" :key="index">
                <div class="margin-bottom-3 text-normal c-red">{{n.retTitle}}</div>
                <p class="margin-bottom-3 text-normal">{{n.retMemo}}</p>
                <p class="text-sm c-gray">{{n.createTime}}</p>
              </div>
              <!--<div class="control">-->
              <!--<div class="margin-bottom-3 text-normal">待服务</div>-->
                    <!-- <div class="margin-bottom-3 text-normal">上门取书(已借<span class="c-blue">12</span>天)</div> -->
              <!--</div>-->
              <!--<div class="control">-->
              <!--<div class="margin-bottom-3 text-normal">待完成</div>-->
              <!--</div>-->
              <!--<div class="control">-->
              <!--<div class="text-normal">待评价</div>-->
              <!--</div>-->
            </div>
        </div>
        <div class="mod-card bg-white">
            <div class="hd">
                <div class="tit">报修详情</div>
            </div>
          <div class="bd padding-left-10 text-normal" style="padding-bottom: 45px">
                <div class="item ofh border-b-ddd">
                    <div class="fl c-gray">报修内容</div>
                  <div class="ct">{{detail.reoMemo}}</div>
                </div>
                <div class="item ofh border-b-ddd">
                    <div class="fl c-gray">报修图片</div>
                    <div class="ct ofh">
                      <img v-for="n in detail.img" alt="" :src="n.thumImg">
                    </div>
                </div>
                <div class="item ofh border-b-ddd">
                    <div class="fl c-gray">联系电话</div>
                  <div class="ct text-right">{{detail.reoPhone}}</div>
                </div>
                <div class="item ofh">
                    <div class="fl c-gray">期望上门日期</div>
                  <div class="ct text-right">{{detail.createTime}}</div>
                </div>
            </div>
        </div>
        <div class="fixed-bottom">
          <div class="btn bg-blue" @click="offApply">取消申报</div>
          <router-link tag="div"
                       :to="{path:'/appraise',query:{itemId:detail.itemId,reoNo:detail.reoNo}}"
                       class="btn bg-red">去评价
          </router-link>
        </div>
      <div v-if="showModal" class="showModal">
        <div class="child">
          <img width="100" src="../../assets/noticed.png" alt="">
          <p style="color: #ffd234;font-weight: bold;font-size: 1.5em">已取消</p>
          <p>您的报修申请已取消,如有需要请重新申请,我们的工作人员会联系您</p>
          <button @click="closeModal">确认返回</button>
        </div>
        <div class="modal-child" @click="closeModal"></div>
      </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { mapState } from 'vuex'
  import Http from '../../store/Http'
  import Modal from "../../components/Modal";

  export default {
    name: 'detailmaintaining',
    data () {
      return {
        detail: {
          track: [],
          img: []
        },
        showModal: false
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      offApply () {
        // 取消申报
        Http.get('op/myRepairOrderCancel.json', {
          itemId: '',
          reoNo: ''
        }).then(() => {
          this.showModal = true
        })
      },
      closeModal (event) {
        event.stopPropagation()
        this.showModal = false
        this.$router.back()
      }
    },
    created () {
      // 获取详情
      Http.get('op/myRepairOrderDetail.json', {
        itemId: 'this.info.itemId',
        reoNo: this.$route.query.reoNo
      }).then(data => {
        this.detail = data.data
      })
    },
    components: {Modal, VHead, SiftNav}
  }
</script>
<style lang="scss">
    .server-detailmaintaining {
      .showModal {
        > div.modal-child {
          position: fixed;
          background-color: rgba(51, 51, 51, 0.5);
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 0;
        }

        > div.child {
          z-index: 1;
          background-color: white;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 256px;
          text-align: center;
          border-radius: 10px;
          padding-top: 10px;
          overflow: hidden;

          > button {
            margin-top: 10px;
            background-color: white;
            width: 100%;
            font-weight: bold;
            line-height: 40px;
            border-top: 1px solid #ddd;
          }
        }
      }
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

                > div {
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

        .mod-card {
            .item {
                padding: 12px 15px 12px 5px;

                .ct {
                    margin-left: 76px;

                    img {
                        float: left;
                        margin-right: 10px;
                        margin-bottom: 8px;
                        width: 70px;
                        height: 70px;
                        border-radius: 5px;
                    }
                }
            }
        }

        .fixed-bottom {
            .btn {
                border-radius: 0;
            }
        }
    }
</style>
