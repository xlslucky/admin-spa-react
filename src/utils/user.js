const KEY_LOCAL = {
  USER_DATA: '_KEY_LOCAL_USER_DATA_',
  USER_TOKEN: '_KEY_LOCAL_USER_TOKEN',
  USER_AUTH_DATA: '_KEY_LOCAL_USER_AUTH_DATA',
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

export const saveAuth = (auths = []) => {
  localStorage.setItem(KEY_LOCAL.USER_AUTH_DATA, encodeURIComponent(JSON.stringify(auths)))
}

export const getAuth = () => (
  localStorage.getItem(KEY_LOCAL.USER_AUTH_DATA)
    ? JSON.parse(decodeURIComponent(localStorage.getItem(KEY_LOCAL.USER_AUTH_DATA) || '[]'))
    : []
)

export const getToken = () => localStorage.getItem(KEY_LOCAL.USER_TOKEN)

export const isLoggin = () => !!localStorage[KEY_LOCAL.USER_TOKEN]

export const clearUser = () => {
  localStorage.removeItem(KEY_LOCAL.USER_DATA)
  localStorage.removeItem(KEY_LOCAL.USER_TOKEN)
  localStorage.removeItem(KEY_LOCAL.USER_AUTH_DATA)
}
