<template>
    <div class="pay-address">
        <v-head hideNav="true" title="编辑收货地址"></v-head>
        <div class="padding-left-10 bg-white">
            <div class="control height-lh-44 border-b-ddd">福建省福州市晋安区</div>
            <div class="control height-lh-44 border-b-ddd">东二环泰禾</div>
            <div class="control height-lh-44 border-b-ddd">
                <input type="text" value="张晓明">
                <span class="close-icon"></span>
            </div>
            <div class="control height-lh-44 border-b-ddd">
                <input type="text" value="18652458455">
                <span class="close-icon"></span>
            </div>
            <div class="tips height-lh-44">
                <p class="c-orange text-sm"><i class="icon bulb-icon"></i>默认地址不可修改,可修改收件人及手机号</p>
            </div>
        </div>
        <div class="fixed-bottom row">
            <div class="col btn bg-white">取消</div>
            <div class="col btn bg-red">保存</div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'

  export default {
    name: 'address',
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {
    },
    components: { VHead }
  }
</script>
<style lang="scss">
    .pay-address {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .control {
            position: relative;
            color: $c666;

            input {
                padding: 0;
                color: #ababab;
            }

            .close-icon {
                position: absolute;
                display: block;
                top: 15px;
                right: 8px;
                width: 16px;
                height: 16px;
            }
        }

        .icon {
            margin-right: 10px;
        }
    }

</style>
