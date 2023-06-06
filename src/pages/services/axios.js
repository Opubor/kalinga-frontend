import axios from 'axios'

const api = axios.create({
    // Add your backend URL here EXAMPLE
    baseURL: 'http://kalingabaseprod-production.up.railway.app/',
    timeout: 100000000
})

api.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config
})

export default api;