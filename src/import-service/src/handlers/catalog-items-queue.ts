import 'source-map-support/register';

import { HEADERS } from "../constants";
import { simpleQueueService } from "../services/sqs.service";

export const catalogItemsQueue = (event, _context, callback) => {
  console.log(event);
  try {
    const messages = JSON.parse(event.body);

    messages.forEach(message => {
      simpleQueueService.sendMessage(message)
    })
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: HEADERS
    })
  }


  callback(null, {
    statusCode: 200,
    headers: HEADERS
  })
}
