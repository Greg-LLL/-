// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://codercba.com:5000'
// export const BASE_URL = 'http://codewhy.com:8000'

// 2.代码逻辑判断，判断当前环境
// vite默认提供了环境变量
// console.log(import.meta.env.MODE) // 查看当前环境   production-> 开发环境
// console.log(import.meta.env.DEV) // 是否是开发环境
// console.log(import.meta.env.PROD) // 是否是生产环境
// console.log(import.meta.env.SSR) // 是否是SSR

let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://codercba.com:5000'
} else {
  BASE_URL = 'http://codercba.com:8000'
}

// 3.通过创建.env文件直接创建变量,
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
