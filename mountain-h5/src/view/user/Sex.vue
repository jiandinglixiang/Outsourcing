<template>
  <div class="user-name">
    <v-head title="性别修改" hideNav="1">
      <span slot="headRight" class="headRight" @click="saveName">保存</span>
    </v-head>
    <div class="padding-left-10 bg-white">
      <label style="display: block;line-height: 45px" class="input-text text-md border-b-ddd"><input type="radio"
                                                                                                     name="optionsRadios"
                                                                                                     value="0"
                                                                                                     v-model="picked">先生
      </label>
      <label style="display: block;line-height: 45px" class="input-text text-m"><input type="radio" name="optionsRadios"
                                                                                       value="1"
                                                                                       v-model="picked">女生</label>
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
        picked: ''
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
        console.log(this.info.uaSex, this.picked)
        if (this.picked === '') {
          Toast('请选择')
          return
        }
        if (this.picked * 1 === this.info.uaSex * 1) {
          Toast('与当前性别相同,无需修改')
          return
        }
        this.modification({uaSex: this.picked}).then(val => {
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

    .headRight {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 10px;
    }

    .vhead {
      background-color: $blue;
      color: #fff;
    }

    .bg-white > div {
      height: 44px;
      line-height: 44px;

      .icon {
        margin-bottom: 2px;
        margin-right: 5px;
      }
    }

    input[type="radio"] {
      display: inline-block;
      margin-right: 14px;
    }
  }

</style>
