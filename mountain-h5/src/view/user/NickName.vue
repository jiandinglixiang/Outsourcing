<template>
  <div class="user-nickname">
    <v-head title="昵称修改" hideNav="1">
      <span slot="headRight" class="headRight" @click="saveName">保存</span>
    </v-head>
    <div class="padding-left-10 bg-white">
      <div class="input-text text-md border-b-ddd">
        <input type="text" placeholder="输入新昵称" v-model="name">
        <span class="close-icon"></span>
      </div>
      <div class="tips" v-show="showMsg">
        <p class="c-orange text-sm"><i class="icon bulb-icon"></i>{{showMsg||`该昵称已有人使用,请重新输入`}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import { mapActions, mapState } from 'vuex'
  import { MODIFICATION_INFO } from "../../store/user/types";
  import Toast from '../../common/toast'

  export default {
    name: 'nickname',
    data () {
      return {
        name: '',
        showMsg: ''
      }
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      ...mapActions({
        modification: MODIFICATION_INFO
      }),
      saveName () {
        if (!this.name) {
          Toast('请输入昵称')
          return
        }
        if (this.name.length > 20) {
          Toast('昵称长度超出')
          return
        }
        if (this.name === this.info.uaNickName) {
          Toast('与当前昵称相同,无需修改')
          return
        }
        this.modification({uaNickName: this.name}).then(val => {
          Toast('修改成功')
          this.showMsg = `该昵称已有人使用,请重新输入`
          this.$router.back()
        })
      }
    },
    components: {VHead}
  }
</script>
<style lang="scss">
  .user-nickname {
    .vhead {
      background-color: $blue;
      color: #fff;
    }

    .headRight {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 10px;
    }

    .bg-white > div {
      height: 44px;
      line-height: 44px;

      .icon {
        margin-bottom: 2px;
        margin-right: 5px;
      }
    }

    .input-text {
      position: relative;

      .close-icon {
        position: absolute;
        top: 14px;
        right: 15px;
        width: 16px;
        height: 16px;
      }
    }

    .tips {
      height: 44px;
      line-height: 44px;
    }
  }

</style>
