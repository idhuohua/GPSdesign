import { createContext, DispatchWithoutAction } from 'react'
import { RootStore } from '@/store'
import { TFunction } from 'react-i18next'
import { i18n } from 'i18next'

export class RootContext {
  public store = new RootStore(this)

  constructor(
    public lang: { t: TFunction; i18n: i18n },
    public appViewForceUpdate: DispatchWithoutAction
  ) {}
}

export const AppContext = createContext<RootContext>({} as RootContext)
