import { MESSAGES } from "./constants";

export const dbConnectCallback = (err: Error) => {
  if (err) {
    console.error(MESSAGES.CONNECTION_ERROR, err);
  } else {
    console.log(MESSAGES.CONNECTION_OK);
  }
}
