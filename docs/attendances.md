# Documentation Attendances

## API Endpoint

```
https://node.flattenbot.site
```
### Get data attendances

- GET `/attendances`

- Params query

| **Params**          | **Type**      | **Description**       | **Required** |
| ------------------- | ------------- | --------------------- | :----------: |
| page                | int           | current page          | false        |
| is_checkout         | boolean       | search by checkout    | false        |
| user                | int           | search by user id     | false        |

- Available value

| **Params**          | **Value**      |
| ------------------- | -------------- |
| is_checkout         | true, false    |

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "is_checkout": true,
            "created_date": "15-01-2023",
            "updated_date": "17-01-2023",
            "deleted_at": null,
        }
    ]
}
```

- Example failed response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": "invalid params query",
}
```

- Example failed response `Status: 401 Unauthorized`

```json
{
    "status_code": 401,
    "result": "error",
    "message": "unauthorized",
}
```

- Example failed response `Status: 404 Not found`

```json
{
    "status_code": 404,
    "result": "error",
    "message": "data not found",
    "data": []
}
```

### Create data attendances

- POST `/attendances`

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record present has been created",
}
```

- Example failed response `Status: 401 Unauthorized`

```json
{
    "status_code": 401,
    "result": "error",
    "message": "unauthorized",
}
```

- Example failed response `Status: 500 Internal server error`

```json
{
    "status_code": 500,
    "result": "error",
    "message": "internal server error",
}
```