<template>
  <div class="user-advise">
    <v-head title="意见反馈"></v-head>
    <sift-nav></sift-nav>
    <div class=" bg-white" style="padding: 10px 0">
      <div class="text-md border-b-ddd">
        <textarea placeholder="请输入您的建议及意见,不超过150字" v-model="txt"></textarea>
      </div>
      <div class="tips">
        <p class="c-orange text-sm"><i class="icon bulb-icon"></i>{{txt.length<=150
          ?`还可以输入${150-txt.length}字`:`已超出${txt.length-150}字`}}
        </p>
      </div>
    </div>
    <div class="fixed-bottom">
      <div class="btn bg-white" @click="$router.back()">取消</div>
      <div @click="submitTxt" class="btn bg-blue">确定</div>
    </div>
    <modal @close="$router.back()" content="您的建议已成功提交,我们将在个工作日内进行反馈!" hidebtns='true' hlight="3"
           imgurl='../../assets/success.png' title="提交成功" v-show="isModalVisible"/>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Modal from '../../components/Modal.vue'
  import Toast from '../../common/toast'
  import { http } from "../../store/Http";

  export default {
    name: 'advise',
    data () {
      return {
        txt: '',
        isModalVisible: false
      }
    },
    methods: {
      submitTxt () {
        if (this.txt === '') {
          Toast('不能为空')
          return
        }
        if (this.txt.length > 150) {
          Toast(`超出${this.txt.length - 150}字`)
          return
        }
        http.get('op/succeed.json', {
          txt: this.txt
        }).then(val => {
          this.isModalVisible = val
        })
      }
    },
    components: {VHead, SiftNav, Modal}
  }
</script>
<style lang="scss">
  .user-advise {
    .vhead {
      background-color: $blue;
      color: #fff;
    }

    .bg-white > div {
      .icon {
        margin-bottom: 2px;
        margin-right: 5px;
      }

      textarea {
        padding: 10px;
        width: 100%;
        height: 88px;
      }
    }

    .tips {
      height: 44px;
      line-height: 44px;
    }
  }

</style>
