import HYRequest from './request/index'
import { BASE_URL, TIME_OUT } from './config'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export const hyRequest2 = new HYRequest({
  baseURL: 'http://baidu.com',
  timeout: 8000
})

export default hyRequest
