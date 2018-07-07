const KEY_LOCAL = {
  USER_DATA: '_KEY_LOCAL_USER_DATA_',
  USER_TOKEN: '_KEY_LOCAL_USER_TOKEN',
}

export const saveUser = ({ token, ...userData } = {}) => {
  localStorage.setItem(KEY_LOCAL.USER_DATA, encodeURIComponent(JSON.stringify(userData)))
  localStorage.setItem(KEY_LOCAL.USER_TOKEN, token)
}

export const getUser = ({ token, ...userData } = {}) => (
  localStorage.getItem(KEY_LOCAL.USER_DATA)
    ? JSON.parse(decodeURIComponent(localStorage.getItem(KEY_LOCAL.USER_DATA) || '{}'))
    : null
)

export const getToken = () => localStorage.getItem(KEY_LOCAL.USER_TOKEN)

export const isLoggin = ({ token, ...userData } = {}) => !!localStorage[KEY_LOCAL.USER_TOKEN]

export const clearUser = () => {
  localStorage.removeItem(KEY_LOCAL.USER_DATA)
  localStorage.removeItem(KEY_LOCAL.USER_TOKEN)
}
