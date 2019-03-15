<template>
    <div class="library-donatebook">
      <v-head title="我的共享"></v-head>
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
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10"
           infinite-scroll-immediate-check="false">
        <ul class="book-list bg-white">
          <router-link tag="li" :to="{path:'/library/donation_particulars',query:{ reoNo: n.reoNo||1 }}" class="book"
                       v-for="(n,index) in list[indexSwitch]" :key="index">
            <div class="thumb">
              <img alt="" :src="n.sedImg">
            </div>
            <div class="content">
              <div class="margin-bottom-10 text-xn">{{n.sedTitle}}</div>
              <div class="margin-bottom-5 text-sm c-gray">捐书数量: {{n.sedCount}}</div>
              <div class="margin-bottom-5 text-sm c-gray">发起时间:{{n.createTime}}</div>
              <div class="text-sm c-gray">当前状态:<span class="c-red">{{n.sedState}}待确认</span></div>
            </div>
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
    name: 'donatebook',
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
                this.loading = this.list[event.path[i].dataset.value].length % 10 === 0
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
        return Http.get('op/myShareList.json', {
          itemId:' this.info.itemId',
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
    },
    created () {
      this.getList(0)
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .library-donatebook {
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
