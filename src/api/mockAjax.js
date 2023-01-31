// 将axios进行二次封装
import axios from "axios"
// 引入进度条:nprogress (发送网络请求后进度条开始，服务器返回数据后结束)
// nprogress 是一个对象，其身上有两个方法start和done分别对应进度条的开始与结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

const mockInstance = axios.create({
    // 基础路径，发送请求时会自动出现/api
    baseURL: '/mock',
    // 代表请求超时5s
    timeout: 5000
})
// 请求拦截器：在发送请求之前，请求拦截器可以检测到，此时可以完成一些业务
mockInstance.interceptors.request.use((config) => {
    // config: 配置对象，里面有一个属性很重要，headers的请求头
    nprogress.start()
    return config
})
// 响应拦截器
mockInstance.interceptors.response.use((response) => {
    // 响应成功的回调函数：服务器响应数据回来后，其可以完成一些业务
    nprogress.done()
    return response.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(error);
})

export default mockInstance

