<template>
    <div class="library-booklist">
        <v-head title="共享空间"></v-head>
        <div class="bg-white">
            <div class="height-lh-44 border-b-ddd text-center c-gray">
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
                        <span>按借阅数</span>
                    </div>
                    <div class="col">
                        <span>按上架时间</span>
                    </div>
                </form>
            </div>
            <div class="book-list">
                <template v-for="news in library.newList">
                    <div @click="goBookDetail(news.id)" class="book">
                        <div class="thumb">
                            <img :src="news.seoImg" alt="">
                        </div>
                        <div class="content">
                            <div class="margin-bottom-10 text-xn">{{news.seoTitle}}</div>
                            <div class="margin-bottom-5 text-sm c-gray">{{news.seoExchangeCount}}人借阅</div>
                            <div class="text-sm c-gray">上架时间 {{news.updateTime}}</div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { GET_NEW_LIST } from '../../store/library/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'booklist',
    data () {
      return {}
    },
    computed: {
      library () {
        return this.$store.state.library
      }
    },
    methods: {
      goBookDetail (id) {
        this.$router.push({
          name: 'Detail',
          params: { id: id }
        })
      },
      ...mapActions({
        getNewList: GET_NEW_LIST
      })
    },
    created () {
      this.getNewList()
      console.log(this.$store.state)
    },
    components: { VHead }
  }
</script>
<style lang="scss">
    .library-booklist {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .book-list .book {
            overflow: hidden;
            padding: 8px;

            .thumb {
                float: left;
                width: 76px;
                height: 110px;

                img {
                    width: 100%;
                    min-height: 110px;
                }
            }

            .content {
                margin-left: 85px;
                padding-top: 5px;
            }
        }
    }

</style>
