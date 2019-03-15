<template>
  <div class="user-name">
    <v-head title="姓名修改" hideNav="1">
      <span slot="headRight" class="headRight" @click="saveName">保存</span>
    </v-head>
    <div class="padding-left-10 bg-white">
      <div class="input-text text-md">
        <input type="text" placeholder="输入新姓名" v-model="name">
        <span class="close-icon"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue';
  import { mapActions, mapState } from 'vuex'
  import { MODIFICATION_INFO } from "../../store/user/types";
  import Toast from '../../common/toast'

  export default {
    name: 'name',
    data () {
      return {
        name: ''
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
          Toast('请输入姓名')
          return
        }
        if (this.name.length > 20) {
          Toast('姓名长度超出')
          return
        }
        if (this.name === this.info.uaRealName) {
          Toast('与当前姓名相同,无需修改')
          return
        }
        this.modification({uaRealName: this.name}).then(()=>{
          Toast('修改成功')
          this.$router.back()
        })
      }
    },
    components: {VHead}
  }
</script>
<style lang="scss" scoped>
  .user-name {
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
  }

</style>
