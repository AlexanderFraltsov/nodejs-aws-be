const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());

app.all('/*', (req, res) => {
  const { originalUrl, method, body } = req;
  console.log('originalUrl', originalUrl);
  console.log('method', method);
  console.log('body', body);

  try {
    const recipient = originalUrl.split('/')[1];
    console.log('recipient', recipient);

    const recipientURL = process.env[recipient];
    console.log('recipientURL', recipientURL);

    if (recipientURL) {
      const axiosConfig = {
        method,
        url: `${recipientURL}${originalUrl}`,
        ...(Object.keys(body || {}).length > 0 && { data: body }),
      };

      console.log('axiosConfig', axiosConfig);

      axios(axiosConfig)
        .then((response) => {
          const { data } = response;
          console.log('response from recipient', data);
          res.json(data);
        })
        .catch((error) => {
          console.log('some error: ', JSON.stringify(error));
          if (error.response) {
            const { status, data } = error.response;
            res.status(status).json(data);
          } else {
            res.status(500).json({ error: error.message });
          }
        });
    } else {
      res.status(502).json({ error: 'Cannot process request' });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = app;
