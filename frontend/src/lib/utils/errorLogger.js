export const formatErrorMessage = (error, defaultMessage = "An unexpected error occurred") => {
  if (typeof error === "string") return error;
  if (error.message === "Failed to fetch") {
    return "Unable to connect to the server. Please check your internet connection.";
  }
  return error.message || defaultMessage;
};
    message: formatErrorMessage(error),
  };
};
