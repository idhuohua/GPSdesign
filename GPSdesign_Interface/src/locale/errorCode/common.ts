/**
 *   static RATE_LIMIT = 'A100O001'; // 频率限制
 *   static AES_DECRYPT_ERROR = 'A100O002'; //AES解密错误
 *   static AES_ENCRYPT_ERROR = 'A100O003'; //AES加密错误
 *   static NOT_FOUND_CONFIG = 'A100O004'; // 未找到配置信息
 */
const commonError = {
  zh: {
    '4001': '请检查您的登录状态',
    '5001': '未知错误',
    A100O001: '操作过于频繁，请稍等{{leftTime}}秒后再试',
    A100O002: 'AES解密错误',
    A100O003: 'AES加密错误',
    A100O004: '未找到配置信息',
  },
  en: {
    // 业务错误码
    '4001': 'You are not logged in',
    '5001': 'Exception Error',
    A100O001:
      'Too frequent operations, please try again after {{leftTime}} seconds',
    A100O002: 'AES Decrypt Error',
    A100O003: 'AES Encrypt Error',
    A100O004: 'Not Found Config',
  },
}

export default commonError
