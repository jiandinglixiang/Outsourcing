<template>
    <div class="user-message">
        <v-head title="我的消息"></v-head>
      <siftnav></siftnav>
      <ul id="information"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
          infinite-scroll-immediate-check="false">
        <router-link :key="index" tag="li" :to="{path:'/user/message_article',query:{id:n.meTitle}}" v-for="(n,index) in list">
          <div class="card margin-bottom-10 new">
            <div class="text-center c-gray">{{n.createTime}}</div>
            <div class="box bg-white">
              <div class="top border-b-ddd">
                <div class="margin-bottom-10 text-ml">{{n.meTitle}}</div>
                <div class="ct text-normal">{{n.meContext}}</div>
              </div>
              <div class="link-detail padding-auto-15 c-gray text-sm">点击查看</div>
            </div>
          </div>
        </router-link>
      </ul>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import Siftnav from '../../components/SiftNav'
  import { mapState } from 'vuex'
  import { copy } from '../../common/util'
  import Http from '../../store/Http'

  export default {
    name: 'message',
    data () {
      return {
        list: [],
        loading: true
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      loadMore () {
        // 加载更多
        this.getList(parseInt(this.list.length / 10 + 1))
      },
      getList (page = 1, size = 10) {
        // if (!this.info.itemId) return
        this.loading = true
        Http.get('op/myMessageList.json', {
          itemId: 'this.info.itemId',
          startPage: page,
          pageSize: size
        }).then(data => {
          if (data.data && data.data.length) {
            if (data.data.length >= 10) this.loading = false
            this.list = (copy(this.list)).concat(data.data)
          }
        })
      },
    },
    created () {
      this.getList()
    },
    components: {Siftnav, VHead}
  }
</script>
<style lang="scss">

    .user-message {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .card {
            padding: 0 13px;

            .box {
                border-radius: 5px;
            }

            .text-center {
                padding: 10px 0;
            }

            .link-detail {
                height: 36px;
                line-height: 36px;
            }

            .top {
                padding: 15px;
            }

            .padding-auto-15 {
                padding: 0 15px;
            }

            .ct {
                color: $c666;
            }

            &.new {
                .box {
                    position: relative;

                    &:after {
                        position: absolute;
                        content: '';
                        top: 5px;
                        right: 5px;
                        width: 8px;
                        height: 8px;
                        border-radius: 100%;
                        background: $red;
                    }
                }
            }
        }
    }
</style>
