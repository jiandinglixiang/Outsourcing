<template>
    <div class="home-more">
        <v-head title="服务项目"></v-head>
        <sift-nav></sift-nav>
        <nav-list></nav-list>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import NavList from '../../components/NavList.vue'

  export default {
    name: 'homeMore',
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {
    },
    components: { VHead, SiftNav, NavList }
  }
</script>
<style lang="scss">

    .home-more {
        // background-color: $white;
        .vhead {
            background-color: $blue;
            color: #fff;
        }
    }
</style>
