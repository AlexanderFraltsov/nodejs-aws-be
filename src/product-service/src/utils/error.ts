import { STATUS_CODES } from '../../../common/constants';

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

const catchErrors = (fn) => async (event, context) => {
  try {
    return await fn(event, context);
  } catch (err) {
    return handleError(err);
  }
}

export {
  catchErrors,
  handleError,
  MyError
}
