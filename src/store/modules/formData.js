// import * as types from '../mutation-types'
// import { appRouter } from '../../router'

const state = {
        // btns: [],
        btns1: [],
        btns2: [],
        tableData: [],
        tableColumns1: [],
        tableColumns2: [],
        formData: [],
        pageSizes: [1, 2],
        pageSize: 1,
        currentPage: 1,
        total: 2
    }
    // console.log(state)
const getters = {
    btns1: state => state.btns1,
    btns2: state => state.btns2,
    tableData: state => state.tableData,
    tableColumns1: state => state.tableColumns1,
    tableColumns2: state => state.tableColumns2,
    formData: state => state.formData,
    pageSizes: state => state.pageSizes,
    pageSize: state => state.pageSize,
    currentPage: state => state.currentPage,
    total: state => state.total
}
const mutations = {
    setJsonData(state, payload) {
        // console.log(payload)
        console.log(this)
        payload.buttons.forEach(item => {
                if (item.btnStyle == 1) {
                    state.btns1.push(item)
                } else {
                    state.btns2.push(item)
                }
            })
            // 获取人员信息表头
        state.tableColumns1 = payload.tableColumns
        state.tableColumns2 = [].concat(state.tableColumns1)
        state.tableColumns2.shift()
            // 获取人员信息表
        state.tableData = payload.userData
        state.formData = payload.formData
            // console.log(state.tableData)
            // 获取分页
        console.log(payload.pagination)
        state.pageSizes = payload.pagination.pageSizes
        state.pageSize = payload.pagination.pageSize
        state.currentPage = payload.pagination.currentPage
        state.total = payload.pagination.total
    }
}
const actions = {
    getJsonData(context) {
        fetch('http://localhost:8080/static/init.json').then(res => res.json()).then(data => {
            console.log(data)
            context.state.btns1 = []
            context.state.btns2 = []
            context.commit('setJsonData', data)
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}