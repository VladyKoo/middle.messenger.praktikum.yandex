export enum StatusCode {
  SuccessOK = 200,
  SuccessCreated = 201,

  ClientErrorUnauthorized = 401,
  ClientErrorNotFound = 404,

  ServerErrorInternal = 500,
  ServerErrorBadGateway = 502,
}
