import {reqDetailInfo, reqAddOrUpdateShopCart} from '@/api'

const state = {
    detailInfo: {}
}
const actions = {
    async getDetailInfo({commit}, value) {
        let result = await reqDetailInfo(value)
        if (result) {
            commit('GETDETAILInfo', result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId, skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 因为detail中需要这里返回的数据判断购物车数据存储成功还是失败
        // 我们只是通知服务器存储数据，而没有让服务器返回我们其他的数据，但是只要返回code===200，就表示服务器存储数据成功了
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('false'))
        }
    }
}
const mutations = {
    GETDETAILInfo(state, value) {
        state.detailInfo = value
    }
}
const getters = {
    // 路径导航数据
    categoryView(state) {
        return  state.detailInfo.categoryView || {}
    },
    // 产品信息数据
    skuInfo(state) {
        return state.detailInfo.skuInfo || {}
    },
    // 产品售卖属性数据
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}