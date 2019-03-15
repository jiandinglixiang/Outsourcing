import * as types from './types';
import Http from '../Http';
import loading from '../../common/loading';

let state = {
  bookId: 0,
  newList: [],
  hotReadList: [],
  allBookList: [],
  getLibraryBanners: []
}

const actions = {
  [types.GET_LIBRARY_BANNER] (context) {
    if (state.getLibraryBanners.length === 0) {
      Http.get('op/shareList.json').then(data => {
        context.commit(types.GET_LIBRARY_BANNER, data);
      })
    }
  },
  [types.GET_NEW_LIST] (context) {
    if (state.newList.length === 0) {
      Http.get('op/shareList.json').then(data => {
        context.commit(types.GET_NEW_LIST, data);
      })
    }
  },
  [types.GET_HOTREAD_LIST] (context) {
    if (state.hotReadList.length === 0) {
      Http.get('op/shareList.json').then(data => {
        context.commit(types.GET_HOTREAD_LIST, data);
      })
    }
  },
  [types.GET_ALLBOOK_LIST] (context) {
    if (state.allBookList.length === 0) {
      Http.get('op/shareList.json').then(data => {
        context.commit(types.GET_ALLBOOK_LIST, data);
      })
    }
  },
  [types.GET_BOOK_DETAIL] (context, id) {
    if (state.bookId !== String(id) || !state.bookId) {
      context.commit(types.GET_BOOK_DETAIL, id);
      loading.show();
      return Http.get('op/shareDetail.json', {itemId: id}).then(data => {
        context.commit(types.GET_BOOK_DETAIL, data.data);
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
  [types.GET_LIBRARY_BANNER] (state, data) {
    state.getLibraryBanners = data.data;
  },
  [types.GET_NEW_LIST] (state, data) {
    state.newList = data.data;
  },
  [types.GET_HOTREAD_LIST] (state, data) {
    state.hotReadList = data.data;
  },
  [types.GET_ALLBOOK_LIST] (state, data) {
    state.allBookList = data.data;
  },
  [types.GET_BOOK_DETAIL] (state, data) {
    state.bookdetail = data;
  }
}

export default {
  state, mutations, actions
}
