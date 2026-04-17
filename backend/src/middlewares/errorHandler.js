export const notFoundHandler = (_request, response) => {
  response.status(404).json({
    success: false,
    message: "Route not found."
  });
};

export const errorHandler = (error, _request, response, _next) => {
  console.error(error);

  response.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error."
  });
};
