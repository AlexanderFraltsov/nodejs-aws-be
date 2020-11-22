import 'source-map-support/register';
/*
import { simpleQueueService } from "../../services/sqs.service";
import { httpResponse } from '../../../utils/http-response';
*/
export const catalogBatchProcess = (event, _context, _callback) => {
  try {
    console.log(event);
    const records = event.Records.map(({body}) => body);
    console.log(records);
  } catch(err) {
    console.error(err);
  }

/*  try {
    const messages = JSON.parse(event.body);

    messages.forEach(message => {
      simpleQueueService.sendMessage(message)
    })
  } catch (error) {
    callback(null, httpResponse(500, null))
  }

  callback(null, httpResponse(200, null))
  */
/*  try {
    const messages = event.Records.map(({ body }) => body);
    simpleNotificationService.publish(messages);
    return httpResponse(202, JSON.stringify(messages));
  } catch (error) {
    return httpResponse(500, error.message);
  }
  */
}
