<template>
  <div class="bottom-nav">
    <div class="row">
      <div class="col bottom-nav-item"
        :class="{'active': item.key === active}"
        v-for="item in items"
        @click="goRedirect(item)">
        <span class="nav-icon" :class="item.icon"></span>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router/index';

  export default {
    name: 'bottomNav',
    props: ['active'],
    data () {
      return {
        items: [
          {name: '主页', icon: 'home-icon', key: 'Home'},
          {name: '积分商城', icon: 'mall-icon', key: 'Mall'},
          {name: '我的积分', icon: 'points-icon', key: 'Points'},
          {name: '我的', icon: 'person-icon', key: 'Mine'}
        ]
      }
    },
    methods: {
      goRedirect (item) {
        if (item.key !== this.active) {
          switch (item.key) {
            case 'Home':
            case 'Mall':
            case 'Points':
            case 'Mine':
              router.push({ name: item.key })
              break
            default:
          }
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-nav {
    position: fixed;
    width: 100%;
    height: 55px;
    bottom: 0;
    left: 0;
    color: #666;
    font-size: 12px;
    text-align: center;
    background: white;
    padding-top: 7px;
    line-height: 15px;
  }
  @media screen and (min-width:640px) {
    .bottom-nav {
      width: 640px;
      left: 50%;
      margin-left: -320px;
    }
  }
  .bottom-nav .nav-icon {
    width: 22px;
    height: 22px;
    display: inline-block;
  }
  .bottom-nav .bottom-nav-item.active {
    color: #e5363f;
  }
  .bottom-nav .nav-icon.home-icon {
    background: url("../assets/home/home.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .home-icon {
    background: url("../assets/home/home_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.points-icon {
    background: url("../assets/home/points.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .points-icon {
    background: url("../assets/home/points_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.person-icon {
    background: url("../assets/home/person.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .person-icon {
    background: url("../assets/home/person_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.mall-icon {
    background: url("../assets/home/mall.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .mall-icon {
    background: url("../assets/home/mall_active.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
