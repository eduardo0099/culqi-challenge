import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ShortUniqueId from 'short-unique-id';
import { getCacheClient } from './db';
import { Card } from './models/card';
import { config } from './utils/config';
import { badRequestError, internalServerError, notFoundError } from './utils/httpErrors';
import middy from '@middy/core';
import authMiddleware from './middleware/auth.middleware';

async function cardTokenization(card: Card): Promise<string | null> {
  const cacheClient = await getCacheClient();
  const uid: string = new ShortUniqueId({ length: config.TOKEN_LENGTH })();

  const key = `${config.REDIS.KEY_CARD}:${uid}`;
  const ok = await cacheClient.set(key, card.cardToString(), { EX: config.REDIS.KEY_CARD_TTL * 60 });

  if (!ok) return null;
  return uid;
}

async function retrieveCard(token: string): Promise<string | null> {
  const cacheClient = await getCacheClient();

  const key = `${config.REDIS.KEY_CARD}:${token}`;
  return await cacheClient.get(key);
}

export const saveCardHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) return badRequestError();

    let card = new Card(JSON.parse(event.body));

    if (!card.validateFormat()) return badRequestError('Card information not valid');

    let token = await cardTokenization(card);
    if (!token) return internalServerError('[func:cardTokenization][msg:could not generate token]');

    return {
      statusCode: 200,
      body: JSON.stringify({
        token: token,
      }),
    };
  } catch (err: any) {
    return internalServerError(`[func:saveCard][msg:unhandled error][err:${err?.stack}]`);
  }
};

export const getCardHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    let token = event.queryStringParameters?.token;

    if (!token || token.length !== config.TOKEN_LENGTH) return badRequestError('Wrong token format');

    const dataCard = await retrieveCard(token);
    if (!dataCard) return notFoundError('Token info not found');

    let card = new Card(JSON.parse(dataCard));
    return {
      statusCode: 200,
      body: JSON.stringify(card.publicCard()),
    };
  } catch (err: any) {
    return internalServerError(`[func:getCard][msg:unhandled error][err:${err?.stack}]`);
  }
};

export const saveCard = middy(saveCardHandler);
export const getCard = middy(getCardHandler);
saveCard.use(authMiddleware());
getCard.use(authMiddleware());
