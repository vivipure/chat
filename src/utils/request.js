import axios from 'axios'


const HOST = 'http://localhost:52000/api'

const service = axios.create({
    baseURL: HOST,
    timeout: 5000
})

service.interceptors.response.use(
  response => {
    const res = response
    if (res.success || res.status === 200) {
      return res
    }
    return Promise.reject('error')
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

// TODO: 拦截器加token

export default service