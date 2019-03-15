import * as types from './types'
import Http from '../Http'

export default {
  state: {
    info: {
      uaNo: '',      //编号
      uaImg: '',      //头像地址
      uaNickName: '',      //昵称
      uaRealName: '',      //姓名
      uaMobile: '',      //手机号码
      uaSex: '',      //称谓 0先生 1女士
      uaHouseholdCount: '',      //认证住户数
      uaMyHouseCount: '',      //我的房屋数
      uaMyHouse: '',      //当前房源
    },
    wxInfo: {
      isSing: '',//是否绑定手机号
      wxName: '',// 微信名字
      wxImg: '',//微信头像
      wxOpenId: '',// 用户wxid
      appId: '', // 公众号的唯一标识
      timestamp: '', // 生成签名的时间戳
      nonceStr: '', // 生成签名的随机串
      signature: '',// 签名
    }
  },
  mutations: {
    [types.SET_INFO_DATA] (state, prams) {
      state.info = JSON.parse(JSON.stringify(prams))
    },
    [types.SET_WX_INFO_DATA] (state, prams) {
      state.wxInfo = JSON.parse(JSON.stringify(prams))
    }
  },
  actions: {
    [types.LOGIN_WEB_SERVER] ({ commit, state, dispatch }, { wxOpenId }) {
      // 登陆
      return Http.get('op/loginWeb.json', { wxOpenId }).then(data => {
        if (data.data) {
          commit(types.SET_INFO_DATA, {
            ...(state.info),
            uaNo: data.data.uaNo,
            uaImg: data.data.uaImg,
            uaNickName: data.data.uaNickName,
            uaRealName: data.data.uaRealName,
            uaMobile: data.data.uaMobile
          })
        }
        return data.data
      })
    },
    [types.GET_USER_INFO] ({ commit, state }, { itemId }) {
      // 获取个人信息
      return Http.get('op/myUserInfo.json', {
        itemId
      }).then(data => {
        commit(types.SET_INFO_DATA, {
          'uaNo': '9999999999999999',      //编号
          'uaImg': 'https://xxxxxx/xxx.Jpg',      //头像地址
          'uaNickName': '爱丽丝',      //昵称
          'uaRealName': '张三',      //姓名
          'uaMobile': '13800000000',      //手机号码
          'uaSex': '0',      //称谓 0先生 1女士
          'uaHouseholdCount': 3,      //认证住户数
          'uaMyHouseCount': 2,      //我的房屋数
          'uaMyHouse': '优胜美地小区1幢1001室',      //当前房源
        })
        return data.data
      })
    },
    [types.MODIFICATION_INFO] ({commit, state}, {itemId, uaNickName, uaRealName, uaSex}) {
      // 修改名字昵称性别
      return Http.get('op/setMyUserInfo.json',
        {itemId, uaNickName, uaRealName, uaSex}).then(val => {
        // 成功后修改info
        const data = {}
        itemId && (data.itemId = itemId)
        uaSex && (data.uaSex = uaSex)
        uaNickName && (data.uaNickName = uaNickName)
        uaRealName && (data.uaRealName = uaRealName)
        commit(types.SET_INFO_DATA, {
          ...(state.info),
          ...data
        })
        return val.data
      })
    }
  }
}
