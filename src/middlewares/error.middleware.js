import { ApiError } from "../utils/api-error.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message).join(", ");
    error = new ApiError(400, message);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    error = new ApiError(409, `${field} already exists`);
  }

  if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}`);
  }
  
  if (!(error instanceof ApiError)) {
    error = new ApiError(error.statuscode || 500, error.message || "Internal Server Error");
  }

  const response = {
    statusCode: error.statuscode,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statuscode).json(response);
};

export { errorHandler };

