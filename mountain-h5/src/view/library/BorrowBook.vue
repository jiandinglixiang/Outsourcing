<template>
    <div class="library-borrowbook">
        <div class="vhead">
            <span @click="goBack" class="back-icon"></span>
            <span class="share-white-icon right"></span>
        </div>
        <div class="info ofh">
            <div class="thumb fl">
                <img alt="" src="http://placehold.it/200x286">
            </div>
            <div class="content">
                <div class="name margin-bottom-10 text-ml">标题标题标题标题</div>
                <div class="margin-bottom-5 text-sm">126人借阅</div>
                <div class="text-sm">上架时间 2018-12-11</div>
            </div>
        </div>
        <div class="rule-content padding-20 bg-white">
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
        </div>
        <div class="fixed-bottom">
            <div class="btn bg-red">预付押金100积分</div>
            <!-- <div class="btn bg-gray">预付押金100积分,积分不足</div> -->
        </div>
    </div>
</template>
<script>
  import { http } from "../../store/Http";

  export default {
    name: 'borrowbook',
    data () {
      return {}
    },
    computed: {},
    methods: {
      goBack () {
        router.go(-1)
      }
    },
    created () {
    },
    components: {}
  }
</script>
<style lang="scss">
    @import "../../style/icon.css";
    /*html,body {*/
    /*background: #fff;*/
    /*}*/
    .library-borrowbook {
        .vhead {
            position: relative;
            height: 45px;
            background: #010208;
            background-size: cover;
            color: $white;

            .back-icon {
                position: absolute;
                left: 5px;
                top: 5px;
                background-size: 70% 70%;
                height: 35px;
                width: 35px;
            }

            .right {
                position: absolute;
                right: 10px;
                top: 9px;
            }
        }

        .info {
            position: relative;
            padding: 7px 15px 0;
            height: 166px;
            background-image: url(../../assets/user/topbg.png);
            color: #fff;

            .thumb {
                width: 100px;
                height: 143px;

                img {
                    max-width: 100%;
                }
            }

            .content {
                margin-left: 118px;

                .name {
                    overflow: hidden;
                    height: 1.4em *4;
                }
            }
        }

        .rule-content {
            padding-bottom: 60px;
            line-height: 1.5;
            font-size: 14px;

            h2 {
                font-weight: normal;
                font-size: 16px;
            }

            h2, p {
                margin-bottom: 10px;
            }
        }
    }

</style>
