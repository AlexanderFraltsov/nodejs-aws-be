import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'rsschool-node-in-aws-s3-fraltsov',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      forceExclude: ['aws-sdk']
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          'arn:aws:s3:::rsschool-node-in-aws-s3-fraltsov'
        ]
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: [
          'arn:aws:s3:::rsschool-node-in-aws-s3-fraltsov/*'
        ]
      }
    ]
  },
  functions: {
    importProductsFile: {
      handler: 'handler.importProductsFile',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  name: true
                }
              }
            }
          }
        }
      ]
    },
    importFileParser: {
      handler: 'handler.importFileParser',
      events: [
        {
          s3: {
            bucket: 'rsschool-node-in-aws-s3-fraltsov',
            event: 's3:ObjectCreated:*',
            existing: true,
            rules: [
              {
                prefix: 'uploaded/',
                suffix: ''
              }
            ]
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;