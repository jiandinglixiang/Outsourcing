<template>
  <div class="buildings-housingcertification">
    <v-head :back="goInitData.bind(this,-1)" title="房屋认证"></v-head>
    <sift-nav></sift-nav>
    <ul class="from-data">
      <li>
        <mt-cell title="身份">
          <form style="padding: 0 10px">
            <label>
              <input name="optionsRadios" type="radio"
                     v-model="identity"
                     value="0"><span style="padding: 0 5px;">我是业主</span></label>
            <label>
              <input name="optionsRadios" type="radio"
                     v-model="identity"
                     value="2"><span style="padding: 0 5px;">我是住户</span></label>
          </form>
        </mt-cell>
      </li>
      <li>
        <mt-field :attr="{style:'text-align:right'}" label="我的姓名" placeholder="请输入真实姓名"
                  v-model="uaRealName"></mt-field>
      </li>
      <li>
        <mt-field :attr="{style:'text-align:right;padding: 0 10px;'}" label="业主手机号" placeholder="请输入手机号"
                  type="tel" v-model="uaMobile"></mt-field>
      </li>
      <li v-show="identity==='0'">
        <mt-field :attr="{style:'text-align:right'}" label="验证码" placeholder="6位验证码"
                  v-model="uaValidateNum">
          <button :class="{'bg-gray':time}" @click="getCode" class="code-button">{{time?`${time}s秒重新获取`:'获取验证码'}}
          </button>
        </mt-field>
      </li>
      <li>
        <mt-cell title="所在城市"><span style="padding-right: 10px;">{{userCity}}</span>
        </mt-cell>
      </li>
      <li @click="goInitData(1)">
        <mt-cell :value="Area.item||'请选择'" is-link title="所在小区"></mt-cell>
      </li>
      <li @click="goInitData(2)">
        <mt-cell
          :value="housingTxt"
          is-link
          title="房号"></mt-cell>
      </li>
    </ul>
    <div class="fixed-bottom row">
      <div @click="submitData" class="btn bg-blue col">房屋认证</div>
    </div>
    <modal @close="goInitData(-1)"
           content="您的房屋认证信息已成功提交,我们的工作人员会尽快联系您,请您保持手机畅通" hidebtns='true'
           imgurl='../../assets/success.png'
           title="认证成功" v-show="isModalVisible1"/>
    <modal @close="goInitData(-1)"
           @rightClick="goInitData(0)"
           btnname="重新认证" content="房屋信息错误" hidebtn='true'
           hlight="2次" imgurl='../../assets/error.png' title="认证失败" v-show="isModalVisible2"/>
  </div>
</template>
<script>
  import VHead from '../../components/VHead.vue'
  import SiftNav from '../../components/SiftNav.vue'
  import Modal from '../../components/Modal.vue'
  import util, { copy } from '../../common/util'
  import Toast from '../../common/toast'
  import { http } from '../../store/Http'
  import { Cell, Field, Radio } from 'mint-ui'
  import { HousingData } from '../../common/city'

  export default {
    name: 'housingCertification',
    data () {
      return {
        isModalVisible1: false,
        isModalVisible2: false,
        time: 0,
        identity: HousingData.identity,// 身份
        uaRealName: HousingData.uaRealName,//名字
        uaMobile: HousingData.uaMobile,// 手机
        uaValidateNum: HousingData.uaValidateNum,// 验证码
        userCity: HousingData.userCity,// 市
        Area: JSON.parse(JSON.stringify(HousingData.Area)), // 小区对象
        housing: JSON.parse(JSON.stringify(HousingData.housing))// 房屋对象
      }
    },
    computed: {
      housingTxt () {
        if (this.housing.hoBuildNumber && this.housing.hoUnit && this.housing.hoRoomNumber) {
          return `${ this.housing.hoBuildNumber }栋${ this.housing.hoUnit }单元${ this.housing.hoRoomNumber }号`
        }
        return '请选择'
      }
    },
    methods: {
      goInitData (path) {
        if (path === -1) {
          HousingData.init()
          this.$router.back()
        } else if (path === 0) {
          HousingData.init()
          this.isModalVisible2 = false
        } else if (path === 1) {
          HousingData.add({
            identity: this.identity,
            uaRealName: this.uaRealName,
            uaMobile: this.uaMobile,
            uaValidateNum: this.uaValidateNum,
            userCity: this.userCity,
            Area: copy(this.Area),
            housing: copy(this.housing)
          })
          this.$router.push({ path: '/choose_community' })
        } else if (path === 2) {
          if (this.Area.itemId) {
            HousingData.add({
              identity: this.identity,
              uaRealName: this.uaRealName,
              uaMobile: this.uaMobile,
              uaValidateNum: this.uaValidateNum,
              userCity: this.userCity,
              Area: copy(this.Area),
              housing: copy(this.housing)
            })
            this.$router.push({ path: '/choose_house', query: { itemId: this.Area.itemId } })
          } else {
            Toast('请先选择小区')
          }
        }
      },
      submitData () {
        if (!this.identity) {
          Toast('身份未选中')
          return
        }
        if (!this.uaRealName) {
          Toast('名字未输入')
          return
        }
        if (util.isMobile(this.uaMobile) === false) {
          Toast('手机号输入错误')
          return
        }
        if (util.smsValid(this.uaValidateNum) === false) {
          Toast('验证码输入错误')
          return
        }
        if (!this.Area.itemId) {
          Toast('小区未选')
          return
        }
        if (!this.housing.hoNo) {
          Toast('小区未选')
          return
        }
        const timeStamp = parseInt(new Date().getTime() / 1000)
        import('js-md5').then(md5 => {
          return Promise.resolve((md5(`token${ this.Area.itemId }${ this.uaMobile }${ this.timeStamp }`)).toUpperCase())
        }).then(sign => {
          return http.get('op/succeed.json', {
            itemId: this.Area.itemId,
            uaType: this.identity,
            uaRealName: this.uaRealName,
            uaMobile: this.uaMobile,
            uaValidateNum: this.uaValidateNum,
            hoBuildNumber: this.housing.hoBuildNumber,
            hoUnit: this.housing.hoUnit,
            hoRoomNumber: this.housing.hoRoomNumber,
            timeStamp,
            sign
          })
        }).then(data => {
          this.isModalVisible1 = true
        }).catch(msg => {
          this.isModalVisible2 = false
        })
      },
      getCode () {
        // 获取验证码
        if (this.time !== 0) return
        if (util.isMobile(this.uaMobile) === false) {
          Toast('手机号错误')
          return
        }
        http.get('op/Capttcha.json', {
          mobile: this.phone
        })
        let s = 60
        const ti = setInterval(() => {
          if (s === 0) {
            clearInterval(ti)
          } else {
            this.time = --s
          }
        }, 1000)
      }
    },
    created () {
      // 获取所在城市
      http.get('op/myLbsCity.json').then(val => {
        if (typeof val.data === 'object') {
          this.userCity = val.data.city
        }
      })
    },
    components: { VHead, SiftNav, Modal, [Field.name]: Field, [Cell.name]: Cell, [Radio.name]: Radio }
  }
