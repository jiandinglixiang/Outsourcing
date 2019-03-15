<template>
  <div class="msgarticle">
    <div class="vhead">
      <span @click="$router.back()" class="back-icon"></span>
      <!--<span @click="share" class="right share-icon"></span>-->
    </div>
    <div class="article">
      <div class="hd">
        <div class="tit">消息详情</div>
        <div class="meta">
          <span class="data">{{msg.createTime}}</span>
          <span class="from">来源：红星集团新闻</span>
        </div>
      </div>
      <div class="bd ptindent">
        <article>
          {{msg.meContext}}
        </article>
      </div>
    </div>
  </div>
</template>
<script>
  import { http } from '../../store/Http'

  export default {
    name: 'msgArticle',
    data () {
      return {
        msg: {}
      }
    },
    methods: {
      goSingUp () {
        // 不能分享
      }
    },
    created () {
      if (this.$route.query.id) {
        http.get('op/succeed.json', {
          id: this.$route.query.id
        }).then(data => {
          this.msg = {
            'meTitle': '我的消息标题',      //消息标题
            'meLab': '我的消息标签',      //消息标签
            'meContext': '我的消息我的消息我的消息',      //消息内容 200字内
            'createTime': '2019-02-10 12:23:05',      //消息时间
          }
        })
      }
    },
    components: {}
  }
</script>
<style lang="scss">
  .msgarticle {
    html, body & {
      background-color: $white;
    }

    .vhead {
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
      left: 5px;
      top: 5px;
    }

    .vhead .right {
      position: absolute;
      right: 20px;
      top: 12px;
    }

    .vhead .back-icon {
      background: url("../../assets/icon/arrow_left_black.png") no-repeat center;
      background-size: 70% 70%;
      height: 35px;
      width: 35px;
    }

    .article {
      > .hd {
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
