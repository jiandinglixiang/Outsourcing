<template>
  <div class="pay-appraise">
    <v-head hideNav="true" title="评价"></v-head>
    <div class="bg-white">
      <div class="row-line border-b-ddd">
        <div class="tit margin-bottom-10 font-bold">评价分数</div>
        <div class="oc-star-n">
          <div :style="`width:${Grade}%`"></div>
          <ul @click="addGrade">
            <!-- 20% -->
            <li data-val="20"></li>
            <!-- 40% -->
            <li data-val="40"></li>
            <!-- 60% -->
            <li data-val="60"></li>
            <!-- 80% -->
            <li data-val="80"></li>
            <!-- 100% -->
            <li data-val="100"></li>
          </ul>
        </div>
        <div class="text text-center c-orange">{{Grade|gradeName}}</div>
      </div>
      <div class="row-line border-b-ddd">
        <div class="tit margin-bottom-10 font-bold">评价内容</div>
        <div>
          <textarea placeholder="请输入您要评价的内容" v-model="GradeTxt"></textarea>
        </div>
      </div>
      <div class="control padding-015 border-b-ddd ofh audio-init">
        <div class="fl">语音输入</div>
        <div class="input-text fl">
          <div @touchstart="voiceStart" @touchend="voiceEnd" class="audio text-normal c-gray"><i
            class="icon audio-icon"></i>按住说话
          </div>
        </div>
      </div>
      <div class="row-line">
        <div class="tit margin-bottom-10">快速评价</div>
        <div class="cons" @click="addSpeed" :class="SpeedActive">
          <span class="con c-gray" data-val="active1">服务态度好</span>
          <span class="con c-gray" data-val="active2">很好很不错</span>
          <span class="con c-gray" data-val="active3">态度好</span>
          <span class="con c-gray" data-val="active4">穿着不错</span>
        </div>
      </div>
    </div>
    <div class="fixed-bottom">
      <div @click="submit" class="btn bg-blue">提交评价</div>
    </div>
    <modal @close="closeModal" content="感谢您的评价,获得" hidebtns='true' :hlight="gainIntegral"
           imgurl='../../assets/success.png' title="评价成功" v-show="isModalVisible"/>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import Modal from '../../components/Modal.vue'
  import Http from '../../store/Http'
  import Toast from '../../common/toast'

  window.WX = {}// 接入微信后删除
  export default {
    name: 'appraise',
    data () {
      return {
        isModalVisible: false,
        Grade: '0',
        GradeTxt: '',
        SpeedGradeTxt: '',
        SpeedActive: '',
        gainIntegral: '' // 积分
      }
    },
    computed: {},
    methods: {
      voiceStart (event) {
        if (event) return
        // 开始录音
        WX.startRecord();
      },
      voiceEnd (event) {
        // 停止录音
        this.GradeTxt = this.GradeTxt + `语音识别出来的文字`
        if (event) return
        WX.stopRecord({
          success: (res) => {
            // 识别录音
            wx.translateVoice({
              localId: res.localId, // 需要识别的音频的本地Id，由录音相关接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: (ress) => {
                this.GradeTxt = `${this.GradeTxt}${ress.translateResult}` // 语音识别的结果
              }
            })
          }
        })
      },
      addSpeed (event) {
        // 快速评价
        event.stopPropagation()
        if (event.target.nodeName === 'SPAN' && event.target.dataset.val) {
          if (this.SpeedActive === event.target.dataset.val) {
            this.SpeedGradeTxt = ''
            this.SpeedActive = ''
          } else {
            this.SpeedGradeTxt = event.target.innerText
            this.SpeedActive = event.target.dataset.val
          }
        }
      },
      addGrade (event) {
        // 添加评分
        event.stopPropagation()
        this.Grade = event.target.dataset.val
      },
      closeModal () {
        this.$router.back()
      },
      submit () {
        // 提交评价
        const grade = this.Grade / 20
        if (!grade || grade > 5) {
          Toast('请评价星级')
          return
        }
        if (!this.GradeTxt && !this.SpeedGradeTxt) {
          Toast('可选择快速评价')
          return
        }
        Http.get('op/myRepairOrder.json', {
          itemId: this.$route.query.itemId,
          reoNo: this.$route.query.reoNo,
          revAssess: grade,
          revMemo: this.GradeTxt,
          revLab: this.SpeedGradeTxt
        }).then(data => {
          if (data.data.gainIntegral) {
            this.gainIntegral = `${data.data.gainIntegral}积分`
            this.isModalVisible = true
          }
        })
      }
    },
    created () {
    },
    filters: {
      gradeName (val) {
        switch (val / 20) {
          case 1:
            return '很不满意'
          case 2:
            return '不满意'
          case 3:
            return '一般'
          case 4:
            return '满意'
          case 5:
            return '非常满意'
          default:
            return ''
        }
      }
    },
    components: {VHead, Modal}
  }
</script>
<style lang="scss">
  .pay-appraise {
    margin-bottom: 50px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .vhead {
      background-color: $blue;
      color: $white;
    }

    .font-bold {
      font-weight: bold;
    }

    .padding-015 {
      padding: 0 15px;
    }

    .row-line {
      padding: 18px 15px;
    }

    .control {
      height: 60px;
      line-height: 60px;
    }
    .audio-init{

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

    .cons {
      margin-left: -5px;

      &.active1 span:nth-child(1), &.active2 span:nth-child(2), &.active3 span:nth-child(3), &.active4 span:nth-child(4) {
        border: 1px solid #f64948;
        background-color: #fff0f0;
        color: #f64948;
      }

      .con {
        display: inline-block;
        padding: 0 12px;
        margin-left: 8px;
        height: 37px;
        line-height: 35px;
        margin-bottom: 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    textarea {
      padding: 0px 10px 13px 0;
      width: 100%;
      min-height: 44px;
      font-size: 16px;
    }

    .c-orange {
      color: #ffc11b;
    }

    .oc-star-n {
      margin: 0 auto 20px;
      background-image: url(../../assets/bg-star1.png);
      background-repeat: no-repeat;
      background-size: cover;
      width: 200px;
      height: 30px;
      position: relative;

      > div {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        background-image: url(../../assets/bg-star2.png);
        background-repeat: no-repeat;
        background-size: cover;
        height: 30px;
      }

      ul {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        li {
          height: 30px;
          width: 40px;
          z-index: 1;
        }
      }
    }
  }

</style>