</script>
<style lang="scss">
  .buildings-housingcertification {
    padding-bottom: 60px;

    .vhead {
      background-color: $blue;
      color: $white;
    }

    .from-data {
      li {
        border-bottom: 1px solid #ddd;

        .code-button {
          background-color: #72bf4b;
          border-radius: 10px;
          color: white;
          padding: 3px 10px;

          &.bg-gray {
            background: #999;
          }
        }
      }
    }
    .certification-form {
      .control {
        height: 42px;
        line-height: 42px;
      }

      .code-time {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        input {
          width: 70%;
        }

        span {
          margin-right: 10px;
          width: 30%;
          line-height: 24px;
          border-radius: 10px;
          text-align: center;
          background-color: #72bf4c;
          color: white;
        }

        .bg-gray {
          background-color: #dddddd;
          color: #333333;
        }
      }

      .icon {
        margin-bottom: 2px;
        margin-right: 5px;
      }
    }

    .modal {
      .modal-footer {
        .btn-ok {
          color: $red;
        }
      }
    }
  }

</style>
<!--    <div class="certification-form padding-left-10 bg-white">
      <div class="control border-b-ddd">
        <input placeholder="请输入业主姓名" type="text" v-model="uaRealName">
      </div>
      <div class="control border-b-ddd">
        <input placeholder="请输入业主手机号" type="number" v-model="uaMobile">
      </div>
      <div class="control border-b-ddd code-time">
        <input placeholder="请输入验证码" type="number" v-model="uaValidateNum">
        <span :class="{'bg-gray':time>0}" @click="getCode">{{time<1 ? '点击获取验证码': `${time}s秒后重新获取`}}</span>
      </div>
      <div class="control border-b-ddd right-arrow">
        &lt;!&ndash;<input placeholder="请选择省份" type="text">&ndash;&gt;
        &lt;!&ndash;<place-picker :place-value.sync="province" placeholder="请选择省份"/>&ndash;&gt;
      </div>
      <div class="control border-b-ddd right-arrow">
        &lt;!&ndash;<input placeholder="请选择城市" type="text">&ndash;&gt;
        &lt;!&ndash;<place-picker :place-value.sync="city" placeholder="请选择城市"/>&ndash;&gt;
      </div>
      <div @click="goHousing" class="control border-b-ddd right-arrow">
        &lt;!&ndash;<input placeholder="请选择小区" type="text">&ndash;&gt;
        <div :style="housing.hoItem ? '':{color:'#999'}">
          {{housing.hoItem||'请选择小区'}}
        </div>
      </div>
      <div class="control border-b-ddd">
        <input placeholder="请输入房号" type="text" v-model="hoRoomNumber">
      </div>
      <div class="control">
        <p class="c-orange text-sm"><i class="icon bulb-icon"></i>若您不是房屋业主,请提交业主的手机号码</p>
      </div>
    </div>
    <div class="fixed-bottom row">
      <div @click="closeBack" class="btn bg-white col">取消</div>
      <div @click="showModal" class="btn bg-blue col">房屋认证</div>
    </div>-->
