export function badRequestError(msg?: string) {
  return {
    statusCode: 400,
    body: JSON.stringify({
      message: msg || 'Bad request',
    }),
  };
}

export function notFoundError(msg?: string) {
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: msg || 'Not found',
    }),
  };
}

export function authError(msg?: string) {
  return {
    statusCode: 401,
    body: JSON.stringify({
      message: msg || 'Authentication error',
    }),
  };
}

export function internalServerError(err: string) {
  console.log(err);
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: err || 'some error happened',
    }),
  };
}
