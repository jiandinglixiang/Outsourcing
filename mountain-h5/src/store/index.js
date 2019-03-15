/**
 * Created by nirr on 2019/2/11.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import home from './home/index'
import mall from './mall/index'
import notice from './notice/index'
import points from './points/index'
import phonelist from './phonelist/index'
import library from './library/index'
import serve from './serve/index'
import user from './user/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home, mall, notice, points, phonelist, library, serve, user
  }
})
