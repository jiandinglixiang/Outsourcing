<template>
    <div class="points-points">
        <v-head title=""></v-head>
        <sift-nav></sift-nav>
        <div class="mod-top">
            <div class="hd">
                <div class="topinfo">
                    <span class="left">当前积分</span>
                    <div>{{points}}</div>
                    <span class="right"><i class="icon coin-white-icon"></i>积分商城</span>
                </div>
                <div class="signin border-b-ddd">
                    <div class="tit fl">
                        <div>签到</div>
                        <p class="text-sm c-gray">今日签到+{{toDaySginIn}}积分</p>
                    </div>
                    <!-- <div class="btn bg-green fr">立即签到</div>  -->
                    <div class="btn bg-green fr done">已签到</div>
                </div>
            </div>
            <div class="bd">
                <div class="signin-box">
                    <div class="tit">签到得积分</div>
                    <div class="signin-show row">
                        <template v-for="(item, index) in continueDayList">
                            <div :class="index > integralContinueDay ? 'col' : 'col done'">
                                <span>+{{item}}</span>
                                <p>{{index+1}}天</p>
                            </div>
                        </template>

                        <!--  <div class="col">
                          <span>+4</span>
                          <p>2天</p>
                        </div>
                        <div class="col">
                          <span>+6</span>
                          <p>3天</p>
                        </div>
                        <div class="col">
                          <span>+8</span>
                          <p>4天</p>
                        </div>
                        <div class="col">
                          <span>+10</span>
                          <p>5天</p>
                        </div>
                        <div class="col">
                          <span>+12</span>
                          <p>6天</p>
                        </div>
                        <div class="col">
                          <span>+14</span>
                          <p>7天</p>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="item-list margin-top-10 bg-white">
            <div class="tit border-b-ddd text-ml"><i class="icon diamond-icon margin-bottom-2 margin-right-5"></i>积分收支明细
            </div>
            <div class="padding-left-12" v-for="item in pointsList">

                <div class="item ofh border-b-ddd">
                    <div class="content fl">
                        <div class="tit text-normal margin-bottom-5">{{ item.integralMemo }}</div>
                        <div class="date text-sm c-gray">{{ item.createTime }}</div>
                    </div>
                    <div class="num fr">{{ item.integralType }}{{ item.integralAmount }}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { mapActions } from 'vuex'
  import { CONTINUE_SIGNIN, GET_INTEGRAL, GET_INTEGRAL_LIST } from '../../store/points/types'

  export default {
    name: 'points',
    data () {
      return {}
    },
    computed: {
      points () {
        return parseInt(this.$store.state.points.integral.integral) + parseInt(this.$store.state.points.integral.integralLock)
      },
      pointsList () {
        let list = []

        this.$store.state.points.integralList.map((value, index) => {

          if (value.integralType === '20' || value.integralType === '21') {
            value.integralType = '-'
            console.log('-')
          } else {
            value.integralType = '+'
            console.log('+')
          }

          list.push(value)

        })

        return list
      },
      toDaySginIn () {
        let list = (this.$store.state.points.continueSignIn.integralContinueCount || '').split(',')
        return list[this.$store.state.points.continueSignIn.integralContinueDay]
      },
      continueDayList () {
        return (this.$store.state.points.continueSignIn.integralContinueCount || '').split(',')
      },
      integralContinueDay () {
        return this.$store.state.points.continueSignIn.integralContinueDay - 1
      }
    },
    methods: {
      ...mapActions({
        getIntegral: GET_INTEGRAL,
        getIntegralList: GET_INTEGRAL_LIST,
        getContinueSignIn: CONTINUE_SIGNIN
      }),
    },
    created () {
      this.getIntegral()
      this.getIntegralList()
      this.getContinueSignIn()
      console.log('1')
      console.log(this.$store.state.points)
      console.log('2')
      console.log(this.$store.state.points.integralList)

    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .points-points {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .mod-top {
            .hd {
                height: 159px;
                background-color: $blue;
            }

            .bd {
                margin: 0 8px;
                height: 110px;
                background-color: $white;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }

        .topinfo {
            position: relative;
            height: 89px;
            color: $white;

            > div {
                text-align: center;
                font-weight: bold;
                font-size: 50px;
            }

            .left, .right {
                position: absolute;
                top: 50px;
            }

            .left {
                left: 15px;
            }

            .right {
                right: 15px;

                .icon {
                    margin-bottom: 2px;
                    margin-right: 10px;
                }
            }
        }

        .signin {
            position: relative;
            overflow: hidden;
            margin: 0 8px;
            padding: 15px 13px 0 70px;
            height: 70px;
            background-color: $white;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;

            &:after {
                position: absolute;
                top: 15px;
                left: 10px;
                content: '';
                width: 44px;
                height: 44px;
                background: url("../../assets/icon/signin.png") no-repeat;
                background-size: cover;
            }

            .btn {
                display: inline-block;
                padding: 0 40px;
                height: 40px;
                line-height: 40px;
                width: auto;
                border-radius: 20px;

                &.done {
                    background-color: $blue;
                }
            }
        }

        .signin-box {
            padding: 5px 5px 10px;

            .tit {
                padding: 10px 18px;
            }
        }

        .signin-show {
            padding: 0 10px;
            text-align: center;

            .col {
                color: $c999;

                span {
                    display: inline-block;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border-radius: 100%;
                    background: $cCcc;
                    text-align: center;
                    font-size: 12px;
                    color: $white;
                }

                &.done {
                    color: $text;

                    span {
                        position: relative;
                        background: $blue;
                        font-size: 0;

                        &:after {
                            position: absolute;
                            top: 6px;
                            left: 6px;
                            content: '';
                            width: 20px;
                            height: 20px;
                            background: url("../../assets/icon/tick_white.png") no-repeat;
                            background-size: cover;
                        }
                    }
                }
            }
        }

        .item-list {
            > .tit {
                padding: 0 16px;
                height: 44px;
                line-height: 44px;
            }

            .item {
                padding: 15px 12px 15px 5px;

                .num {
                    line-height: 40px;
                }
            }
        }
    }

</style>
