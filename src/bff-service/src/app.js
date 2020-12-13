const express = require('express');
const axios = require('axios').default;
const cache = require('./utils/cache');

const app = express();

const CACHING_PATH = '/product/products';

app.use(express.json());

app.all('/*', (req, res) => {
  const { originalUrl, method, body } = req;
  console.log('originalUrl', originalUrl);
  console.log('method', method);
  console.log('body', body);

  try {
    const cachingCondition = originalUrl === CACHING_PATH && method === 'GET';

    if (cachingCondition) {
      const cashed = cache.get();
      if (cashed) {
        return res.json(cashed);
      }
    }

    const recipient = originalUrl.split('/')[1];
    console.log('recipient', recipient);

    const recipientURL = process.env[recipient];
    console.log('recipientURL', recipientURL);

    if (recipientURL) {
      const endpoint = originalUrl.replace(`/${recipient}`, '');
      console.log(endpoint);
      const axiosConfig = {
        method,
        url: `${recipientURL}${endpoint}`,
        ...(Object.keys(body || {}).length > 0 && { data: body }),
      };

      console.log('axiosConfig', axiosConfig);

      axios(axiosConfig)
        .then((response) => {
          const { data } = response;
          console.log('response from recipient', data);
          if (cachingCondition) {
            cache.set(data);
          }
          return res.json(data);
        })
        .catch((error) => {
          console.log('some error: ', JSON.stringify(error));
          if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
          } else {
            return res.status(500).json({ error: error.message });
          }
        });
    } else {
      return res.status(502).json({ error: 'Cannot process request' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
