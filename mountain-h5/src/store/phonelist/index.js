import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  convenPhoneList: []
}

const actions = {
  [types.GET_PHONE_LIST] (context) {
    if (state.convenPhoneList.length === 0) {
      Http.get('op/convenPhoneList.json').then(data => {
        context.commit(types.GET_PHONE_LIST, data);
      })
    }
  }
}

const mutations = {
  [types.GET_PHONE_LIST] (state, data) {
    state.convenPhoneList = data.data;
  }
}

export default {
  state, mutations, actions
}
