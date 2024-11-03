import React, { ReactNode, useContext, useReducer } from 'react'
import { AppContext } from '@/App.context'
import ReactDOM from 'react-dom'

export const useRootStore = () => {
  const context = useContext(AppContext)
  return context.store
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export const useAppStore = () => {
  return useRootStore().app
}

export const useExplanationViewStore = () => {
  return useRootStore().explanationView
}

export const useGraphStore = () => {
  return useRootStore().graph
}

export const useUserStore = () => {
  return useRootStore().user
}

export const useMetaStore = () => {
  return useRootStore().meta
}

export const useForceUpdate = () => {
  return useReducer(() => {
    // console.log('force update')
    return {}
  }, {})
}
