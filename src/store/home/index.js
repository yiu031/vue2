// home 模块的小仓库
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'

const state = {
    // state 中的数据默认初始值不能乱写，要根据服务器返回的值决定
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions= {
    async categoryList(context) {
        let result = await reqCategoryList()
        if (result) {
            context.commit('CATEGORYList', result.data)
        }
    },
    async getBannerList({commit}) {
        let result = await reqGetBannerList()
        if (result) {
            commit('GETBANNERList', result.data)
        }
    },
    async getFloorList({commit}) {
        let result = await reqGetFloorList()
        if (result) {
            commit('GETFLOORList', result.data)
        }
    }
}
const mutations = {
    CATEGORYList(state, value) {
        state.categoryList = value
    },
    GETBANNERList(state, value) {
        state.bannerList = value
    },
    GETFLOORList(state, value) {
        state.floorList = value
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}