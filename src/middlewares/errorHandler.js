export function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error for debugging

  // Set appropriate status code based on error type

  let statusCode = err.statusCode || err.status || getErrorStatusCode();

  const getErrorStatusCode=()=>{
     let statusCode=500;

      if (err.name === 'ValidationError') {
        statusCode = 400; // Bad request for validation errors
      } else if (err.name === 'UnauthorizedError') {
        statusCode = 401; // Unauthorized for authentication errors
      } else if (err.name === 'NotFoundError') {
        statusCode = 404; // Not found for resource errors
      }
      return statusCode
  }
    
  // Build the error response object
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    name: err.name,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    errors: err.errors || []
  };

  // Send the error response with appropriate status code
  res.status(statusCode).json(errorResponse);
}


