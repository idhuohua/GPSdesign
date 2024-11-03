/**
 *  // 参数错误
 *   static USER_NAME_OR_PASSWORD_ERROR = 'A101P001'; // 用户名或密码错误
 *   static USER_PASSWORD_HASH_ERROR = 'A101P002'; // 6位密码错误
 *   // 业务错误
 *   static USER_ROLE_ERROR = 'A101B001'; // 该用户未设置任何角色，无法登录
 *   static USER_NOT_EXIST = 'A101B002'; // 用户不存在
 *   static USER_NOT_EXIST_OR_PASSWORD_ERROR = 'A101B003'; // 用户不存在或密码错误
 *   static USER_LOGIN_EXPIRED = 'A101B004'; // 登录失效
 *   static USER_LOGIN_EXPIRED_OR_NO_PERMISSION = 'A101B005'; // 登录失效或无权限访问
 *   static USER_CUSTOMER_EXIST = 'A101B006'; // 客户已存在
 *   static USER_PASSWORD_HASH_EXIST = 'A101B007'; // 密码哈希已存在
 *   static USER_DEVELOPER_EXIST = 'A101B008'; // 开发者已存在
 *   static USER_AUTH_PENDING = 'A101B009'; // 账户审核中
 *   static USER_CAPTCHA_ERROR = 'A101B010'; // 验证码错误
 *   static USER_DEVELOPER_NOT_EXIST = 'A101B011'; // 开发者不存在
 *   static USER_CONFIG_SAVE_ERROR = 'A101B012'; // 保存配置失败
 *   static USER_PHONE_SAME = 'A101B013'; // 手机号已存在
 *   static USER_PASSWORD_SAME = 'A101B014'; // 密码已存在
 *   static USER_DEVELOPER_REGISTER_FAILED = 'A101B015'; // 开发者注册失败
 *   static IDENTIFY_FAILED = 'A101B016'; // 身份认证失败
 *   static SAVE_FAILED = 'A101B017'; // 保存失败
 *   static HAS_IDENTIFY = 'A101B018'; // 已认证
 *   static IDENTIFY_API_FAILED = 'A101B019'; // 身份认证接口调用失败
 *   static USER_EMAIL_SAME = 'A101B020';
 */
const userError = {
  zh: {
    A101P001: '用户名或密码错误',
    A101P002: '6位密码错误',
    A101B001: '该用户未设置任何角色，无法登录',
    A101B002: '用户不存在',
    A101B003: '用户不存在或密码错误',
    A101B004: '登录失效',
    A101B005: '登录失效或无权限访问',
    A101B006: '客户已存在',
    A101B007: '6位密码已存在',
    A101B008: '开发者已存在',
    A101B009: '账户审核中',
    A101B010: '验证码错误',
    A101B011: '开发者不存在',
    A101B012: '保存配置失败',
    A101B013: '手机号已存在',
    A101B014: '密码已存在',
    A101B015: '开发者注册失败',
    A101B016: '身份认证失败，请输入正确的身份证号码',
    A101B017: '保存失败',
    A101B018: '已实名认证，请勿重复认证',
    A101B019: '身份认证失败，{{msg}}',
    A101B020: '邮箱已存在',
  },
  en: {
    A101P001: 'User name or password error',
    A101P002: '6-digit password error',
    A101B001: 'The user has not been set any roles, and cannot log in',
    A101B002: 'User does not exist',
    A101B003: 'User does not exist or password error',
    A101B004: 'Login expired',
    A101B005: 'Login expired or no permission to access',
    A101B006: 'Customer already exists',
    A101B007: '6-digit password already exists',
    A101B008: 'Developer already exists',
    A101B009: 'Account audit',
    A101B010: 'Verification code error',
    A101B011: 'Developer does not exist',
    A101B012: 'Save configuration failed',
    A101B013: 'Phone number already exists',
    A101B014: 'Password already exists',
    A101B015: 'Developer registration failed',
    A101B016:
      'Identity authentication failed, please enter the correct ID number',
    A101B017: 'Save failed',
    A101B018: 'Has been certified, please do not repeat certification',
    A101B019: 'identify failed,{{msg}}',
    A101B020: 'Email already exists',
  },
}

export default userError
