<template>
  <div class="buildings-choosecommunity">
    <v-head title="选择小区"></v-head>
    <sift-nav></sift-nav>
    <!--<div class="ofh margin-bottom-10 top-row bg-white">-->
    <!--<div class="fl tit"><i class="icon addr-icon"></i>优胜美小区(房屋1)</div>-->
    <!--<div class="fr c-gray">当前定位小区<i class="icon refresh-icon"></i></div>-->
    <!--</div>-->
    <div class="margin-bottom-10 padding-left-10 bg-white">
      <div class="control border-b-ddd">
        <div class="text">最近使用的小区</div>
        <div class="btn-arrow"></div>
      </div>
      <div :key="index" @click="setArea(n)" class="control ofh border-b-ddd" v-for="(n,index) in historyList">
        <div class="fl">{{n.item}}</div>
        <div class="fr c-gray">房屋{{n.itemId}}</div>
      </div>
    </div>
    <div class="mod-card bg-white">
      <div class="hd">
        <div class="tit">选择小区</div>
      </div>
      <div class="select bd padding-left-10">
        <div @click="showPicker(1)" class="control border-b-ddd">
          <place-picker :place-data="provinceData"
                        :place-value="province"
                        :popupVisible.sync="popupVisible1"
                        @changeValue="provinceChange"
                        placeholder="请选择省份"/>
        </div>
        <div @click="showPicker(2)" class="control border-b-ddd">
          <place-picker :place-data="cityData"
                        :place-value="city"
                        :popupVisible.sync="popupVisible2"
                        @changeValue="cityChange"
                        placeholder="请选择市区"/>
        </div>
        <div @click="showPicker(3)" class="control border-b-ddd">
          <place-picker :place-data="AreaData"
                        :place-value="Area.item"
                        :popupVisible.sync="popupVisible3"
                        @changeValue="areaChange"
                        key-name="item"
                        placeholder="请选择小区"/>
        </div>
        <div class="btns">
          <div @click="submitData" class="btn bg-blue">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import { http } from '../../store/Http'
  import PlacePicker from '../../components/PlacePicker'
  import { HousingData, provinces } from '../../common/city'
  import Toast from '../../common/toast'

  export default {
    name: 'chooseCommunity',
    data () {
      return {
        popupVisible1: false,
        popupVisible2: false,
        popupVisible3: false,
        provinceData: [
          {
            flex: 1,
            className: 'slot1',
            values: JSON.parse(JSON.stringify(provinces)),
            textAlign: 'center'
          }
        ],
        cityData: [
          {
            flex: 1,
            className: 'slot2',
            values: JSON.parse(JSON.stringify(provinces[0].city)),
            textAlign: 'center'
          }
        ],
        AreaData: [
          {
            flex: 1,
            className: 'slot3',
            values: [{
              'itemId': null,      //项目/物业ID（arType = 0 3 有值）
              'prov': '暂无',      //返回省份
              'city': '暂无',      //返回城市（arType = 0 2 3有值）
              'item': '暂无',  //返回物业（arType = 0 3 有值）
            }],
            textAlign: 'center'
          }
        ],
        province: HousingData.province,
        city: HousingData.city,
        Area: JSON.parse(JSON.stringify(HousingData.Area)),
        historyList: []
      }
    },
    computed: {},
    methods: {
      provinceChange ({ picker, values }) {
        this.province = values[0].name
        this.cityData = [{
          flex: 1,
          className: 'slot2',
          values: JSON.parse(JSON.stringify(values[0].city)),
          textAlign: 'center'
        }]
        this.AreaData = [
          {
            flex: 1,
            className: 'slot3',
            values: [{
              'itemId': null,      //项目/物业ID（arType = 0 3 有值）
              'prov': '暂无',      //返回省份
              'city': '暂无',      //返回城市（arType = 0 2 3有值）
              'item': '暂无',  //返回物业（arType = 0 3 有值）
            }],
            textAlign: 'center'
          }
        ]
        this.city = ''
        this.Area = JSON.parse(JSON.stringify(HousingData.Area))
        this.popupVisible1 = !this.popupVisible1
      },
      cityChange ({ picker, values }) {
        this.city = values[0]
        this.popupVisible2 = !this.popupVisible2
        this.Area = JSON.parse(JSON.stringify(HousingData.Area))
        http.get('op/getAreaItem.json', {
          arType: 3,
          prov: this.province,
          city: values[0]
        }).then(data => {
          if (data.data && data.data.length) {
            this.AreaData = [
              {
                flex: 1,
                className: 'slot3',
                values: data.data,
                textAlign: 'center'
              }
            ]
          }
        })
      },
      areaChange ({ picker, values }) {
        if (!values[0].itemId) {
          Toast('物业不存在')
          return
        }
        this.Area = JSON.parse(JSON.stringify(values[0]))
        this.popupVisible3 = !this.popupVisible3
      },
      showPicker (type) {
        if (type === 1) {
          this.popupVisible1 = !this.popupVisible1
        } else if (type === 2) {
          if (!this.province) {
            Toast('请先选择省市')
            return
          }
          this.popupVisible2 = !this.popupVisible2
        } else if (type === 3) {
          if (!this.province || !this.city) {
            Toast('请先选择省市区')
            return
          }
          this.popupVisible3 = !this.popupVisible3
        }
      },
      setArea (item) {
        if (!item.itemId) {
          Toast('未知错误')
          return
        }
        HousingData.add({ Area: JSON.parse(JSON.stringify(item)) })
        this.$router.back()
      },
      submitData () {
        if (!this.province) {
          Toast('请先选择省市')
          return
        }
        if (!this.city) {
          Toast('请先选择市区')
          return
        }
        if (!this.Area.itemId) {
          Toast('未选择小区')
          return
        }
        HousingData.add({ city: this.city, province: this.province, Area: JSON.parse(JSON.stringify(this.Area)) })
        this.$router.back()
      }
    },
    created () {
      // 获取选择过的小区
      http.get('op/getAreaItem.json').then(data => {
        this.historyList = data.data
      })
    },
    components: { PlacePicker, VHead, SiftNav }
  }
</script>
<style lang="scss">
  .buildings-choosecommunity {
    .vhead {
      background-color: $blue;
      color: $white;
    }

    .top-row {
      padding: 0 15px;
      height: 50px;
      line-height: 50px;

      .icon {
        margin-bottom: 2px;
      }

      .addr-icon {
        margin-right: 10px;
      }

      .refresh-icon {
        margin-left: 7px;
      }
    }

    .control {
      padding: 0 14px 0 5px;
      height: 45px;
      line-height: 45px;
    }

    .select {
      .control {
        position: relative;
        padding-right: 40px;

        &:after {
          position: absolute;
          top: 50%;
          margin-top: -10px;
          right: 14px;
          content: '';
          width: 20px;
          height: 20px;
          background: url(../../assets/icon/arrow_right_black.png) no-repeat;
          background-size: cover;
        }
      }

      .btns {
        padding: 22px 15px 22px 5px;
        padding-right: 10px;

        .btn {
          border-radius: 22px;
        }
      }

      input[type="text"] {
        padding: 0;
      }
    }
  }

</style>
