import {reqCartList, reqDeleteCartById, reqCheckedById} from '@/api'
// 封装游客身份模块uuid--生成一个数据字符串，不能在变
import {getUUID} from "@/utils/uuid_token";

const state = {
    cartList: [],
    uuid_token: getUUID()
}
const actions = {
    // 获取购物车数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result) {
            commit('CARTList', result.data)
        }
    },
    // 通过id删除购物车数据
    async deleteCart({commit}, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 通过id修改选中状态
    async checkedCart({commit}, {skuId, isChecked}) {
        let result = await reqCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('false'))
        }
    },
    // 重复调用checkedCart删除isChecked===1全部的数据
    deleteAllCheckedCart({dispatch, getters}) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked === 1 ? dispatch('deleteCart', item.skuId) : ''
            // 将返回的promise对象添加到数组中
            promiseAll.push(promise)
        })
        // 只要数组中有一个promise对象返回的是失败，就失败
        return Promise.all(promiseAll)
    },
    // 重复调用checkedCart修改isChecked的值来确是全选还是非全选
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        let checkedAll =[]
        state.cartList[0].cartInfoList.forEach((item) => {
            let result = dispatch('checkedCart', {skuId: item.skuId, isChecked})
            checkedAll.push(result)
        })
        return Promise.all(checkedAll)
    }
}
const mutations = {
    CARTList(state, value) {
        state.cartList = value
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}