import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { saveCardHandler, getCardHandler, saveCard } from '../../app';
import { expect, describe, it } from '@jest/globals';
import { endCacheClient } from '../../db';

afterAll(() => {
  endCacheClient();
});

describe('Tests for card api', function () {
  it('checks tokenizer card info', async () => {
    const event: APIGatewayProxyEvent = {
      httpMethod: 'post',
      body: '{"email":"egamarra.gmz@gmail.com","card_number":"4111111111111111","cvv":"123","expiration_year":"2025","expiration_month":"09"}',
      headers: { Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' },
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/card',
      pathParameters: {},
      queryStringParameters: {},
      resource: '',
      stageVariables: {},
      requestContext: {
        resourceId: '123456',
        resourcePath: '/card',
        path: '/card',
        httpMethod: 'post',
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        protocol: 'HTTP/1.1',
        stage: 'dev',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
      },
    };

    const result: APIGatewayProxyResult = await saveCardHandler(event);

    expect(result.statusCode).toEqual(200);
  });

  it('Err: wrong pk key', async () => {
    const event: APIGatewayProxyEvent = {
      httpMethod: 'post',
      body: '{"email":"egamarra.gmz@gmail.com","card_number":"4111111111111111","cvv":"123","expiration_year":"2025","expiration_month":"09"}',
      headers: { Authorization: 'Bearer pa_test_LsRBKejzCOEEWOsw' },
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/card',
      pathParameters: {},
      queryStringParameters: {},
      resource: '',
      stageVariables: {},
      requestContext: {
        resourceId: '123456',
        resourcePath: '/card',
        path: '/card',
        httpMethod: 'post',
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        protocol: 'HTTP/1.1',
        stage: 'dev',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
      },
    };
    const ctx: Context = {
      callbackWaitsForEmptyEventLoop: false,
      functionName: '',
      functionVersion: '',
      awsRequestId: '',
      logStreamName: '',
      memoryLimitInMB: '',
      getRemainingTimeInMillis: () => 0,
      invokedFunctionArn: '',
      logGroupName: '',
      done: () => {},
      fail: () => {},
      succeed: () => {},
    };
    const result: APIGatewayProxyResult = await saveCard(event, ctx);

    expect(result.statusCode).toEqual(401);
  });

  it('validates error in body request - card_number', async () => {
    const event: APIGatewayProxyEvent = {
      httpMethod: 'post',
      body: '{"email":"egamarra.gmz@gmail.com","card_number":"011111111111111","cvv":"123","expiration_year":"2025","expiration_month":"09"}',
      headers: { Authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw' },
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: '/card',
      pathParameters: {},
      queryStringParameters: {},
      resource: '',
      stageVariables: {},
      requestContext: {
        resourceId: '123456',
        resourcePath: '/card',
        path: '/card',
        httpMethod: 'post',
        accountId: '123456789012',
        apiId: '1234',
        authorizer: {},
        protocol: 'HTTP/1.1',
        stage: 'dev',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        requestTimeEpoch: 1428582896000,
        identity: {
          accessKey: '',
          accountId: '',
          apiKey: '',
          apiKeyId: '',
          caller: '',
          clientCert: {
            clientCertPem: '',
            issuerDN: '',
            serialNumber: '',
            subjectDN: '',
            validity: { notAfter: '', notBefore: '' },
          },
          cognitoAuthenticationProvider: '',
          cognitoAuthenticationType: '',
          cognitoIdentityId: '',
          cognitoIdentityPoolId: '',
          principalOrgId: '',
          sourceIp: '',
          user: '',
          userAgent: '',
          userArn: '',
        },
      },
    };
    const result: APIGatewayProxyResult = await saveCardHandler(event);

    expect(result.statusCode).toEqual(400);
  });
});
