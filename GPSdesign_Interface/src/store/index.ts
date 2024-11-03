import { makeAutoObservable } from 'mobx'
import { RootContext } from '@/App.context'
import ExplanationViewStore from '@/store/explanationViewStore'
import AppStore from '@/store/app'
import GraphStore from '@/store/graphStore'
import UserStore from '@/store/userStore'
import MetaStore from '@/store/metaStore'
// import WtsStore from './wtsStore'

export class RootStore {
  public context: RootContext
  public app: AppStore
  public explanationView: ExplanationViewStore
  public graph: GraphStore
  public user: UserStore
  public meta: MetaStore
  // public wts: WtsStore

  constructor(context: RootContext) {
    this.context = context
    this.app = new AppStore(this.context)
    this.explanationView = new ExplanationViewStore(this.context)
    this.graph = new GraphStore(this.context)
    this.user = new UserStore(this.context)
    this.meta = new MetaStore(this.context)
    // this.wts = new WtsStore(this.context)
    makeAutoObservable(this)
  }
}
