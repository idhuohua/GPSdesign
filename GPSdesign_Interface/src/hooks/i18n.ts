import {
  useTranslation,
  UseTranslationOptions,
  UseTranslationResponse,
} from 'react-i18next'
import { useEffect, useState } from 'react'
import { useAppContext, useForceUpdate } from '@/hooks/index'
import i18next from 'i18next'

interface IUseLang {
  (
    resource: Record<string, unknown>,
    options?: UseTranslationOptions<string>,
    _?: never
  ): UseTranslationResponse<string, string>
  (
    resource: Record<string, unknown>,
    namespace: string,
    options?: UseTranslationOptions<string>
  ): UseTranslationResponse<string, string>
}

export const useLang: IUseLang = (
  resource: Record<string, unknown>,
  ...args
) => {
  const [i18nReady, setI18nReady] = useState(false)
  const [, forceUpdate] = useForceUpdate()

  // 加入state是为了仅动态刷新需要的语言包
  const [namespaceState, setNamespace] = useState('')
  const [resourceState, setResource] = useState<Record<string, unknown>>({})

  const i18nArgs: Parameters<typeof useTranslation> = []

  if (args && typeof args[0] === 'string') {
    i18nArgs.push(args[0])
    args[1] && i18nArgs.push(args[1])
  } else {
    // 这里必须条件使用router 因为app拿不到router
    /* const router = useRouterInfo()
    i18nArgs.push(router.page) */
    args[0] && i18nArgs.push(args[0])
  }

  const namespace = i18nArgs[0] as string

  if (namespaceState !== namespace) {
    setNamespace(namespace)
  }

  if (resourceState !== resource) {
    setResource(resource)
  }

  useEffect(() => {
    Object.keys(resourceState).forEach((lng) => {
      i18next.addResourceBundle(lng, namespaceState, resourceState[lng])
      // IS_DEV && console.log('[i18n] Loaded', lng, namespaceState)
    })

    // 确保多个Backend依次加载时能够正确刷新
    setI18nReady(true)
    forceUpdate()
  }, [resourceState, namespaceState])

  return {
    ...useTranslation(namespace, {
      useSuspense: false,
      ...args,
    }),
    i18nReady,
  }
}

export const useCommonLang = () => {
  const context = useAppContext()
  return context.lang
}
