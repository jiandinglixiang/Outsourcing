import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  noticeDetail: []
}

const actions = {
  [types.GET_NOTICE_DETAIL] (context) {
    if (state.noticeDetail.length === 0) {
      Http.get('op/noticeDetail.json').then(data => {
        context.commit(types.GET_NOTICE_DETAIL, data);
      })
    }
  }
}

const mutations = {
  [types.GET_NOTICE_DETAIL] (state, data) {
    state.noticeDetail = data.data;
  }
}

export default {
  state, mutations, actions
}
