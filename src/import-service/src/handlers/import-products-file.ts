import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';
import 'source-map-support/register';

import { BUCKET } from '../constants';

export const importProductsFile: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { name } = event.queryStringParameters;
  const path = `uploaded/${name}`;

  const s3 = new S3({ region: 'eu-west-1'});
  const params = {
    Bucket: BUCKET,
    Key: path,
    Expires: 60,
    ContentType: 'text/csv'
  };

  return await new Promise((res, rej) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        rej({
          statusCode: 500,
          body: err.message
        });
      }
      console.log(url);
      res({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: url
      })
    })
  })
}
