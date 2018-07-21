import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import store from './store'

import App from './pages/App'

import './pages/styles/base.css'

import registerServiceWorker from './registerServiceWorker'

moment.locale('zh-cn')

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
