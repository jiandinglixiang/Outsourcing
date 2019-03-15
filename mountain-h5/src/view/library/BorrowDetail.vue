<template>
  <div class="library-bookdetail">
    <v-head title="租借详情"></v-head>
    <sift-nav></sift-nav>
    <div class="card bg-white margin-bottom-10">
      <div class="card-detail padding-left-20">
        <div class="control curr" v-for="(n,index) in detail.track" :key="index">
          <div class="margin-bottom-3 text-normal">{{n.seitTitle}}</div>
          <p class="text-sm c-gray">{{ n.createTime}}</p>
        </div>
        <div class="control curr">
          <div class="margin-bottom-3 text-normal">上门取书(未取)</div>
          <!-- <div class="margin-bottom-3 text-normal">上门取书(已借<span class="c-blue">12</span>天)</div> -->
        </div>
        <div class="control curr">
          <div class="margin-bottom-3 text-normal">图书归还(最迟归还{{detail.wantTime}})</div>
          <!-- <div class="text-normal">上门取书(<span class="c-red">已超12天</span>,最迟归还2018-12-20)</div> -->
          <!-- <div class="text-normal">上门取书(<span class="c-red">推迟3天</span>)</div> -->
          <!-- <div class="text-normal">图书归还(<span class="c-green">按时归还</span>)</div> -->
        </div>
        <div class="control curr">
          <div class="text-normal">已取消</div>
        </div>
      </div>
    </div>
    <div class="mod-card bg-white">
      <div class="hd">
        <div class="tit">书籍详情</div>
      </div>
      <div class="bd">
        <div class="book-list">
          <div class="book">
            <div class="thumb">
              <img alt="" :src="detail.seoImg">
            </div>
            <div class="content">
              <div class="margin-bottom-10 text-xn">{{detail.seoTitle}}</div>
              <div class="margin-bottom-5 text-sm c-gray">{{detail.seoExchangeCount}}人借阅</div>
              <div class="text-sm c-gray">上架时间{{ detail.seoTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click.stop="offApply"
         style="margin-top:10%;line-height: 45px;color: white;background-color: #4297e8;text-align: center;">取消申请
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { http } from "../../store/Http";

  export default {
    name: 'BorrowDetail',
    data () {
      return {
        detail: {
          track: []
        }
      }
    },
    methods: {
      offApply () {
        // 取消申
        Http.get('op/myRepairOrderCancel.json', {
          itemId: '',
          reoNo: ''
        }).then(() => {
          this.getDetail()
        })
      },
      getDetail () {
        http.get('op/myBorrowDetail.json', {
          itemId: '',
          sebNo: this.$route.query.sebNo
        }).then(data => {
          this.detail = data.data
          console.log(data.data)
        })
      }
    },
    created () {
      if (this.$route.query.sebNo) {
        this.getDetail()
      }
    },
    components: {VHead, SiftNav}
  }
</script>
<style lang="scss">
  .library-bookdetail {
    .vhead {
      background-color: $blue;
      color: $white;
    }

    .card {
      padding: 18px 15px 5px;
    }

    .card-detail {
      position: relative;

      &:before {
        position: absolute;
        left: 0;
        top: 5px;
        content: '';
        width: 0;
        height: 110px;
        // height: 80%;
        border-left: 1px solid $cCcc;
      }

      .control {
        position: relative;
        height: 50px;

        &:before {
          position: absolute;
          top: 5px;
          left: -25px;
          content: '';
          width: 11px;
          height: 11px;
          border-radius: 100%;
          background: $cCcc;
        }

        .text-normal {
          color: $c999;
        }

        &.curr {
          &:before {
            background: $green;
          }

          .text-normal {
            color: $text;
          }
        }
      }
    }

    .mod-card {
      .hd {
        border-bottom: 0;
      }

      .bd {
        padding: 8px 20px 20px;
      }
    }

    .book-list .book {
      overflow: hidden;

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
