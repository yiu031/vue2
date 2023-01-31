import {reqAddressInfo, reqOrderInfo} from '@/api'
const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    // 获取用户地址信息
    async getAddress({commit}) {
        let result = await reqAddressInfo()
        if (result.code === 200) {
            commit('GETAddress', result.data)
        }
    },
    // 获取订单交易页信息
    async getOrderInfo({commit}) {
        let result = await reqOrderInfo()
        if (result.code === 200) {
            commit('GETORDERInfo', result.data)
        }
    }
}
const mutations = {
    GETAddress(state, address) {
        state.address = address
    },
    GETORDERInfo(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const getters = {
    address() {
        return state.address
    },
    orderInfo() {
        return state.orderInfo
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}