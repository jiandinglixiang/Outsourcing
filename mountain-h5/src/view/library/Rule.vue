<template>
    <div class="library-rule">
        <v-head title="共享规则"></v-head>
        <sift-nav></sift-nav>
        <div class="rule-content padding-20 bg-white">
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
            <h2>this is title</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, eum. Facilis repellendus debitis eum
                ipsa provident, totam sit voluptas aliquam!</p>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'

  export default {
    name: 'rule',
    data () {
      return {}
    },
    computed: {},
    methods: {},
    created () {
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .library-rule {
        .vhead {
            background-color: $blue;
            color: $white;
        }

        .rule-content {
            line-height: 1.5;
            font-size: 14px;

            h2 {
                font-weight: normal;
                font-size: 16px;
            }

            h2, p {
                margin-bottom: 10px;
            }
        }
    }

</style>
