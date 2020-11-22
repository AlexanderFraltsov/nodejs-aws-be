import { DELAY_MS } from "../../../common/constants";

export const addDelay = async (result: any) => {
  return new Promise(
    (resolve) => setTimeout(
      () => resolve(result),
      DELAY_MS
    )
  );
}
