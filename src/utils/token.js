const key = 'token'
const setToken = token => {
  return localStorage.setItem(key, token)
}

const getToken = () => {
  return localStorage.getItem(key)
}

const removeToken = () => {
  return localStorage.removeItem(key)
}
export {
  setToken,
  getToken,
  removeToken
}