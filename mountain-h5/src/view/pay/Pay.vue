<template>
	<div class="pay-pay">
    <v-head title="预付押金" hideNav="true"></v-head>
    <div class="bg-white padding-left-10 detail">
      <div class="height-lh-44 border-b-ddd">应付积分<span>146.00</span></div>
      <div class="height-lh-44 c-gray">积分余额<span>235.00</span></div>
    </div>
    <div class="fixed-bottom">
      <div class="btn bg-red">确认支付</div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue';
  export default {
    name: 'pay',
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
    },
    components: {VHead}
  }
</script>
<style lang="scss">
.pay-pay {
  .vhead {
    background-color: $blue;
    color: $white;
  }
    .detail {
        span {
            margin-left: 10px;
        }
    }
}

</style>
