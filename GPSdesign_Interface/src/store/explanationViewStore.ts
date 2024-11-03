import { RootContext } from '@/App.context'
import { makeAutoObservable } from 'mobx'
import { mobxProxyTrans } from '@/utils/basic'

export interface ITimeLineDataItem {
  date: string // 日期
  hour: number // 时间段 2 4 6 .. 22 24
  recommendedFrequency: number // 取值0-10
  readingRate: number // 在该时间段内的阅读率
  pressure: number // 0-100 压力值
}
export default class ExplanationViewStore {
  public context: RootContext

  public viewLoading = false

  public test = 'T986'

  constructor(context: RootContext) {
    this.context = context
    makeAutoObservable(this, {}, { autoBind: true })
  }
}
