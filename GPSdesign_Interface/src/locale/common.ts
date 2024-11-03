import commonError from '@/locale/errorCode/common'
import userError from '@/locale/errorCode/user'
import smsError from '@/locale/errorCode/sms'
import verifyError from '@/locale/errorCode/verify'

const i18n: Record<string, Record<string, string>> = {
  zh: {
    // 其他语言资源
    successSaveToPhotosAlbum: '成功保存到相册',
    errorSaveToPhotosAlbum: '保存到相册失败',
    successCopyToClipboard: '复制到剪贴板成功',
    errorCopyToClipboard: '复制到剪贴板失败',
    notAvailable: '能力暂未开放',
    noMore: '没有更多了',
    loading: '加载中',
    emptyPhone: '请输入手机号',
    errorPhone: '请输入正确的手机号',
    emptyEmail: '请输入邮箱',
    errorEmail: '请输入正确的邮箱',
    errorFrom: '发送者信息错误',
    errorTo: '接收者信息错误',
    errorSettleTokenAddress: '结算代币地址错误',
    errorVerifyCodeAction: '验证码类型错误',
    errorPasswordAction: '密码类型错误',
    updateAvailable: '新版本可用',
    updateText: '新版本可用，即将自动更新。',
    Confirm: '好的',
    Cancel: '取消',
    goDownload: '前往下载',
    viewDetails: '查看详情',
  },
  en: {
    // 其他语言资源
    successSaveToPhotosAlbum: 'Successfully saved to the album',
    errorSaveToPhotosAlbum: 'Saving to the album failed',
    successCopyToClipboard: 'Successfully copied to the clipboard',
    errorCopyToClipboard: 'Copy to the clipboard failed',
    notAvailable: 'Not available',
    noMore: 'No more',
    loading: 'Loading',
    emptyPhone: 'Please enter the phone number',
    errorPhone: 'Please enter the correct phone number',
    emptyEmail: 'Please enter the email',
    errorEmail: 'Please enter the correct email',
    errorFrom: 'Sender information error',
    errorTo: 'Receiver information error',
    errorSettleTokenAddress: 'Settlement token address error',
    errorVerifyCodeAction: 'Verification code type error',
    errorPasswordAction: 'Password type error',
    updateAvailable: 'Update Available',
    updateText: 'A new app version is available, ready to update now.',
    Confirm: 'Confirm',
    Cancel: 'Cancel',
    goDownload: 'Go Download',
    viewDetails: 'View details',
  },
}

function mixin(locale: Record<string, Record<string, string>>) {
  Object.keys(i18n).forEach((key) => {
    Object.assign(i18n[key], locale[key])
  })
}

mixin(commonError)
mixin(userError)
mixin(smsError)
mixin(verifyError)

export default i18n
