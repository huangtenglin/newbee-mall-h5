import request from './request'
import { showFailToast,showSuccessToast } from 'vant';

// 封装get请求
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        request.get(url, {
            params
        }).then(res => {
            
        }).catch(error => {
            reject(error.data)
        })
    })
}


// 获取用户信息
export const getUserInfo = () => request.get('/user/info');

// 登录
export const login = (params) => request.post("/user/login", params);

// 登出
export const logout = () => request.post("/user/logout")

// 注册
export const register = (params) => request.post("/user/register", params);