<template>
    <div class="library-search">
        <div class="search-hd">
            <span @click="goBack" class="back-icon"></span>
            <div>
                <div class="input-search bg-white">
                    <span class="search-icon"></span>
                    <span class="close-icon"></span>
                    <input placeholder="请输入书籍名称" type="text">
                </div>
                <div class="right btn-search">搜索</div>
            </div>
        </div>
        <div class="history bg-white">
            <div class="row margin-bottom-15">
                <div class="col">搜索历史</div>
                <div class="col text-right c-blue">清空</div>
            </div>
            <div class="his-list">
                <div class="margin-bottom-10 text-sm c-gray"><i class="icon search-icon"></i>圣武</div>
                <div class="text-sm c-gray"><i class="icon search-icon"></i>风行</div>
            </div>
        </div>
        <div class="search-result bg-white">
            <div class="hd-tit border-b-ddd">搜索：<span class="c-red">杀手</span></div>
            <div class="book-list ofh">
                <div class="book">
                    <div class="thumb">
                        <img alt="" src="http://placehold.it/152x220">
                    </div>
                    <div class="content">
                        <div class="margin-bottom-10 text-xn">标题标题标题标题</div>
                        <div class="text-sm c-gray">126人借阅</div>
                    </div>
                </div>
                <div class="book">
                    <div class="thumb">
                        <img alt="" src="http://placehold.it/152x220">
                    </div>
                    <div class="content">
                        <div class="margin-bottom-10 text-xn">标题</div>
                        <div class="text-sm c-gray">126人借阅</div>
                    </div>
                </div>
                <div class="book">
                    <div class="thumb">
                        <img alt="" src="http://placehold.it/152x220">
                    </div>
                    <div class="content">
                        <div class="margin-bottom-10 text-xn">标题</div>
                        <div class="text-sm c-gray">126人借阅</div>
                    </div>
                </div>
                <div class="book">
                    <div class="thumb">
                        <img alt="" src="http://placehold.it/152x220">
                    </div>
                    <div class="content">
                        <div class="margin-bottom-10 text-xn">标题</div>
                        <div class="text-sm c-gray">126人借阅</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import router from '../../router/index'

  export default {
    name: 'search',
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

    .library-search {
        .search-icon {
            width: 16px;
            height: 16px;
        }

        .search-hd {
            position: relative;
            height: 45px;
            padding: 7px 50px 0;
            background-color: $blue;
            color: $white;

            .back-icon {
                position: absolute;
                left: 5px;
                top: 5px;
                background: url("../../assets/icon/back.png") no-repeat center;
                background-size: 70% 70%;
                height: 35px;
                width: 35px;
            }

            .right {
                position: absolute;
                right: 10px;
                top: 12px;
            }

            .input-search {
                position: relative;
                overflow: hidden;
                padding: 0 15px 0 20px;
                height: 30px;
                border-radius: 15px;

                input {
                    height: 30px;
                    border-radius: 0;
                }

                span {
                    position: absolute;
                    display: block;

                }

                .search-icon {
                    top: 7px;
                    left: 8px;
                }

                .close-icon {
                    top: 9px;
                    right: 8px;
                    width: 12px;
                    height: 12px;
                }
            }
        }

        .history {
            padding: 15px 20px;

            .search-icon {
                margin-bottom: 2px;
                margin-right: 10px;
            }
        }

        .search-result {
            .hd-tit {
                padding: 0 15px;
                height: 48px;
                line-height: 47px;
            }
        }

        .book-list {
            padding: 8px 15px;

            .book {
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
    }
</style>
