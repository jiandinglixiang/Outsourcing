import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
}

const actions = {
  [types.REPAIR_SUBMIT] (context, params) {
    Http.post('op/repairSubmit.json', params).then((data) => {
      context.commit(types.REPAIR_SUBMIT, data);
    });
  }
}

const mutations = {
  [types.REPAIR_SUBMIT] (state) {
    router.replace({ name: 'Points' });
  }
}

export default {
  state, mutations, actions
}
