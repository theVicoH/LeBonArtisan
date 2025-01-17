export enum HttpResponseCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export interface SuccessResponse<T = undefined> {
  code: HttpResponseCode
  body: T extends undefined
    ? {
        message: string
      }
    : {
        message: string
        data: T
      }
}

export interface ErrorResponse {
  code: HttpResponseCode
  body: {
    message: string
  }
}

export type Response<T = undefined> = SuccessResponse<T> | ErrorResponse
