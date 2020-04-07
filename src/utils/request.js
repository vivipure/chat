import axios from 'axios'

const HOST = 'http://localhost:52000/api'

const service = axios.create({
    baseURL: HOST,
    timeout: 5000
})

// TODO: 拦截器加token

export default service