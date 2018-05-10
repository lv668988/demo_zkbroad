import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from '../plugins/logger'
import layout from './modules/layout'
import tableData from './modules/tableData'

Vue.use(Vuex)

//开发 调试环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    //vuex 原始
    state: {
        isLogin: false
    },
    mutations: {
        isLogin(state, param) {
            state.isLogin = param
        }
    },
    actions,
    getters,
    modules: {
        layout,
        tableData
    },
    // 是否严格模式
    strict: debug,
    //当调试模式下 打印日志
    plugins: debug ? [createLogger()] : []
})