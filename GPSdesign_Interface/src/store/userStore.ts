// import { userError } from '@/locale/errorCode/user';
import { RootContext } from '@/App.context'
import { makeAutoObservable } from 'mobx'

interface IUserInfo {
  id: string // 用户ID
  userName: string // 用户名
}

export default class UserStore {
  public user: string
  public context: RootContext
  public userInfo: IUserInfo
  // 更新用户名方法
  updateUsername(newUsername) {
    this.user = newUsername
  }

  // 加载用户信息
  loadUserInfo(userInfo) {
    this.userInfo = userInfo
  }

  constructor(context: RootContext) {
    this.context = context
    makeAutoObservable(this, {}, { autoBind: true })
  }
}
