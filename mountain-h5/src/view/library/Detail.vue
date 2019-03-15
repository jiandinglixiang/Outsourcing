<template>
    <div class="library-detail">
        <div class="vhead">
            <span @click="goBack" class="back-icon"></span>
            <span class="share-white-icon right"></span>
        </div>
        <div class="info ofh">
            <div class="thumb fl">
                <img :src="detail.seoImg" alt="">
            </div>
            <div class="content">
                <div class="name margin-bottom-10 text-ml">{{detail.seoTitle}}</div>
                <div class="margin-bottom-5 text-sm">{{detail.seoExchangeCount}}人借阅</div>
                <div class="text-sm">上架时间 {{detail.updateTime}}</div>
            </div>
        </div>
        <div class="book-deatil bg-white">
            <div class="hd height-lh-44 ofh">
                <div class="tit fl">当前状态</div>
                <div class="fr">
                    <span class="c-blue">可借阅</span>
                    <span class="c-">已借出</span>
                </div>
            </div>
            <div class="bd detail">
                <p class="margin-bottom-10">借出时间: 2018-12-02</p>
                <p>最迟归还时间时间: 2018-12-02</p>
            </div>
        </div>
        <div class="fixed-bottom">
            <div class="btn bg-red">我要借阅</div>
            <!-- <div class="btn bg-gray">已借出</div> -->
        </div>
    </div>
</template>
<script>
  import router from '../../router/index'
  import { GET_BOOK_DETAIL } from '../../store/library/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'detail',
    data () {
      return {}
    },
    computed: {
      detail () {
        return this.$store.state.library.bookdetail
      }
    },
    methods: {
      goBack () {
        router.go(-1)
      },
      ...mapActions({
        getBookDetail: GET_BOOK_DETAIL
      })
    },
    created () {
      this.getBookDetail(this.$route.params.id)
      console.log(this.$route.params.id)
      console.log(this.$store.state.library)
    },
    components: {}
  }
</script>
<style lang="scss">
    @import "../../style/icon.css";

    .library-detail {
        .vhead {
            position: relative;
            height: 45px;
            background: #010208;
            background-size: cover;
            color: $white;

            .back-icon {
                position: absolute;
                left: 5px;
                top: 5px;
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

        .info {
            position: relative;
            padding: 7px 15px 0;
            height: 166px;
            background-image: url(../../assets/user/topbg.png);
            color: #fff;

            .thumb {
                width: 100px;
                height: 143px;

                img {
                    max-width: 100%;
                }
            }

            .content {
                margin-left: 118px;

                .name {
                    overflow: hidden;
                    height: 1.4em *4;
                }
            }
        }

        .book-deatil {
            .hd {
                padding: 0 15px;

            }

            .bd {
                border-top: 1px solid #ddd;
                padding: 15px;
            }
        }
    }

</style>
