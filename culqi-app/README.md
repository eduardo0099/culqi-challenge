Requerimientos

- docker
- aws sam CLI

Levantar el docker compose para tener una instancia de redis corriendo

```bash
docker compose up
```

Instalar las dependencias

```bash
culqi-app$ cd card-api
card-api$ npm install
```

Para compilar el typescript, ejecutar

```bash
sam build
```

Para ejecutar los test locales

```bash
card-api$ npm run test
```

Para levantar las funciones localmente

```bash
sam local start-api
```

Levantará la API en el host 127.0.0.1, port 3000

cURL para probar:

```bash
curl --location 'http://127.0.0.1:3000/card' \
--header 'Authorization: Bearer pk_test_LsRBKejzCOEEWOsw' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "egamarra.gmz@gmail.com",
    "card_number": "4111111111111111",
    "cvv": "123",
    "expiration_year": "2025",
    "expiration_month": "09"
}'
```

```bash
curl --location 'http://127.0.0.1:3000/card?token=Wj1ct5U4n6Avbbh4'
```
