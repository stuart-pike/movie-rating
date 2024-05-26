// HTTP status codes and their corresponding messages
export const HTTP_STATUS_MESSAGES = {
  400: "400 Bad Request: The server could not understand the request due to invalid syntax.",
  401: "401 Unauthorized: The client must authenticate itself to get the requested response.",
  403: "403 Forbidden: The client does not have access rights to the content.",
  404: "404 Not Found: The server can not find the requested resource.",
  500: "500 Internal Server Error: The server has encountered a situation it doesn't know how to handle.",
  502: "502 Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
  503: "503 Service Unavailable: The server is not ready to handle the request.",
  504: "504 Gateway Timeout: The server was acting as a gateway or proxy and did not get a response in time.",
};
