<template>
    <div class="questionnaire-question padding-bottom-90">
        <div class="header">
            <span @click="goBack" class="back-icon"></span>
        </div>
        <div class="article bg-white">
            <div class="hd border-b-ddd">
                <div class="margin-bottom-10 text-mx">11月社区物业满意度调查(1/10)</div>
                <div class="text-sm c-gray">截止至2018-12-30 16:14:01 来源红星物业</div>
            </div>
            <div class="bd text-md">
                <div class="tit">1.您对物业的总体满意度如何?</div>
                <!-- 单选框 -->
                <p class="margin-bottom-30"><input checked name="optionsRadios" type="radio" value="">非常满意</p>
                <p class="margin-bottom-30"><input name="optionsRadios" type="radio" value="">满意</p>
                <p class="margin-bottom-30"><input name="optionsRadios" type="radio" value="">一般</p>
                <p class="margin-bottom-30"><input name="optionsRadios" type="radio" value="">不满意</p>
                <!-- 复选框 -->
                <p class="margin-bottom-30"><input name="option1" type="checkbox" value="">不满意</p>
                <p class="margin-bottom-30"><input name="option2" type="checkbox" value="">不满意</p>
                <p class="margin-bottom-30"><input name="option3" type="checkbox" value="">不满意</p>
                <p class="margin-bottom-30"><input name="option4" type="checkbox" value="">不满意</p>
                <!-- 文本域 -->
                <textarea placeholder="请输入您的建议"></textarea>
            </div>
        </div>
        <div class="fixed-bottom row">
            <div class="btn bg-white col">上一题</div>
            <div class="btn bg-red col">下一题</div>
            <!-- 追后一题后显示提交问卷-->
            <!-- <div class="btn bg-red col" @click="showModal">提交问卷</div> -->
        </div>
        <modal @close="closeModal" btnname="返回填写/确认提交" content="您还有2/10题未填写答案,是否返回填写?,当前已是最后一题,是否提交?" hidebtn='true'
               title="问卷提交" v-show="isModalVisible"/>
    </div>
</template>
<script>
  import router from '../../router/index'
  import Modal from '../../components/Modal.vue'

  export default {
    name: 'question',
    data () {
      return {
        isModalVisible: false
      }
    },
    methods: {
      showModal: function () {
        this.isModalVisible = true
      },
      closeModal: function () {
        this.isModalVisible = false
      },
      goBack () {
        router.go(-1)
      }
    },
    components: { Modal }
  }
</script>
<style lang="scss">
    .questionnaire-question {
        .header {
            position: relative;
            padding: 0 20px;
            height: 45px;
            line-height: 45px;
            background: #fff;
        }

        .header .back-icon {
            position: absolute;
            left: 5px;
            top: 5px;
            background: url("../../assets/icon/arrow_left_black.png") no-repeat center;
            background-size: 70% 70%;
            height: 35px;
            width: 35px;
        }

        .article {
            .hd {
                padding: 15px;
            }

            .bd {
                padding: 15px;

                .tit {
                    margin-bottom: 20px;
                }
            }
        }

        input[type="radio"],
        input[type="checkbox"] {
            display: inline-block;
            vertical-align: middle;
            margin-right: 15px;
            margin-bottom: 2px;
        }

        textarea {
            padding: 10px;
            width: 100%;
            height: 142px;
            border: 1px solid #cfcfcf;
            background: #fbfbfb;
        }

        .fixed-bottom {
            .btn {
                border-radius: 0;

                &.bg-white {
                    color: $text;
                }
            }
        }
    }
</style>
