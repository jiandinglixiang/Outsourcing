<template>
    <div class="server-warranty">
        <v-head title="报事报修"></v-head>
        <sift-nav></sift-nav>
        <div class="warranty-from margin-bottom-10 padding-left-12 bg-white">
            <div class="control border-b-ddd textarea">
                <label for="">报修内容</label>
                <div class="input-textarea">
                    <textarea placeholder="填写下您的报修内容，我们的工作人员将为您报备" v-model="memo"></textarea>
                </div>
            </div>
            <div class="control border-b-ddd">
                <label for="">语音报修</label>
                <div class="input-text fl">
                    <!-- <input type="text" placeholder=""> -->
                    <div class="audio text-normal c-gray"><i class="icon audio-icon"></i>按住说话</div>
                </div>
            </div>
            <div class="control">
                <label for="">上传图片</label>
                <div class="upload">
                    <!--  <ul>
                      <li class="del"><img src="http://placehold.it/142" alt=""></li>
                      <li class="del"><img src="http://placehold.it/142" alt=""></li>
                      <li><img src="../../assets/add_img.png" alt=""></li>
                    </ul> -->
                    <el-upload :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                               action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"><i
                            class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img :src="dialogImageUrl" alt="" width="100%">
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="warranty-from padding-left-12 bg-white">
            <div class="control border-b-ddd">
                <label for="">房源</label>
                <div class="input-text fr">
                    <input placeholder="优胜美地小区22栋1206号" type="text" v-model="resources">
                </div>
            </div>
            <div class="control border-b-ddd">
                <label for="">联系姓名</label>
                <div class="input-text fr">
                    <input placeholder="请输入姓名" type="text" v-model="name">
                </div>
            </div>
            <div class="control border-b-ddd">
                <label for="">联系电话</label>
                <div class="input-text fr">
                    <input placeholder="请输入联系电话" type="text" v-model="phone">
                </div>
            </div>
            <div class="control">
                <label for="">期望上门日期</label>
                <div class="input-text fr">
                    <el-date-picker placeholder="选择日期" type="date" v-model="indate"></el-date-picker>
                </div>
            </div>
        </div>
        <div class="fixed-bottom">
            <div @click="submit" class="btn bg-blue">申请报修</div>
        </div>
        <modal @close="closeModal" btnname="我的报修" content="您的报修信息已成功提交,我们的工作人员会尽快联系您,请您保持手机畅通" hidebtn='true'
               imgurl='../../assets/success.png' title="申请成功" v-show="isModalVisible"/>
        <modal @close="closeModal" content="您的报修信息已取消,我们的工作人员会尽快联系您,请您保持手机畅通" hidebtns='true' imgurl='../../assets/noticed.png'
               title="已取消" v-show="isModalVisible"/>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Modal from '../../components/Modal.vue'
  import Util from '../../common/util'
  import Toast from '../../common/toast'
  import { mapActions } from 'vuex'
  import { REPAIR_SUBMIT } from '../../store/serve/types'

  export default {
    name: 'warranty',
    data () {
      return {
        isModalVisible: false,
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        memo: '',
        resources: '',
        name: '',
        phone: '',
        indate: '',
        value2: '',
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    computed: {},
    methods: {
      showModal: function () {
        this.isModalVisible = true
      },
      closeModal: function () {
        this.isModalVisible = false
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      submit () {
        if (!Util.isMobile(this.phone)) {
          Toast('请输入正确的手机号!')
          return
        }

        this.repair({
          itemId: 1,
          memo: this.memo,
          houseNo: this.resources,
          realName: this.name,
          userPhone: this.phone,
          expectTime: this.indate,
          uploadImgs: this.dialogImageUrl
        })
      },
      ...mapActions({
        repair: REPAIR_SUBMIT
      }),
    },
    created () {
    },
    components: { VHead, SiftNav, Modal }
  }
</script>
<style lang="scss">
    .server-warranty {
        // background-color: $white;
        .vhead {
            background-color: $blue;
            color: #fff;
        }

        .warranty-from {
            label {
                float: left;
                height: 40px;
                line-height: 40px;
            }

            .input-text {
                width: 260px;

                &.fr {
                    input {
                        text-align: right;
                    }
                }
            }

            .textarea {
                label {
                    height: 21px;
                    line-height: 21px;
                }
            }

            .input-textarea {
                margin-left: 74px;
            }
        }

        .control {
            overflow: hidden;
            padding: 13px 0 10px 3px;
            background-color: $white;

            input[type="data"],
            textarea {
                padding: 0 10px;
                width: 100%;
            }

            input[type="data"] {
                height: 40px;
            }

            textarea {
                height: 70px;
                line-height: 1.5;
            }

            i {
                display: inline-block;
                vertical-align: middle;
                margin-bottom: 2px;
                margin-right: 10px;
                width: 15px;
                height: 15px;
            }
        }

        .upload {
            float: left;
            margin-left: 15px;

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

        .audio {
            display: inline-block;
            margin-top: 5px;
            margin-left: 15px;
            height: 32px;
            line-height: 32px;
            background: #f2f2f2;
            border: 1px solid #ddd;
            border-radius: 16px;
            width: 140px;
            text-align: center;

            .audio-icon {
                margin-right: 5px;
                margin-bottom: 2px;
            }
        }
    }
</style>
