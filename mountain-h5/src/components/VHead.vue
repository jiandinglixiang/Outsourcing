<template>
  <div class="vhead">
    <span class="back-icon" @click="goBack" v-if="!hideBack"></span>
    <div>{{title}}</div>
    <span class="right nav-icon" @click="navShow" v-if="!hideNav"></span>
    <slot name="headRight"></slot>
  </div>
</template>

<script>
  export default {
    name: 'vhead',
    props: ['title', 'hideBack', 'hideNav', 'back'],
    methods: {
      goBack () {
        if (typeof this.back === 'function') {
          this.back()
        } else {
          this.$router.back()
        }
      },
      navShow (e) {
        document.documentElement.classList.add('sift-move');
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/icon.css";
  .vhead {
    position: relative;
    padding: 0 20px;
    height: 45px;
    background: #fff;
    font-size: 18px;
    color: #333;
    text-align: center;
    line-height: 45px;
  }
  .vhead .back-icon {
    position: absolute;
    left: 5px; top: 5px;
    background: url("../assets/icon/back.png") no-repeat center;
    background-size: 70% 70%;
    height: 35px; width: 35px;
  }
  .vhead .right {
    position: absolute;
    right: 10px;
    top: 9px;
  }
</style>
