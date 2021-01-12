import axios from 'axios'

var Axios = axios.create({
    // 公用前缀,匹配config中的域名ip
    baseURL: '/api',
    // 超时时间ms
    timeout: 1500,
})

// 暴露给axios使用
export default Axios