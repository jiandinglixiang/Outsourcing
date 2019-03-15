<template>
    <div class="notice-fillin">
        <v-head hideNav="true" title="活动报名"></v-head>
        <div class="from">
            <div class="control">
                <p>请留下您的资料，<span class="c-red">*</span>号为必填项</p>
            </div>
            <div class="control username padding-left-30 padding-right-20 hlight">
                <input placeholder="请输入您的姓名" type="text">
            </div>
            <div class="control phonenum padding-left-30 padding-right-20 hlight">
                <input placeholder="请输入您的手机号" type="text">
            </div>
            <div class="control addr padding-left-30 padding-right-20">
                <input placeholder="" type="text" value="世欧王庄1246546">
            </div>
            <div class="control remarks padding-left-30 border-none padding-right-20">
                <textarea placeholder="备注"></textarea>
            </div>
        </div>
        <div class="fixed-bottom row">
            <div @click="goBack" class="btn bg-white col">取消返回</div>
            <div class="btn bg-blue col">确定提交</div>
        </div>
    </div>
</template>
<script>
  import router from '../../router/index'
  import VHead from '../../components/VHead.vue'

  export default {
    name: 'fillin',
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
    components: { VHead }
  }
</script>
<style lang="scss">

    .notice-fillin {
        background-color: $white;

        .vhead {
            background-color: $blue;
            color: #fff;
        }

        .from {
            padding-left: 13px;
            font-size: 14px;

            .control {
                position: relative;
                border-bottom: 1px solid #ddd;

                &:before {
                    position: absolute;
                    left: 0;
                    top: 9px;
                    content: '';
                    width: 24px;
                    height: 24px;
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                p {
                    height: 44px;
                    line-height: 44px;
                }

                input {
                    padding: 0;
                    width: 100%;
                    height: 44px;
                    border: none;
                    color: #666;

                    ::placeholder {
                        color: #999;
                    }

                    :-ms-input-placeholder {
                        color: #999;
                    }

                    ::-ms-input-placeholder {
                        color: #999;
                    }
                }

                textarea {
                    padding: 12px 0;
                    width: 100%;
                    height: 78px;
                    color: #666;
                }

                &.hlight {
                    &:after {
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        margin-top: -13px;
                        content: '*';
                        font-size: 20px;
                        color: #fc4538;
                    }
                }

                &.remarks {
                    height: 78px;
                    border: none;
                }
            }

            .username {
                &:before {
                    background-image: url(../../assets/notice/user.png);
                }
            }

            .phonenum {
                &:before {
                    background-image: url(../../assets/notice/phone.png);
                }
            }

            .addr {
                &:before {
                    background-image: url(../../assets/notice/addr.png);
                }
            }

            .remarks {
                &:before {
                    background-image: url(../../assets/notice/remarks.png);
                }
            }
        }
    }

</style>
