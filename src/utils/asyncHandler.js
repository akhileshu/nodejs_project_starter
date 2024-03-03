const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }

//when there is a need of custom error message in case of catch block ,asyncHandler with  try catch ,ex:refreshAccessToken 
//else use asyncHandler without try catch