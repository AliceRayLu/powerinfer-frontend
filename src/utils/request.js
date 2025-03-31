import axios from 'axios'

const service = axios.create({
  baseURL: "http://127.0.0.1:8088",
  timeout: 5000
})

// service.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   response => {
//     return response.data
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

export default service
