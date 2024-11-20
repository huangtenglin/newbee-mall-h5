import service from './request.js'

// 获取首页接口数据
export const getHome = (params) => service.get("/index-infos")