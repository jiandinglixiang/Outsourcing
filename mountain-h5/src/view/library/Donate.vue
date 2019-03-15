<template>
    <div class="library-donate">
        <v-head title="我要共享"></v-head>
        <sift-nav></sift-nav>
        <div class="padding-left-10 bg-white">
            <div class="control ofh">
                <div class="fl">联系姓名</div>
                <div class="fr">
                    <input class="text-right" placeholder="请输入姓名" type="text">
                </div>
            </div>
            <div class="control ofh">
                <div class="fl">联系电话</div>
                <div class="fr">
                    <input class="text-right" placeholder="请输入联系电话" type="text">
                </div>
            </div>
            <div class="control ofh">
                <div class="fl">捐书数量</div>
                <div class="fr">
                    <input class="text-right" placeholder="请输入整本" type="text">
                </div>
            </div>
            <div class="control ofh">
                <div class="fl">捐书名称</div>
                <div class="fr">
                    <input class="text-right" placeholder="请输入书籍名称,可多本" type="text">
                </div>
            </div>
            <div class="control ofh">
                <div class="fl">期望上门日期</div>
                <div class="fr">
                    <input class="text-right" placeholder="选择日期" type="data">
                </div>
            </div>
            <div class="control ofh higher">
                <div class="fl margin-right-10">备注</div>
                <div class="fl">
                    <textarea placeholder="请写下备注内容,我们的工作人员将为您服务"></textarea>
                </div>
            </div>
            <div class="control ofh uploadimg">
                <div class="">上传图片</div>
                <div class="upload">
                    <ul>
                        <li class="del"><img alt="" src="http://placehold.it/142"></li>
                        <li><img alt="" src="../../assets/add_img.png"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fixed-bottom">
            <div @click="showModal" class="btn bg-blue">提交捐书</div>
        </div>
        <modal @close="closeModal" btnname="我的捐书" content="您的捐书信息已成功提交,我们的工作人员会尽快联系您,请您保持手机畅通" hidebtn='true'
               imgurl='../../assets/success.png' title="提交成功" v-show="isModalVisible"/>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Modal from '../../components/Modal.vue'

  export default {
    name: 'donate',
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {
    },
    components: { VHead, SiftNav, Modal }
  }
</script>
<style lang="scss">
    .library-donate {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .control {
            padding: 0 15px 0 5px;
            height: 44px;
            line-height: 43px;
            border-top: 1px solid #ddd;
            font-size: 14px;

            &:first-child {
                border-top: 0;
            }

            &.higher {
                height: 89px;
            }

            &.uploadimg {
                height: auto;
            }
        }

        .btn {
            border-radius: 0;
        }

        textarea {
            padding: 13px 10px;
            width: 280px;
            height: 88px;
        }

        .upload {
            img {
                width: 71px;
                height: 71px;
            }

            ul {
                *zoom: 1;

                &:before, &:after {
                    content: " ";
                    display: table;
                    clear: both;
                }

                li {
                    float: left;
                    margin-bottom: 20px;
                    margin-right: 20px;
                    height: 71px;

                    &.del {
                        position: relative;

                        &:after {
                            content: '';
                            position: absolute;
                            top: -9px;
                            right: -9px;
                            width: 18px;
                            height: 18px;
                            background-image: url(../../assets/icon/close_red.png);
                            background-size: cover;
                        }
                    }
                }
            }
        }
    }

</style>
