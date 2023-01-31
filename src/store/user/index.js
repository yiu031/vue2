import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLoginOut} from '@/api'
import {setToken, getToken, removeToken} from "@/utils/token";

const state = {
    code: '',
    // 获取token
    token: getToken(),
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone)
        if (result.code === 200) {
            commit('GETCode', result.data)
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({commit}, data) {
        let result = await reqUserRegister(data)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({commit}, data) {
        let result = await reqUserLogin(data)
        if (result.code === 200) {
            commit('USERLogin', result.data.token)
            // 将token持久化存储
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 带token获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if (result.code === 200) {
            commit('GETUSERInfo', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLoginOut({commit}) {
        let result = await reqUserLoginOut()
        if (result.code === 200) {
            commit('USERLoginOut')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    // 注册
    GETCode(state, value) {
        state.code = value
    },
    // 登录
    USERLogin(state, token) {
        state.token = token
    },
    // 通过token获取用户信息
    GETUSERInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录
    USERLoginOut(state) {
        // 将仓库数据置空
        state.token = ''
        state.userInfo = {}
        // 将本地存储置空
        removeToken()
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}