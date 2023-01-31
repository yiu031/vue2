// 引入mockjs
import Mock from 'mockjs'
// webpack默认对外暴露：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'
// mock数据：第一个参数是请求地址，第二个参数是请求数据
Mock.mock("/mock/banner", {code:200, data: banner})
Mock.mock("/mock/floor", {code: 200, data: floor})