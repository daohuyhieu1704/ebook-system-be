const statusCode = {
  FORBIDDEN: 403,
  CONFLICT: 409,
};

const ReasonStatusCode = {
  CONFLICT: "Conflict Error",
  FORBIDDEN: "Bad Request Error",
};

class ErrorResponse extends Response {
  constructor(message, status) {
    super(message, status);
  }
}

export class ConflictRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = statusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FORBIDDEN,
    statusCode = statusCode.FORBIDDEN
  ) {
    super(message, statusCode);
  }
}
