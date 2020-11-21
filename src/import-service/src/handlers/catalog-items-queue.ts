import 'source-map-support/register';

import { simpleQueueService } from "../services/sqs.service";
import { httpResponse } from '../utils/http-response';

export const catalogItemsQueue = (event, _context, callback) => {
  console.log(event);
  try {
    const messages = JSON.parse(event.body);

    messages.forEach(message => {
      simpleQueueService.sendMessage(message)
    })
  } catch (error) {
    callback(null, httpResponse(500, null))
  }

  callback(null, httpResponse(200, null))
}
