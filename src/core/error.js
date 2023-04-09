export class AxiosError extends Error {
  isAxiosError;
  config;
  code;
  request;
  response;

  constructor(message, config, code, request, response) {
    super(message);
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;
  }
}

export default function createError(message, config, code, request, response) {
  return new AxiosError(message, config, code, request, response);
}
