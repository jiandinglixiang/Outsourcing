<template>
    <div class="user-information">
        <v-head title="个人信息"></v-head>
        <sift-nav></sift-nav>
        <div class="padding-left-10 bg-white">
          <div @click="openChooseImage" class="right-arrow portrait text-md border-b-ddd row">
                <div class="tit">头像</div>
                <div class="thumb">
                  <img alt="" :src="info.uaImg">
                </div>
            </div>
            <router-link to="/nick_name"  class="right-arrow text-md border-b-ddd row">
                <div class="col">昵称</div>
              <div class="col text-right c-gray">{{ info.uaNickName}}</div>
            </router-link>
            <router-link to="/name"  class="right-arrow text-md border-b-ddd row">
                <div class="col">姓名</div>
              <div class="col text-right c-gray">{{info.uaRealName}}</div>
            </router-link>
            <router-link to="/Sex"  class="right-arrow text-md border-b-ddd row">
                <div class="col">性别</div>
              <div class="col text-right c-gray">{{info.uaSex<=0? '男':'女'}}</div>
            </router-link>
            <router-link to="/bundle_phone"  class="right-arrow text-md row">
                <div class="col">手机号</div>
              <div class="col text-right c-gray">{{info.uaMobile}}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { mapActions, mapMutations, mapState } from 'vuex'
  import { GET_USER_INFO, SET_INFO_DATA } from '../../store/user/types'
  import Http from '../../store/Http'

  export default {
    name: 'information',
    data () {
      return {}
    },
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    },
    methods: {
      ...mapMutations({
        setInfoData: SET_INFO_DATA
      }),
      ...mapActions({
        getInfo: GET_USER_INFO
      }),
      openChooseImage () {
        return new Promise(function (resolve) {
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success (res) {
              var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              resolve(res.localIds)
            }
          });
        }).then(localIds => {
          return new Promise(function (resolve) {
            wx.getLocalImgData({
              localId: localIds, // 图片的localID
              success (res) {
                var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                resolve(res.localData)
              }
            });
          })
        }).then(base => {
          // 上传图片
          console.log(base)
          return Http.get('op/myimgUserInfo.json', {
            itemId: '',
            uaHeadUrl: this.dataURLtoFile(base)
          }).then(data => {
            // 更新编号
            this.setInfoData({
              uaNo: '',
              uaImg: 'http://placehold.it/160'
            })
          })
        })
      },
      dataURLtoFile (dataurl, filename) {
        //将base64转换为文件
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
      }
    },
    created () {
      const {itemId} = this.info
      this.getInfo({itemId})
    },
    components: { VHead, SiftNav }
  }
</script>
<style lang="scss">
    .user-information {
        .vhead {
            background-color: $blue;
            color: #fff;
        }

        .right-arrow {
            height: 44px;
            line-height: 44px;
        }

        .portrait {
            position: relative;
            height: 65px !important;
            line-height: 64px !important;

            .thumb {
                position: absolute;
                top: 50%;
                right: 40px;
                margin-top: -22px;
            }

            img {
                width: 45px;
                height: 45px;
                border-radius: 100%;
            }
        }
    }
</style>
