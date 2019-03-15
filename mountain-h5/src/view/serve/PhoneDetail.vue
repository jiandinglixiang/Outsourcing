<template>
    <div class="server-phonedetaill">
        <v-head title="便民电话"></v-head>
        <sift-nav></sift-nav>
        <div class="detail">
            <div class="mod-phone">
                <div class="hd margin-bottom-10">
                    <div class="top-bg"></div>
                    <div class="thumb">
                        <img :src="img" alt="">
                    </div>
                    <div class="name">{{title}}</div>
                </div>
                <div class="bd bg-white">
                    <div class="phone-card padding-left-12">
                        <div class="control border-b-ddd phonenumber">
                            <div class="l">
                                <div class="num">{{phone}}</div>
                                <p class="text-sm c-gray">座机</p>
                            </div>
                        </div>
                        <div class="control border-b-ddd">
                            <div class="tit c-666"><i class="add-blue-icon"></i>新建联系人</div>
                        </div>
                        <div class="control border-b-ddd">
                            <div class="tit c-666"><i class="phonebook-icon"></i>添加到现有联系人</div>
                        </div>
                        <div class="control">
                            <div class="tit c-666"><i class="sms-icon"></i>发送消息</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'

  export default {
    name: 'phonedetaill',
    data () {
      return {
        title: this.$route.params.title,
        img: this.$route.params.img,
        phone: this.$route.params.phone
      }
    },
    computed: {},
    methods: {},
    created () {
      console.log(this.$route.params.id)
      console.log(this.$route.params.title)
      console.log(this.$route.params.img)
      console.log(this.$route.params.phone)
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">

    .server-phonedetaill {
        // background-color: $white;
        .vhead {
            background-color: $blue;
            color: #fff;
        }

        .mod-phone {
            .hd {
                position: relative;
                height: 168px;
                // border-top: 1px solid #499be9;
                background-color: $white;
                text-align: center;
                font-size: 16px;
            }

            .top-bg {
                height: 70px;
                background: #4297e8;

            }
        }

        .detail {
            .thumb {
                margin-top: -54px;
                display: inline-block;
                margin-bottom: 10px;
                width: 108px;
                height: 108px;
                padding: 4px;
                background: #fff;
                border-radius: 100%;

                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                }
            }
        }

        .phone-card {
            .phonenumber {
                position: relative;
                padding-right: 50px;

                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    margin-top: -13px;
                    width: 26px;
                    height: 26px;
                    background-image: url(../../assets/icon/phone.png);
                    background-repeat: no-repeat;
                    background-size: cover;
                }

                .num {
                    margin-bottom: 5px;
                    font-size: 22px;
                }
            }

            .control {
                padding: 13px 0 10px 3px;

                i {
                    display: inline-block;
                    vertical-align: middle;
                    margin-bottom: 2px;
                    margin-right: 10px;
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
</style>
