export const SERVICES = {
  ONBOARD: 'ONBOARD',
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
  FORGOT_PASSWORD: 'FORGOTPASSWORD',
  RESET_PASSWORD: 'RESETPASSWORD',
  BASICKYC: 'BASICKYC',
  PASSWORD_CHANGED: 'CHANGEPASSWORD',
  KYC_LEVEL2_REJECTED: 'KYCLEVEL2REJECTED',
  RESET_SECURITY: 'RESETSECURITY',
  WELCOME_MESSAGE: 'WELCOMEMESSAGE'

};export const DB_NAME = {
  EMAIL_SERVICE: 'crypfi_emailService',
  GRAPH_SERVICE: 'crypfi_graphService',
  ORDER_SERVICE: 'crypfi_orderService',
  USERS_SERVICE: 'crypfi_userService',
  WALLET_SERVICE: 'crypfi_walletService',
  PREFIX_ORDERS: 'orders_',
  ORDER_SERVICE_TABLE:{
    FEES:"fees",
    PAIR:"pairs"
  }
};
export const REDIS_KEYS = {
  LTP: 'ltp_{pair}',
  TRIGGER_PRICE: 'trigger_{pair}',
  BINANCE_MODULE_STATUS: 'BINANCE_MODULE_STATUS',
  ACTIVE_PAIRS: 'active_pairs',
  ANNOUNCEMENT:'ANNOUNCEMENT'
};

export const TABLE_NAME = {
  NOTIFICATION:'notifications'
}
export const OTP = {
  RETRY_COUNT: 2,
  EXPIRE_TIME: 30
};
export const NOTIFICATION_TYPE = {
  EMAIL: 'EMAIL',
  SMS: 'SMS'
};
export const URL = {
  VERIFY_DOMAIN: 'https://www.bitbubble.com/en/official-verification',
  CONTACT_SUPPORT: 'https://www.bitbubble.com/en/support'
};
