// search 模块的小仓库
import {reqGetSearchInfo} from '@/api'

const searchStore = {
    namespaced: true,
    state: {
        searchList: {}
    },
    actions: {
        async getSearchList({commit}, value={}) {
            let result = await reqGetSearchInfo(value)
            if (result) {
                commit('GETSEARCHList', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHList(state, value) {
            state.searchList = value
        }
    },
    // 可以理解为计算属性：在项目中是为了简化数据而生
    // 可以把将来组件中所需要的数据简化一下
    getters: {
        // 当前形参state是当前仓库中的state，而不是大仓库中的state
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        goodsList(state) {
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }
}

export default searchStore