import middy from '@middy/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { Auth } from '../models/auth';
import { authError } from '../utils/httpErrors';

const middleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<APIGatewayProxyResult | void> => {
    const token = request.event.headers['Authorization'] || '';
    const pkData = token.replace(/^Bearer\s+/, '');
    const auth = new Auth(pkData);

    const isAuth = await auth.validateAuthentication();

    if (!isAuth) {
      return authError('Error authentication pk key');
    }
  };

  return {
    before,
  };
};

export default middleware;
