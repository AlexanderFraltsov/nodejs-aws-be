import { SQSEvent, SQSHandler } from 'aws-lambda';
import 'source-map-support/register';

import { createProduct } from '../../db/create-product';
import { simpleNotificationService } from '../services/sns.service';
import { productValidate } from '../utils/product-validate';

export const catalogBatchProcess: SQSHandler = async (event: SQSEvent) => {
  try {
    console.log(event);
    const products = event.Records
      .map(({body}) => JSON.parse(body))[0];

    console.log(products);
    for (const product of products) {
      const createdProduct = await createProduct(
        productValidate(product),
        (err) => { throw new Error(err.message) }
      );

      await simpleNotificationService.publish(createdProduct);
    }
  } catch(err) {
    console.error(err);
  }
}
