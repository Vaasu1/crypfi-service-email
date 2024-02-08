/* eslint-disable no-unused-vars, no-shadow */
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'express-validation';
import ApiResponse from '../../../../helper/apiResponse';
import { ERROR_MESSAGES } from '../../../../constant/responseMessages';
import RESPONSE_CODES from '../../../../constant/responseCode';

function errorMiddleware(
  error: any,
  request: Request,
  response: Response,
  NextFunction
) {
  if (error instanceof ValidationError) {
    const status: number = error.statusCode || RESPONSE_CODES.BADREQUEST;
    const errorData: any =
      error.details.query || error.details.body || error.details.params || [];
    let message: string =
      errorData.length > 0
        ? errorData[0].message
        : ERROR_MESSAGES.SOMETHING_WENT_WRONG;
    message = message.replace(/[^\w\s]/gi, '');
    return ApiResponse.ErrorResponse(response, status, message);
  }
  const status = error.status || RESPONSE_CODES.INTERNALSERVER;
  const message = error.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
  return ApiResponse.ErrorResponse(response, status, message);
}

export default errorMiddleware;
