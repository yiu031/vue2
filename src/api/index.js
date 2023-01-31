// 对API进行统一管理
import apiInstance from "@/api/ajax";
import mockInstance from "@/api/mockAjax";

// 对外暴露一个函数，只要外部调用这个函数就可以向服务器发送请求
// 获取categoryList （home首页三级联动接口）
export const reqCategoryList = () => apiInstance({url: '/product/getBaseCategoryList', method: 'get'})
// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockInstance.get('/banner')
// 获取floor（home首页楼层区接口）
export const reqGetFloorList = () => mockInstance.get('/floor')
// 获取search（search模块数据接口） 在调用这个函数获取服务器数据时，value至少是一个空对象
export const reqGetSearchInfo = (value) => apiInstance({url: '/list', method: 'post', data: value})
// 获取（detail模块商品详情接口）
export const reqDetailInfo = (skuId) => apiInstance({url: `/item/${skuId}`, method: 'get'})
// 将产品添加到购物车（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => apiInstance.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车信息
export const reqCartList = () => apiInstance.get('/cart/cartList')
// 删除购物车信息
export const reqDeleteCartById = (skuId) => apiInstance({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
// 修改购物车isChecked属性
export const reqCheckedById = (skuId, isChecked) => apiInstance.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 获取验证码
export const reqGetCode = (phone) => apiInstance.get(`/user/passport/sendCode/${phone}`)
// 注册
export const reqUserRegister = (data) => apiInstance({url: '/user/passport/register', data, method: 'post'})
// 登录
export const reqUserLogin = (data) => apiInstance({url: '/user/passport/login', data, method: 'post'})
// 带着token获取服务器数据
export const reqUserInfo = () => apiInstance.get('/user/passport/auth/getUserInfo')
// 退出登录
export const reqUserLoginOut = () => apiInstance.get('/user/passport/logout')
// 获取用户地址信息
export const reqAddressInfo = () => apiInstance({url: '/user/userAddress/auth/findUserAddressList', method: 'get'})
// 获取用户订单交易信息
export const reqOrderInfo = () => apiInstance.get('/order/auth/trade')
// 提交订单
export const reqSubmitOrder = (traderNo, data) => apiInstance({url: `/order/auth/submitOrder?tradeNo=${traderNo}`, data, method: 'post'})
// 获取订单支付信息
export const reqPayInfo = (orderId) => apiInstance.get(`/payment/weixin/createNative/${orderId}`)
// 获取支付订单状态
export const reqPayStatus = (orderId) => apiInstance({url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})
// 获取订单列表信息
export const reqOrderList = (page, limit) => apiInstance({url: `/order/auth/${page}/${limit}`, method: 'get'})
