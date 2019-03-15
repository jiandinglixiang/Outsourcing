import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  goods: {
    itemId: 0, 
    shsKey: 0, 
    shsId: 1, 
    shgIndexType: 0, 
    startPage: 1,
    detail: {},
    list: [], 
    loading: false
  }
}


const actions = {
  [types.GET_MALL_GOODS_LIST] (context, status) {
    loading.show();
    context.commit(types.GET_MALL_GOODS_LIST, status);
    context.commit(types.RESET_GOODS_LIST);
    Http.get('op/goodsList.json', {
      itemId: state.goods.itemId,
      shsKey: state.goods.shsKey,
      shsId: state.goods.shsId,
      shgIndexType: state.goods.shgIndexType,
      startPage: state.goods.startPage
    }).then(data => {
      context.commit(types.GET_MALL_GOODS_LIST, data.data);
      loading.hide();
    })
  },
  [types.GOODS_DETAIL_REQUEST] (context, id) {
    if (state.goods.detail.id !== String(id) || !state.goods.detail.id) {
      context.commit(types.GOODS_DETAIL_REQUEST, id);
      loading.show();
      return Http.get('op/goodsDetail.json', {itemId: id}).then(data => {
        context.commit(types.GOODS_DETAIL_REQUEST, data.data);
        loading.hide();
      }, (data) => {
        if (data.code === 998) {
          history.back();
        }
      });
    }
  }
}

const mutations = {
  [types.GET_MALL_GOODS_LIST] (state, data) {
    state.goods.list = data;
  },
  [types.RESET_GOODS_LIST] (state) {
    state.goods.list = null;
    state.goods.offset = 0;
    state.goods.end = false;
  },
  [types.GOODS_DETAIL_REQUEST] (state, data) {
    state.goods.detail = data;
  }
}

export default {
  state, mutations, actions
}
