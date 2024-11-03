import { cubicBezier } from '@motionone/easing'

const i18n = {}

enum Lang {
  system = 'system',
  zh = 'zh-CN',
  en = 'en',
}

const supportedLang: Lang[] = [Lang.system, Lang.zh, Lang.en]

enum Theme {
  system = 'system',
  light = 'light',
  dark = 'dark',
}

const supportedTheme: Theme[] = [Theme.system, Theme.light, Theme.dark]

const motionEasing = {
  duration: 0.2,
  ease: cubicBezier(0.4, 0, 0.2, 1),
}

export { i18n, Lang, supportedLang, Theme, supportedTheme, motionEasing }
