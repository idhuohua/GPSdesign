import styles from './App.scss'
import './global.scss'
import './overlay.scss'
import './i18n'
import '@arco-design/web-react/dist/css/arco.css'
import React, { useEffect, useState } from 'react'
import { AppContext, RootContext } from '@/App.context'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { useLang } from '@/hooks/i18n'
import { useForceUpdate } from '@/hooks'
import commonLang from '@/locale/common'
import { useColorVar, useStyles } from '@/hooks/styles'
import { Portal } from '@antv/x6-react-shape'
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// https://x6.antv.antgroup.com/tutorial/intermediate/react#portal-%E6%96%B9%E5%BC%8F
const X6ReactPortalProvider = Portal.getProvider() // 注意，一个 graph 只能申明一个 portal provider

const App = () => {
  const c = useColorVar()
  const styleClass = useStyles(styles)
  const { t, i18n } = useLang(commonLang, 'common')
  const [, forceUpdate] = useForceUpdate()
  const [context] = useState<RootContext>(
    () => new RootContext({ t, i18n }, forceUpdate)
  )
  const rootStore = context.store

  const element = useRoutes(router)
  const location = useLocation()
  const navigation = useNavigate()

  useEffect(() => {
    navigation('/graph')
  }, [])
  useEffect(() => {
    console.log('[Router]', location.pathname, 'enter')
    NProgress.done()
    return () => {
      console.log('[Router]', location.pathname, 'leave')
      NProgress.start()
    }
  }, [location.pathname])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: c('primary'),
          colorPrimaryHover: c('btn-primary-hover'),
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AppContext.Provider value={context}>
        <X6ReactPortalProvider />
        {element}
      </AppContext.Provider>
    </ConfigProvider>
  )
}

export default App
