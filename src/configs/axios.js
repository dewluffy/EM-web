import axios from "axios";

const instance = axios.create({
  baseURL:"http://localhost:8899/api/",
  withCredentials: true
})


instance.interceptors.request.use(
  (config) => {

  const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => res,
  async (err) => {

  const originalRequest = err.config

  if(err.response.status === 401){

    try {
      const response = await axios.get(
        'auth/refresh-token',
      )

      const newAccessToken = response.data.accessToken
      localStorage.setItem('accessToken', newAccessToken)
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
      return instance(originalRequest)
    } catch (error) {
      localStorage.removeItem('accessToken')
      return Promise.reject(error)
      
    }
  }
    
  }
)


export default instance