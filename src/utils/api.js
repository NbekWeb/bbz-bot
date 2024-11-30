import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

// Queue to store requests while token is being refreshed
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

export const api = ({ url, open = false, ...props }) => {
  let token = localStorage.getItem('access_token')

  if (token) token = `Bearer ${token}`

  if (!open) {
    props.headers = {
      ...props.headers,
      Authorization: props.headers?.Authorization || token
    }
  }

  return instance({
    url,
    ...props
  })
}

function createAxiosResponseInterceptor() {
  const interceptor = instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true

          const refresh_token = localStorage.getItem('refresh_token')

          if (refresh_token) {
            try {
              const refreshResponse = await instance.post('/token/refresh/', { refresh: refresh_token })

              if (refreshResponse.data?.access) {
                const newToken = `Bearer ${refreshResponse.data.access}`

                localStorage.setItem('access_token', refreshResponse.data.access)

                processQueue(null, newToken)
                isRefreshing = false

                originalRequest.headers['Authorization'] = newToken

                return instance(originalRequest)
              } else {
                throw new Error('Invalid refresh token response')
              }
            } catch (refreshError) {
              processQueue(refreshError, null)
              Clear()
            } finally {
              isRefreshing = false
            }
          } else {
            Clear()
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers['Authorization'] = token
              resolve(instance(originalRequest))
            },
            reject: err => {
              reject(err)
            }
          })
        })
      }

      return Promise.reject(error)
    }
  )
}

function Clear() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  window.location.href = '/login'
}

createAxiosResponseInterceptor()
