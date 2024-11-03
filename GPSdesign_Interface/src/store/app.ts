import { RootContext } from '@/App.context'
import { makeAutoObservable } from 'mobx'
import { Lang, Theme } from '@/config'

export default class AppStore {
  public context: RootContext
  public colorScheme = 'light'
  public systemColorScheme = 'light'
  public language = Lang.zh

  constructor(context: RootContext) {
    this.context = context
    console.log('[I18N] 应用语言 / set language', this.language)
    makeAutoObservable(this, {}, { autoBind: true })
  }

  setLanguage(lang: Lang) {
    this.language = lang
    this.applyLanguage()
  }

  applyLanguage() {
    /* if (this.language === Lang.system) {
      this.context.lang.i18n.changeLanguage(
        this.context.store.deviceInfo.language
      )

      console.log(
        '[I18N] 应用语言 / set language',
        this.context.store.deviceInfo.language
      )
    } else {
      this.context.lang.i18n.changeLanguage(this.language)

      console.log('[I18N] 应用语言 / set language', this.language)
    } */
    this.context.lang.i18n.changeLanguage(this.language)

    console.log('[I18N] 应用语言 / set language', this.language)
  }

  get Language() {
    /* if (this.language === Lang.system) {
      return this.context.store.deviceInfo.language
    } else {
      return this.language
    } */
    return this.language
  }
}
