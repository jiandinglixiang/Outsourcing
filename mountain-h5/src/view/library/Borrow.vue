<template>
  <div class="library-borrow">
    <v-head title="我的租借"></v-head>
    <sift-nav></sift-nav>
    <div @click.stop="SwitchItem" class="tab row bg-white" data-top="y">
      <div data-value="0" :class="{'active':indexSwitch==='0'}" class="col"><span>全部</span></div>
      <div data-value="1" :class="{'active':indexSwitch==='1'}" class="col"><span>在借</span></div>
      <div data-value="2" :class="{'active':indexSwitch==='2'}" class="col"><span>已还</span></div>
    </div>
    <div class="img-tip data-null" v-show="list[indexSwitch].length===0">
      <img alt="" src="../../assets/library/null.png">
      <p>没有数据</p>
    </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false">
      <ul class="book-list bg-white" @click.stop="goBorrowDdetai" data-top="y">
        <li data-value="li" :data-query="n.sebNo" class="book" v-for="(n,index) in list[indexSwitch]" :key="index">
          <div class="thumb">
            <img alt="" :src="n.sebImg">
          </div>
          <div class="content">
            <div class="margin-bottom-5 text-xn">{{n.sebTitle}}</div>
            <div class="margin-bottom-3 text-sm c-gray">借出时间:{{ n.createTime}}</div>
            <div class="margin-bottom-3 text-sm c-gray">待还时间: {{ n.wantTime}}</div>
            <div class="margin-bottom-3 text-sm c-gray">已借天数: 7</div>
            <div class="margin-bottom-3 text-sm c-gray">预扣积分: {{ n.sebSubTotal}}</div>
            <div class="text-sm c-gray">当前状态:<span :class="itemStaCla(n.sebFlow,true)">{{n.sebFlow|Start}}</span></div>
          </div>
        </li>
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

  function filters (val, cla) {
    // "sebFlow": "0",  //状态 0提交订单 1押付完成 2等待交付 3已租借 4未归还 5已延迟 9已归还
    switch (parseInt(val)) {
      case 0:
        return cla ? 'c-blue' : `提交订单`;
      case 1:
        return cla ? 'c-blue' : `押付完成`;
      case 2:
        return cla ? 'c-blue' : `等待交付`;
      case 3:
        return cla ? 'c-blue' : `已租借`;
      case 4:
        return cla ? 'c-blue' : `未归还`;
      case 5:
        return cla ? 'c-red' : `已延迟`;
      case 9:
        return cla ? 'c-green' : `已归还`;
      default:
        return cla ? 'c-red' : '未知'
    }
  }
  export default {
    name: 'borrow',
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
        return Http.get('op/myBorrowList.json', {
          itemId: 'this.info.itemId',
          startPage: page,
          pageSize: size
        }).then(data => {
          if (data.data && data.data.length) {
            (data.data.length >= 10) && (this.loading = false)
            this.$set(this.list, type, (copy(this.list[type])).concat(data.data))
          } else {
            this.loading = true
          }
          return data
        })
      },
      goBorrowDdetai (event) {
        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break
            if (event.path[i].dataset.value === 'li') {
              this.$router.push({
                path: '/library/BorrowDetail',
                query: { sebNo: event.path[i].dataset.query }
              })
              break
            }
          }
        }
      },
      itemStaCla: filters
    },
    created () {
      this.getList(0)
    },
    filters: {
      Start: filters
    },
    components: {VHead, SiftNav}
  }
</script>
<style lang="scss">
  .library-borrow {
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
