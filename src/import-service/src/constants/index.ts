const BUCKET = `rsschool-node-in-aws-s3-fraltsov`;

const AWS_CONFIG = {
  REGION: 'eu-west-1',
  BUCKET: BUCKET
}

const HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

export {
  BUCKET,
  AWS_CONFIG,
  HEADERS
}
