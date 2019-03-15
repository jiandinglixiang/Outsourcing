<template>
  <div class="user-set">
    <v-head title="设置"></v-head>
    <sift-nav></sift-nav>
    <div class="padding-left-10 bg-white">
      <router-link tag="div" to="/bundle_phone" class="right-arrow text-md border-b-ddd">绑定手机</router-link>
      <router-link tag="div" to="/advise" class="right-arrow text-md border-b-ddd">意见反馈</router-link>
      <router-link tag="div" to="/about_us" class="right-arrow text-md">关于我们</router-link>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue';
  import SiftNav from '../../components/SiftNav.vue';

  export default {
    name: 'set',
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
    components: {VHead, SiftNav}
  }
</script>
<style lang="scss">
.user-set {
  .vhead {
    background-color: $blue;
    color: #fff;
  }
  .right-arrow {
    height: 44px;
    line-height: 44px;
  }
}

</style>
