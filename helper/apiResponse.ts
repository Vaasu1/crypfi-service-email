import * as GLOBAL_MESSAGE from '../constant/responseMessages';
import RESPONSE_CODES from '../constant/responseCode';

const success = (
  res: any,
  status: number,
  message: string,
  resData: {} = {}
) => {
  const result = {
    status,
    message,
    data: resData
  };
  return res.status(status).json(result);
};

const ErrorResponse = (res: any, status: number, message: string) => {
  const result = {
    status,
    message
  };
  return res.status(status).json(result);
};

const unauthorizedResponse = (res: any, status: number, message: string) => {
  const result = {
    status,
    message
  };
  return res.status(RESPONSE_CODES.UNAUTHORIZED).json(result);
};

const error404 = (req, res) => {
  // (req, res, next)=> {
  const err = {
    message: GLOBAL_MESSAGE.ERROR_NOT_FOUND,
    status: RESPONSE_CODES.BADREQUEST
  };
  // pass the error to the next piece of middleware
  // return next(err);
  return res.status(404).json(err);
};

const ApiResponse = {
  success,
  ErrorResponse,
  unauthorizedResponse,
  error404
};

export default ApiResponse;
