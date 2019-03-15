<template>
    <div class="server-mymaintaining">
        <v-head title="我的报修"></v-head>
        <sift-nav></sift-nav>
      <div @click.stop="SwitchItem" class="tab row bg-white" data-top="y">
        <div data-value="0" :class="{'active':indexSwitch==='0'}" class="col"><span>全部</span></div>
        <div data-value="1" :class="{'active':indexSwitch==='1'}" class="col"><span>待处理</span></div>
        <div data-value="2" :class="{'active':indexSwitch==='2'}" class="col"><span>已完成</span></div>
      </div>
      <div class="img-tip data-null" v-show="list[indexSwitch].length===0">
        <img alt="" src="../../assets/library/null.png">
        <p>没有数据</p>
      </div>
      <div id="information"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10"
           infinite-scroll-immediate-check="false">
        <ul class="item-list padding-left-10 bg-white">
          <router-link :to="{path:'/detail_maintaining',query:{reoNo:n.reoNo}}"
                       tag="li"
                       v-for="(n,index) in list[indexSwitch]" :key="index">
            <div class="margin-bottom-10 text-normal">{{n.reoMemo}}</div>
            <div class="margin-bottom-5 text-sm c-gray">提交时间：{{n.createTime}}</div>
            <div class="text-sm c-gray">当前状态：<span :class="stateClass(n.reoState)">{{n.reoState|StatA}}</span></div>
          </router-link>
        </ul>
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Http from '../../store/Http'
  import { mapState } from 'vuex'
  import { InfiniteScroll } from 'mint-ui'
  import { copy } from '../../common/util'

  Vue.use(InfiniteScroll);
  export default {
    name: 'mymaintaining',
    data () {
      return {
        list: [[], [], []],
        indexSwitch: '0',
        loading: true
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      SwitchItem (event) {
        // 切换
        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break
            if (event.path[i].dataset.value) {
              const unEqual = event.path[i].dataset.value !== this.indexSwitch //不相等
              const isData = this.list[event.path[i].dataset.value].length === 0 //没有数据
              if (unEqual && isData) {
                this.getList(event.path[i].dataset.value, parseInt(this.list[event.path[i].dataset.value].length / 10 + 1)).then(() => {
                  // 加载完后切换
                  this.indexSwitch = event.path[i].dataset.value
                })
              } else {
                this.loading = this.list[event.path[i].dataset.value].length % 10 === 0 //可被整除
                this.indexSwitch = event.path[i].dataset.value
              }
              break
            }
          }

        }
      },
      loadMore () {
        // 加载更多
        this.getList(this.indexSwitch, parseInt(this.list[this.indexSwitch].length / 10 + 1))
      },
      getList (type, page = 1, size = 10) {
        // if (!this.info.itemId) return Promise.reject(new Error('没有this.info.itemId'))
        this.loading = true
        return Http.get('op/myRepairOrderList.json', {
          itemId: '',
          startPage: page,
          pageSize: size,
          type
        }).then(data => {
          if (data.data && data.data.length) {
            if (data.data.length >= 10) this.loading = false
            this.$set(this.list, type, (copy(this.list[type])).concat(data.data))
          } else {
            this.loading = true
          }
          return data
        })
      },
      stateClass (val) {
        //状态 0待分派 1处理中 2完成 3 返工 4已关闭 9已结案
        switch (parseInt(val)) {
          case 0:
            return 'c-red'
          case 3:
          case 1:
            return 'c-blue'
          case 2:
            return 'c-green'
          case 4:
          case 9:
            return 'c-gray'
          default:
            return ''
        }
      }
    },
    created () {
      this.getList(0)
    },
    filters: {
      StatA (val) {
        //状态 0待分派 1处理中 2完成 3 返工 4已关闭 9已结案
        switch (parseInt(val)) {
          case 0:
            return '待分派'
          case 1:
            return '处理中'
          case 2:
            return '已完成'
          case 3:
            return '返工'
          case 4:
            return '已取消'
          case 9:
            return '已结束'
          default:
            return ''
        }
      }
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .server-mymaintaining {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .item-list {
          > li {
                padding: 15px 15px 15px 0;
            border-bottom: 1px solid #ddd;
          }

          > li:last-child {
            border-bottom: none;
          }

            .thumb {
                float: right;
                width: 90px;
                height: 90px;

                img {
                    width: 100%;
                    min-height: 90px;
                }
            }

            .content {
                margin-right: 105px;
            }
        }
    }
</style>
