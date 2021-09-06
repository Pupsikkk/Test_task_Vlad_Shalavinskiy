class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }

  static infoNotFoundInDB(message) {
    return new ApiError(204, `Info not found in DB: ${message}`);
  }

  static internalError(message = '') {
    return new ApiError(500, 'Непредвиденная ошибка: ' + message);
  }
}

module.exports = ApiError;
