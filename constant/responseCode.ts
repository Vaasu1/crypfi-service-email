const RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NOCONTENT: 204,
  BADREQUEST: 400,
  UNAUTHORIZED: 401,
  PaymentRequired: 402,
  FORBIDDEN: 403,
  NOTFOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  TOOMANYREQ: 429,
  INTERNALSERVER: 500,
  BADGATEWAYS: 502,
  SERVICEUNAVILABLE: 503,
  GATEWAYTIMEOUT: 504
};

export default RESPONSE_CODES;
