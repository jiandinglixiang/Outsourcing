<template>
    <el-carousel :interval="4000" height="182px" type="card">
        <el-carousel-item :key="item.index" v-for="item in list">
            <!--       <h3>{{ item.rotTitle }}</h3> -->
            <template v-if="item.rotImg">
                <img :src="item.rotImg" alt="">
            </template>

            <template v-if="item.seoImg">
                <img :src="item.seoImg" alt="">
            </template>

        </el-carousel-item>
    </el-carousel>
</template>
<script>
  import Vue from 'vue'
  import { Carousel, CarouselItem } from 'element-ui'

  Vue.component(CarouselItem.name, CarouselItem)
  Vue.component(Carousel.name, Carousel)
  export default {
    name: 'banner',
    props: ['list'],
    computed: {},
    created () {
      console.log(this.list)
    }
  }
</script>

<style lang="scss">
    .el-carousel--card {
        background-color: #fff;

        &:after {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            right: 0;
            height: 90px;
            background: $blue;
        }
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 182px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-carousel__item--card {
        width: 90%;
        border-radius: 4px;
    }

    .el-carousel__item, .el-carousel__mask {
        left: -75px;
    }

    .el-carousel__button {
        width: 10px;
    }

    .el-carousel__indicators--outside button {
        opacity: 1;
        background-color: #ddd;
    }

    .el-carousel__indicator.is-active button {
        background-color: #4297e8;
        opacity: 1;
    }
</style>
