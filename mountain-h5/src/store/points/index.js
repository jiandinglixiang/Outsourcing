import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  integral: 0,
  integralList: [],
  continueSignIn: []
}

const actions = {
  [types.GET_INTEGRAL] (context) {
    if (state.integral === 0) {
      Http.get('op/myIntegralAccount.json').then(data => {
        context.commit(types.GET_INTEGRAL, data);
      })
    }
  },
  [types.GET_INTEGRAL_LIST] (context) {
    if (state.integralList.length === 0) {
      Http.get('op/myIntegralList.json').then(data => {
        context.commit(types.GET_INTEGRAL_LIST, data);
      })
    }
  },
  [types.CONTINUE_SIGNIN] (context) {
    if (state.continueSignIn.length === 0) {
      Http.get('op/myContinueSignIn.json').then(data => {
        context.commit(types.CONTINUE_SIGNIN, data);
      })
    }
  }
}

const mutations = {
  [types.GET_INTEGRAL] (state, data) {
    state.integral = data.data;
  },
  [types.GET_INTEGRAL_LIST] (state, data) {
    state.integralList = data.data;
  },
  [types.CONTINUE_SIGNIN] (state, data) {
    state.continueSignIn = data.data;
  }
}

export default {
  state, mutations, actions
}
