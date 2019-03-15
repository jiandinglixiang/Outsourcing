<template>
    <div class="server-phonelist">
        <v-head title="便民电话"></v-head>
        <sift-nav></sift-nav>
        <el-tabs @tab-click="handleClick" v-model="activeName">

            <el-tab-pane label="物业管家" name="first">
                <div class="phone-list">
                    <template v-for="item in convenPhonelist">
                        <div @click="goPhoneDetail(item)" class="item">
                            <img :src="item.copImg" alt="">
                            <div class="ct">
                                <div class="name">{{item.copTitle}}</div>
                                <div class="num">{{item.copPhone}}</div>
                            </div>
                        </div>
                    </template>

                </div>
            </el-tab-pane>

            <el-tab-pane label="便民电话" name="second">
                <div class="phone-list">
                    <template v-for="item in propertyPhonelist">
                        <div @click="goPhoneDetail(item)" class="item">
                            <img :src="item.copImg" alt="">
                            <div class="ct">
                                <div class="name">{{item.copTitle}}</div>
                                <div class="num">{{item.copPhone}}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </el-tab-pane>

        </el-tabs>
        <!-- <div class="phone">
          <div class="tab row">
            <div class="col active"><span>物业管家</span></div>
            <div class="col"><span>便民电话</span></div>
          </div>
          <div class="search-box">
            <div class="search">
              <button class="btn-search"><i class="search-icon"></i></button>
              <div class="input-text">
                <input type="text" placeholder="搜索">
              </div>
            </div>
          </div>
          <div class="phone-list">
            <div class="item" @click="goPhoneDetail">
              <img src="http://placehold.it/88" alt="">
              <div class="ct">
                <div class="name">居委会</div>
                <div class="num">0591-24587552</div>
              </div>
            </div>
            <div class="item" @click="goPhoneDetail">
              <img src="http://placehold.it/88" alt="">
              <div class="ct">
                <div class="name">居委会</div>
                <div class="num">0591-24587552</div>
              </div>
            </div>
            <div class="item" @click="goPhoneDetail">
              <img src="http://placehold.it/88" alt="">
              <div class="ct">
                <div class="name">居委会</div>
                <div class="num">0591-24587552</div>
              </div>
            </div>
            <div class="item" @click="goPhoneDetail">
              <img src="http://placehold.it/88" alt="">
              <div class="ct">
                <div class="name">居委会</div>
                <div class="num">0591-24587552</div>
              </div>
            </div>
          </div>
        </div> -->

    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { mapActions } from 'vuex'
  import { GET_PHONE_LIST } from '../../store/phonelist/types'

  export default {
    name: 'phonelist',
    data () {
      return {
        activeName: 'first'
      }
    },
    computed: {
      convenPhonelist () {
        let list = []
        this.$store.state.phonelist.convenPhoneList.map((value, index) => {
          if (value.copType === '0') {
            list.push(value)
          }
        })

        return list
      },
      propertyPhonelist () {
        let list = []
        this.$store.state.phonelist.convenPhoneList.map((value, index) => {
          if (value.copType === '1') {
            list.push(value)
          }
        })

        return list
      }
    },
    methods: {
      goPhoneDetail (item) {
        this.$router.push({
          name: 'PhoneDetail',
          params: { id: item.id, title: item.copTitle, img: item.copImg, phone: item.copPhone }
        })
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      ...mapActions({
        getPhoneList: GET_PHONE_LIST
      })
    },
    created () {
      this.getPhoneList()
      console.log(this.$store.state.phonelist.convenPhoneList)
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .server-phonelist {
        // background-color: $white;
        .vhead {
            background-color: $blue;
            color: #fff;
        }

        #tab-first, #tab-second {
            padding-left: 50%;
        }

        #tab-first .el-tabs__item {
            padding: 0 37px;
        }

        .tab {
            background-color: $white;
        }

        .search-box {
            overflow: hidden;
            margin: 5px 6px;
            padding: 0 5px;
            height: 40px;
            background-color: $white;
            border-radius: 5px;

            .btn-search {
                float: left;
                width: 25px;
                height: 40px;
                background: transparent;

                i {
                    display: inline-block;
                }
            }

            .input-text {
                margin-left: 25px;
            }
        }

        .phone-list {
            padding-left: 11px;
            background-color: $white;
            border-top: 1px solid #ddd;

            .item {
                position: relative;
                height: 62px;
                padding: 9px 10px 0 59px;
                border-bottom: 1px solid #ddd;

                img {
                    position: absolute;
                    left: 0;
                    right: 9px;
                    width: 44px;
                    overflow: hidden;
                    height: 44px;
                    border-radius: 100%;
                }

                .name {
                    margin-bottom: 5px;
                    font-size: 16px;
                }

                .num {
                    font-size: 12px;
                    color: #999;
                }
            }
        }
    }
</style>
