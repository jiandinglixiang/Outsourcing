import store from 'store'

let pageJump = {
  fromSet (key, router) {
    const params = {
      path: router.path, query: router.query
    };
    return store.set('from_' + key, params);
  },
  fromGet (key) {
    let router = store.get('from_' + key);
    return router;
  }
}
let recommendIssue = {
  set (obj) {
    return store.set('recommend_issue', obj);
  },
  get () {
    return store.get('recommend_issue');
  },
  clear () {
    return store.remove('recommend_issue');
  }
}

export {
  user,
  pageJump,
  recommendIssue
}
