<template>
    <div class="home-home padding-bottom-90">
        <div class="vhead">
            <div><i class="icon addr-white-icon"></i>此处做定位<i class="icon arrow-down-white-icon"></i></div>
            <span class="btn-msg msg"></span>
            <span @click="navShow" class="right nav-icon"></span>
        </div>
        <sift-nav></sift-nav>
        <v-swiper :list="home.banners"></v-swiper>
        <div class="site-nav sec bg-white margin-bottom-10">
            <div @click="goCurrentItem(sitenav)" class="col" v-for="sitenav in sitenavs">
                <img :src="sitenav.url_image" alt="">
                <p>{{sitenav.name}}</p>
            </div>
        </div>
        <div class="mod-card notice sec bg-white">
            <div class="hd">
                <div class="tit">社区公告</div>
                <div @click="goMoreNotice()" class="more">更多...</div>
            </div>
            <div class="bd">
                <div class="notice-list">
                    <template v-for="notice in home.noticeList">
                        <div @click="goCurrentNotice(notice.id)" class="notice">
                            <div class="thumb">
                                <img :src="notice.noImg" alt="">
                            </div>
                            <div class="tit ellipsis-mulitiple2">{{ notice.noTitle }}</div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <bottom-nav active="Home"></bottom-nav>
    </div>
</template>
<script>
  import SiftNav from '../../components/SiftNav.vue'
  import BottomNav from '../../components/BottomNav.vue'
  import VSwiper from '../../components/VSwiper.vue'
  import { mapActions } from 'vuex'
  import { GET_BANNER, GET_NOTICE_LIST } from '../../store/home/types'

  export default {
    name: 'home',
    data () {
      return {
        sitenavs: [
          {
            site_id: '1',
            component: 'Points',
            url_image: require('../../assets/home/img01.png'),
            name: '用户签到'
          },
          {
            site_id: '2',
            component: '跳转第三方系统',
            url_image: require('../../assets/home/img02.png'),
            name: '物业缴费'
          },
          {
            site_id: '3',
            component: 'Warranty',
            url_image: require('../../assets/home/img03.png'),
            name: '报事报修'
          },
          {
            site_id: '4',
            component: 'PhoneList',
            url_image: require('../../assets/home/img04.png'),
            name: '便民电话'
          },
          {
            site_id: '5',
            component: 'QuestSurvey',
            url_image: require('../../assets/home/img05.png'),
            name: '问卷调查'
          },
          {
            site_id: '6',
            component: 'Library',
            url_image: require('../../assets/home/img14.png'),
            name: '共享空间'
          },
          {
            site_id: '7',
            component: '',
            url_image: require('../../assets/home/img07.png'),
            name: '访客系统'
          },
          {
            site_id: '8',
            component: 'More',
            url_image: require('../../assets/home/img15.png'),
            name: '更多服务'
          }
        ]
      }
    },
    computed: {
      home () {
        return this.$store.state.home
      }
    },
    methods: {
      ...mapActions({
        getNoticeList: GET_NOTICE_LIST,
        getBanners: GET_BANNER
      }),
      navShow (e) {
        document.documentElement.classList.add('sift-move')
      },
      goCurrentItem (sitenav) {
        if (sitenav.component) {
          this.$router.push({
            name: sitenav.component
            // params: {id: sitenav.site_id}
          })
        }
      },
      goMoreNotice () {
        this.$router.push({ name: 'Notice' })
      },
      goCurrentNotice (id) {
        this.$router.push({
          name: 'Article',
          params: { id: id }
        })
      }
    },
    created () {
      this.getBanners()
      this.getNoticeList()
    },
    components: { BottomNav, SiftNav, VSwiper }
  }
</script>
<style lang="scss">
    .home-home {
        .vhead {
            position: relative;
            padding: 0 20px;
            height: 45px;
            background: $blue;;
            font-size: 18px;
            color: #fff;
            text-align: center;
            line-height: 45px;

            .btn-msg {
                position: absolute;
                right: 50px;
                top: 9px;
                width: 27px;
                height: 27px;
                background: url("../../assets/icon/bell.png") no-repeat;
                background-size: cover;

                &.msg {
                    &:after {
                        content: '';
                        display: block;
                        margin-left: 16px;
                        width: 6px;
                        height: 6px;
                        background: $red;
                        border-radius: 100%;
                    }
                }
            }

            div {
                .icon {
                    margin-bottom: 2px;
                }
            }

            .addr-white-icon {
                margin-right: 10px;
                width: 18px;
                height: 18px;
            }

            .arrow-down-white-icon {
                margin-left: 10px;
                width: 10px;
                height: 10px;
            }

            .back-icon {
                position: absolute;
                left: 5px;
                top: 5px;
                background: url("../../assets/icon/back.png") no-repeat center;
                background-size: 70% 70%;
                height: 35px;
                width: 35px;
            }

            .right {
                position: absolute;
                right: 10px;
                top: 9px;
            }
        }

        .site-nav {
            overflow: hidden;
            text-align: center;
            font-size: 14px;

            .col {
                float: left;
                padding: 10px;
                width: 25%;

                img {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                }

                p {
                    padding: 5px 0;
                }
            }
        }

        .notice-list {
            .notice {
                overflow: hidden;
                padding: 12px 10px 12px 18px;
                border-bottom: 1px solid #ddd;

                .tit {
                    margin-right: 93px;
                }

                .thumb {
                    overflow: hidden;
                    float: right;
                    width: 75px;
                    height: 47px;

                    img {
                        width: 100%;
                        min-height: 47px;
                    }
                }
            }
        }
    }

</style>
