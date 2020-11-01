import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { STATUS_CODES } from "../constants/constants";

class MyError {
  public statusCode: number;
  public message: string;

  constructor (statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err: any) => {
  const { statusCode, message } = err;
  return {
    statusCode: statusCode ? statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
    body: JSON.stringify(message)
  }
}

const catchErrors = (
  fn: APIGatewayProxyHandler
) => async (event?:  APIGatewayProxyEvent) => {
  try {
    return await fn(event, null, null);
  } catch (err) {
    return handleError(err);
  }
}

export {
  catchErrors,
  handleError,
  MyError
}
