import * as types from './types'
import Http from '../Http'

let state = {
  noticeList: [],
  banners: [],
  Device: { // 设备信息
    navInfo: { wx: false, ios: false, android: false },
    width: 100,
    height: 100
  },
  orderIndex: '0'
}

const actions = {
  [types.GET_NOTICE_LIST] (context) {
    if (state.noticeList.length === 0) {
      Http.get('op/noticeList.json').then(data => {
        context.commit(types.GET_NOTICE_LIST, data)
      })
    }
  },
  [types.GET_BANNER] (context) {
    if (state.banners.length === 0) {
      Http.get('op/getRotationList.json').then(data => {
        console.log(data)
        context.commit(types.GET_BANNER, data)
      })
    }
  }
}

const mutations = {
  [types.DEVICE_RESIZE] (state, params) {
    state.Device = { width: params.width, height: params.height, navInfo: params.navInfo }
  },
  [types.GET_BANNER] (state, data) {
    state.banners = data.data
  },
  [types.GET_NOTICE_LIST] (state, data) {
    state.noticeList = data.data
  },
  [types.SET_ORDER_INDEX] (state, data) {
    state.orderIndex = data
  }
}

export default {
  state, mutations, actions
}
