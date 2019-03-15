import AxIos from 'axios'
import Toast from '../common/toast'
import loading from '../common/loading'
import { user } from '../common/store'

export class Http {
  constructor (url) {
    // const baseURL = url || 'http://localhost:6161/api/'
    const baseURL = url || 'http://api.starweb.macalline.touchyes.com/api/'
    this.Token = ''
    this.config = { baseURL: baseURL, timeout: 10000, headers: { 'Content-Type': 'application/json; charset=utf-8' } }
  }

  get (path = '', params = {}) {
    loading.show()
    const request = this.updateToken().then(token => AxIos({
      ...(this.config),
      url: path,
      method: 'get',
      params: { ...params, token },
    }))
    request.catch(this.error)
    return request.then(this.response)
  }

  post (path = '', data = {}, params = {}) {
    loading.show()
    const request = this.updateToken().then(token => AxIos({
      ...(this.config),
      url: path,
      method: 'post',
      params: params,
      data: { ...data, token },
      transformRequest: [
        function (data) {
          // 对 data 进行任意转换处理
          if (Object.prototype.toString.call(data) === '[object FormData]') {
            return data
          }
          const formData = new FormData()
          for (let i in data) {
            if (data[i] !== '' || data[i] !== undefined || data[i] !== null) {
              formData.append(i, data[i])
            } else {
              console.log('post=>>', i, ':', data[i])
            }
          }
          return formData
        }],
    }))
    request.catch(this.error)
    return request.then(this.response)
  }

  updateToken () {
    return new Promise((resolve, reject) => {
      if (this.Token) {
        resolve(this.Token)
      } else {
        AxIos({
          baseURL: `http://api.starweb.macalline.touchyes.com/`,
          url: 'api/auth',
          timeout: 10000,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          data: {
            appId: 'u182738405869778',
            appSecret: '21232F297A57A5A743894A0E4A801FC3',
          },
          method: 'post'
        }).then(response => {
          if (response.statusText === 'OK' && response.data &&
            response.data.code === 0) {
            this.Token = response.data.data.token
            resolve(response.data.data.token)
          } else {
            this.codeError(response.data, reject)
          }
        })
      }
    })
  }

  response (response) {
    // 响应
    return new Promise((resolve, reject) => {
      if (response.statusText === 'OK' && response.data &&
        response.data.code === 0) {
        resolve(response.data)
        loading.hide()
      } else {
        // 有错误code
        this.codeError(response.data, reject)
      }
    })
  }

  error (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else {
      // 在设置引发错误的请求时发生了一些事情
      console.log('Error', error.message)
    }
    setTimeout(function () {
      loading.hide()
    }, 1000)
  }

  codeError (data, reject) {
    let error = {}
    switch (data.code * 1) {
    case 999:
      this.Token = ''
      error = { data: data.data, code: 999, msg: 'token验证未通过' }
      break
    case 998:
      this.Token = ''
      error = { data: data.data, code: 998, msg: 'Token验证失败' }
      break
    case 997:
      error = { data: data.data, code: 997, msg: '参数不正确' }
      break
    default:
      error = { data: data.data, code: -1, msg: '未知错误' }
    }
    Toast(error.msg)
    reject(new Error(JSON.stringify(error)))
  }
}

export const http = new Http()// 默认http实例
export const GET = http.get
export const POST = http.post

export default http
