<template>
    <div class="home-aboutus">
        <v-head title="关于我们"></v-head>
        <sift-nav></sift-nav>
        <div class="article bg-white text-normal">
            <p class="text-center"><img alt="" class="logo" src="../../assets/logo.png"></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque officia repudiandae maxime rerum
                quidem voluptates aliquid, corporis ut fugit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque officia repudiandae maxime rerum
                quidem voluptates aliquid, corporis ut fugit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque officia repudiandae maxime rerum
                quidem voluptates aliquid, corporis ut fugit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque officia repudiandae maxime rerum
                quidem voluptates aliquid, corporis ut fugit.</p>
            <p><img alt="" src="http://placehold.it/623x435"></p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos eaque officia repudiandae maxime rerum
                quidem voluptates aliquid, corporis ut fugit.</p>
            <div class="text-center c-gray">copyright</div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'

  export default {
    name: 'aboutus',
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
    .home-aboutus {
        .vhead {
            background-color: $blue;
            color: #fff;
        }

        .article {
            padding: 15px 12px;
            line-height: 1.5;

            p {
                margin-bottom: .5em;
            }

            .logo {
                display: inline-block;
                width: 50%;
            }

            img {
                width: 100%;
            }
        }
    }

</style>
