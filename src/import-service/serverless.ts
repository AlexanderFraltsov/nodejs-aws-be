import type { Serverless } from 'serverless/aws';
import { PATHES } from '../common/constants';

const responseProperties = {
  ResponseParameters: {
    'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
    'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
  },
  RestApiId: {
    Ref: 'ApiGatewayRestApi',
  }
};

const responseType = 'AWS::ApiGateway::GatewayResponse';

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
      SQS_URL: '${cf:product-service-${self:provider.stage}.SQSQueueUrl}'
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
      },
      {
        Effect: 'Allow',
        Action: ['sqs:SendMessage'],
        Resource: [
          '${cf:product-service-${self:provider.stage}.SQSQueueArn}'
        ]
      }
    ]
  },
  resources: {
    Resources: {
      GatewayResponseUnauthorized: {
        Type: responseType,
        Properties: {
          ...responseProperties,
          ResponseType: 'UNAUTHORIZED'
        },
      },
      GatewayResponseAccessDenied: {
        Type: responseType,
        Properties: {
          ...responseProperties,
          ResponseType: 'ACCESS_DENIED',
          ResponseTemplates: {
            'application/json': '{"message":"$context.authorizer.message"}',
          },
        },
      },
      GatewayResponseInvalidToken: {
        Type: responseType,
        Properties: {
          ...responseProperties,
          ResponseType: 'AUTHORIZER_FAILURE',
          ResponseTemplates: {
            'application/json': '{"message":"Error: Invalid token"}',
          },
          StatusCode: 401
        },
      }
    }
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
            authorizer: {
              name: 'basicAuthorizer',
              type: 'token',
              arn: '${cf:authorization-service-${self:provider.stage}.basicAuthorizerArn}',
              resultTtlInSeconds: 0,
              identitySource: 'method.request.header.Authorization'
            },
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
                prefix: `${PATHES.UPLOADED}/`,
                suffix: '.csv'
              }
            ]
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
