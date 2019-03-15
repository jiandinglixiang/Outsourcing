<template>
    <div class="notice-notice">
        <v-head title="社区公告"></v-head>
        <sift-nav></sift-nav>
        <div class="mod-card">
            <div class="hd">
                <div class="tab row">
                    <div class="col active"><span>集团公告</span></div>
                    <div class="col"><span>社区公告</span></div>
                </div>
            </div>
            <div class="bd">
                <div>
                    <div class="news-list">
                        <div @click="goCurrentNotice()" class="item">
                            <div class="tit">为什么中国坚持开放?习近平用实践告诉你</div>
                            <div class="meta">
                                <span class="data">2018-12-15 16:15:22</span>
                                <span class="from">来源:央视新闻</span>
                            </div>
                        </div>
                        <div @click="goCurrentNotice()" class="item">
                            <div class="tit">西安Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati,
                                quae.
                            </div>
                            <div class="meta">
                                <span class="data">2018-12-15 16:15:22</span>
                                <span class="from">来源:央视新闻</span>
                            </div>
                        </div>
                    </div>
                    <div class="news-list">
                        <div @click="goCurrentNotice()" class="item">
                            <div class="thumb"><img alt="" src="http://placehold.it/200x142"></div>
                            <div class="content">
                                <div class="tit">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                                    obcaecati nisi ex, magni perspiciatis architecto, doloribus ut incidunt eius. Qui.
                                </div>
                                <div class="meta">
                                    <span class="data">2018-12-15 16:15:22</span>
                                    <span class="from">来源:央视新闻</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'

  export default {
    name: 'notice',
    data () {
      return {}
    },
    computed: {},
    methods: {
      goCurrentNotice () {
        this.$router.push({
          name: 'Article',
          // params: {id: id}
        })
      }
    },
    created () {
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .notice-notice {
        .vhead {
            background: $blue;
            color: #fff;
        }

        .mod-card {
            background-color: $white;

            .hd {
            }

            .bd {
                padding-left: 12px;
            }
        }

        .news-list {
            .item {
                overflow: hidden;
                padding: 9px 10px;
                border-bottom: 1px solid #ddd;
            }

            .tit {
                overflow: hidden;
                margin-bottom: 5px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 15px;
            }

            .meta {
                font-size: 12px;
                color: #999;

                span {
                    margin-right: 5;
                }
            }

            .thumb {
                float: right;
                width: 100px;
                height: 71px;

                img {
                    width: 100%;
                    max-height: 71px;
                }
            }

            .content {
                margin-right: 122px;
            }
        }
    }
</style>
