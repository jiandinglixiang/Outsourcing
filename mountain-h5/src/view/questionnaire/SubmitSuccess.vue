<template>
    <div class="questionnaire-submitsuccess">
        <div class="header">
            <span @click="goBack" class="back-icon"></span>
            <span class="right">关闭</span>
        </div>
        <div class="text-center success bg-white bprder-b-ddd">
            <img alt="" src="../../assets/success.png">
            <p class="c-green">问卷调查提交成功!</p>
        </div>
        <div class="txt bg-white text-center">感谢您参与本次调查,获得<span class="c-red">100</span>积分</div>
    </div>
</template>
<script>
  import router from '../../router/index'

  export default {
    name: 'submitsuccess',
    methods: {
      goBack () {
        router.go(-1)
      }
    }
  }
</script>
<style lang="scss">
    .questionnaire-submitsuccess {
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

        .header .right {
            position: absolute;
            right: 10px;
            top: 0px;
        }

        .success {
            padding: 30px 0;

            img {
                width: 80px;
            }

            font-weight: bold;
            font-size: 16px;
        }

        .txt {
            height: 49px;
            line-height: 49px;
        }
    }
</style>
