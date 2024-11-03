/**
 *   // 参数错误
 *   static SMS_CODE_ERROR = 'A102P001'; // 短信验证码错误
 *   static SMS_SEND_FAILED = 'A102B001'; // 发送短信失败
 *   static SMS_VERIFY_FAILED = 'A102B002'; // 验证码错误
 *   static EMAIL_SEND_FAILED = 'A102B005'; // 邮件发送失败
 *   static EMAIL_VERIFY_FAILED = 'A102B006'; // 邮件验证失败
 */
const smsError = {
  zh: {
    A102P001: '短信验证码错误',
    A102B001: '向{{phone}}发送短信失败',
    A102B002: '验证码错误',
    A102B003: '发送频率超出限制, 请稍后再试',
    A102B004: '今日发送频率超出限制, 请明日再试',
    A102B005: '邮件发送失败',
    A102B006: '邮件验证失败',
  },
  en: {
    A102P001: 'SMS code error',
    A102B001: 'Send SMS failed',
    A102B002: 'Verify code error',
    A102B003: 'Send SMS frequency limit, please try again later',
    A102B004: 'Today SMS frequency limit, please try again tomorrow',
    A102B005: 'Email send failed',
    A102B006: 'Email verify failed',
  },
}

export default smsError
