const KEY_LOCAL = {
  USER_DATA: '_KEY_LOCAL_USER_DATA_',
  USER_TOKEN: '_KEY_LOCAL_USER_TOKEN',
}

export const saveUser = ({ token, ...userData } = {}) => {
  localStorage[KEY_LOCAL.USER_DATA] = encodeURIComponent(JSON.stringify(userData))
  localStorage[KEY_LOCAL.USER_TOKEN] = token
}

export const clearUser = () => {
  delete localStorage[KEY_LOCAL.USER_DATA]
  delete localStorage[KEY_LOCAL.USER_TOKEN]
}
