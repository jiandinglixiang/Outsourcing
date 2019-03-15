<template>
    <div class="library-library">
        <v-head title="共享空间"></v-head>
        <div @click="goSearch" class="searchbox">
            <div class="bg-white ofh">
                <button class="btn-search search-icon fl"></button>
                <div class="input-search c-gray">搜索</div>
            </div>
        </div>
        <v-swiper :list="library.getLibraryBanners"></v-swiper>
        <div class="site-nav row margin-bottom-10 bg-white">
            <router-link class="col" to="/library/donate">
                <img alt="" src="../../assets/library/img01.png">
                <p>我要捐书</p>
            </router-link>
            <router-link class="col" to="/library/donate_book">
                <img alt="" src="../../assets/library/img02.png">
                <p>我捐的书</p>
            </router-link>
            <router-link class="col" to="/library/borrow">
                <img alt="" src="../../assets/library/img03.png">
                <p>借阅的书</p>
            </router-link>
            <router-link class="col" to="/library/rule">
                <img alt="" src="../../assets/library/img04.png">
                <p>借阅规则</p>
            </router-link>
        </div>
        <div class="mod-card bg-white margin-bottom-10">
            <div class="hd">
                <div class="tit">最新上架</div>
                <div @click="goMoreBook" class="more">更多...</div>
            </div>
            <div class="bd">
                <div class="new-books row">
                    <template v-for="news in library.newList.slice(0,3)">
                        <div @click="goBookDetail" class="col text-center">
                            <div class="thumb margin-bottom-5">
                                <img :src="news.seoImg" alt="">
                            </div>
                            <div class="ellipsis-mulitiple2 text-xn">{{news.seoTitle}}</div>
                        </div>
                    </template>

                </div>
            </div>
        </div>
        <div class="mod-card bg-white margin-bottom-10">
            <div class="hd">
                <div class="tit">热门借阅</div>
                <div @click="goMoreBook" class="more">更多...</div>
            </div>
            <div class="bd">
                <div class="book-list ofh">

                    <template v-for="hot in library.hotReadList.slice(0,4)">
                        <div @click="goBookDetail" class="book width-50 fl">
                            <div class="thumb">
                                <img :src="hot.seoImg" alt="">
                            </div>
                            <div class="content">
                                <div class="margin-bottom-10 text-xn">{{hot.seoTitle}}</div>
                                <div class="text-sm c-gray">{{hot.seoExchangeCount}}人借阅</div>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </div>
        <div class="mod-card bg-white">
            <div class="hd">
                <div class="tit">全部书籍</div>
                <div @click="goMoreBook" class="more">更多...</div>
            </div>
            <div class="bd">
                <div class="book-list">

                    <template v-for="all in library.allBookList.slice(0,4)">
                        <div @click="goBookDetail" class="book">
                            <div class="thumb">
                                <img :src="all.seoImg" alt="">
                            </div>
                            <div class="content">
                                <div class="margin-bottom-10 text-xn">{{all.seoTitle}}</div>
                                <div class="margin-bottom-5 text-sm c-gray">{{all.seoExchangeCount}}人借阅</div>
                                <div class="text-sm c-gray">上架时间 {{all.updateTime}}</div>
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
  import VSwiper from '../../components/VSwiper.vue'
  import { mapActions } from 'vuex'
  import { GET_ALLBOOK_LIST, GET_HOTREAD_LIST, GET_LIBRARY_BANNER, GET_NEW_LIST } from '../../store/library/types'

  export default {
    name: 'library',
    data () {
      return {}
    },
    computed: {
      library () {
        return this.$store.state.library
      }
    },
    methods: {
      goSearch () {
        this.$router.push({
          name: 'Search',
          // params: { id: id }
        })
      },
      goMoreBook () {
        this.$router.push({
          name: 'BookList',
          // params: { id: id }
        })
      },
      goBookDetail () {
        this.$router.push({
          name: 'Detail',
          // params: { id: id }
        })
      },
      ...mapActions({
        getLibraryBanners: GET_LIBRARY_BANNER,
        getNewList: GET_NEW_LIST,
        getHotReadList: GET_HOTREAD_LIST,
        getAllBookList: GET_ALLBOOK_LIST
      })
    },
    created () {
      this.getLibraryBanners()
      this.getNewList()
      this.getHotReadList()
      this.getAllBookList()
      console.log(this.$store.state.library)
    },
    components: { VHead, VSwiper }
  }
</script>
<style lang="scss">

    .library-library {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .searchbox {
            padding: 5px;

            > div {
                border-radius: 5px;
            }

            .btn-search {
                margin-left: 10px;
                margin-top: 10px;
            }

            .input-search {
                margin-left: 30px;
                padding: 10px;
                font-size: 14px;
            }
        }

        .site-nav {
            overflow: hidden;
            padding: 8px 0 5px;
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
                    color: #333;
                }
            }
        }

        .mod-card {
            .hd {
                border-bottom: 0;
            }

            .bd {
                padding-bottom: 12px;
            }
        }

        .new-books {
            .col {
                padding: 9px;

                img {
                    width: 100%;
                }
            }
        }

        .book-list .book {
            overflow: hidden;
            padding: 8px;

            .thumb {
                float: left;
                width: 77px;
                height: 77px;

                img {
                    width: 100%;
                    min-height: 77px;
                }
            }

            .content {
                margin-left: 85px;
                padding-top: 5px;
            }
        }
    }

</style>
