<template>
	<div class="notice-article">
    <div class="vhead">
      <span class="back-icon" @click="goBack"></span>
      <span class="right share-icon" @click="share"></span>
    </div>
    <div class="article">
      <div class="hd">
        <div class="tit">{{notice.noticeDetail.noTitle}}</div>
        <div class="meta">
          <span class="data">{{notice.noticeDetail.updateTime}}</span>
          <span class="from">来源：{{notice.noticeDetail.noFrom}}</span>
        </div>
      </div>
      <div class="bd ptindent">
      <!-- 公共详情 -->
        <article>
          <p class="ptd0"><img :src="notice.noticeDetail.noImg" alt=""></p>
          <p>{{notice.noticeDetail.noContextHtml}}</p>
        </article>
        <!-- 公共详情-活动 -->
        <article>
          <h2>尊敬的业主：</h2>
          <p>自古以来，中华民族就乐于助人、知恩图报。“受人滴水之恩，当以涌泉相报”一度传为名句。怀有一颗感恩的心，帮助那些需要Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, quibusdam!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates soluta quos quae voluptate possimus, cum, aliquam est vitae voluptatibus earum assumenda. Autem harum repellat mollitia pariatur quos accusantium beatae neque.</p>
          <h2 class="tit">活动安排</h2>
          <p class="ptd0">1 Lorem ipsum dolor sit amet.</p>
          <p class="ptd0">2 Lorem ipsum dolor sit amet. </p>
          <p class="ptd0">3 Lorem ipsum dolor sit amet.</p>
          <p class="ptd0">4 Lorem ipsum dolor sit amet. </p>
          <div class="btns">
            <!-- 报名按钮状态 3显示1 -->
            <div class="btn bg-red" @click="goSingUp">提交报名</div>
            <div class="btn bg-blue">已报名</div>
            <div class="btn bg-gray">活动已过期</div>
            <!-- 问卷按钮状态 3显示1 -->
            <div class="btn bg-blue" @click="goQuestSurvey">问卷调查</div>
            <div class="btn bg-green">问卷已提交</div>
            <div class="btn bg-gray">问卷已过期</div>
          </div>
          <div class="tips">报名时间截止至2018年12月22日 18:00</div>
          <div class="tips">目前已有<span class="c-blue">23</span>人报名</div>
        </article>
      </div>
    </div>
	</div>
</template>
<script>
  import router from '../../router/index'
  import { GET_NOTICE_DETAIL } from '../../store/notice/types'
  import { mapActions } from 'vuex'

  export default {
    name: 'article',
    data () {
      return {
      }
    },
    computed: {
      notice () {
        return this.$store.state.notice;
      }
    },
    methods: {
      ...mapActions({
        getNoticeDetail: GET_NOTICE_DETAIL
      }),
      goBack () {
        router.go(-1);
      },
      share () {
        console.log('分享按钮')
      },
      goSingUp() {
        this.$router.push({
          name: 'FillIn',
          // params: {id: id}
        })
      },
      goQuestSurvey() {
        this.$router.push({
          name: 'QuestSurvey',
          // params: {id: id}
        })
      }
    },
    created () {
      this.getNoticeDetail(this.$route.params.id);
      console.log(this.$route.params.id);
      console.log(this.$store.state.notice);
    },
    components: {}
  }
</script>
<style lang="scss">


  .notice-article {  .vhead {
    position: relative;
    padding: 0 20px;
    height: 45px;
    background: #fff;
    font-size: 18px;
    color: #333;
    text-align: center;
    line-height: 45px;
  }
    .vhead .back-icon {
      position: absolute;
      left: 5px; top: 5px;
    }
    .vhead .right {
      position: absolute;
      right: 20px;
      top: 12px;
    }
    .vhead .back-icon {
      background: url("../../assets/icon/arrow_left_black.png") no-repeat center;
      background-size: 70% 70%;
      height: 35px; width: 35px;
    }
    >.hd {
      padding: 5px 12px 18px;
      .tit {
        margin-bottom: 10px;
        line-height: 1.5;
        font-size: 20px;
      }
      .meta {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 5px;
        }
      }
    }
    .bd {
      padding: 0 12px 15px;
    }
    .btns {
      padding: 1em 0;
    }
    .tips {
      text-align: center;
      font-size: 13px;
      color: #999;
    }
    article {
      line-height: 1.5;
      font-size: 14px;
      .ptindent & {
        text-indent: 2em;
      }
      h2 {
        margin-bottom: .5em;
        font-size: 14px;
        font-weight: bold;
        text-indent: 0;
        &.tit {
          margin-bottom: .3em;
        }
      }
      p {
        margin-bottom: .5em;
        &.ptd0 {
          text-indent: 0;
        }
      }
      img {
        width: 100%;
      }
    }
  }

</style>
