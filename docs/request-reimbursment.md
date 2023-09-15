# Documentation Request Reimbursment

## API Endpoint

```
https://node.flattenbot.site
```
### Get data request-reimbursment

- GET `/request-reimbursment`

- Params Query

| **Params**     | **Type**     | **Description**       | **Required** |
| -------------  | ------------ | --------------------- | :----------: |
| page           | int          | current page          | false        |
| type           | string       | search by type data   | false        |
| status         | string       | search by status data | false        |
| user           | int          | search by user id     | false        |

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
            "description": "some description",
            "type": "transportation",
            "nominal": 300000,
            "url_proof": "https://localhost.com/proof.jpg",
            "status": "pending",
            "created_date": "15-01-2023",
            "updated_date": "17-01-2023",
            "deleted_at": null,
        }
    ]
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

- Example failed response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": "invalid params query",
}
```

### Create request-reimbursment

- POST `/request-reimbursment`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| description   | string      | true         |
| type          | string      | true         |
| nominal       | bigInt      | true         |
| url_proof     | string      | false        |

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been created",
}
```

- Example failed response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": {
        "description": "description field is required",
    },
}
```

- Example failed response `Status: 500 Internal server error`

```json
{
    "status_code": 500,
    "result": "error",
    "message": "internal server error"
}
```

### Get details request-reimbursment

- GET `/request-reimbursment/:user_id`

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": {
        "id": 1,
        "user_id": 1,
        "description": "some description",
        "type": "transportation",
        "nominal": 300000,
        "url_proof": "https://localhost.com/proof.jpg",
        "status": "pending",
        "created_date": "15-01-2023",
        "updated_date": "17-01-2023",
        "deleted_at": null,
    }
}
```

- Example failed response `Status: 404 Not found`

```json
{
    "status_code": 404,
    "result": "error",
    "message": "data not found",
    "data": null
}
```

### Update request-reimbursment

- PUT `/request-reimbursment/:reimbursment_id`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| description   | string      | true         |
| type          | string      | true         |
| nominal       | bigInt      | true         |
| url_proof     | string      | false        |

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully update data",
    "data": {
        "id": 1,
        "user_id": 1,
        "description": "some description",
        "type": "transportation",
        "nominal": 300000,
        "url_proof": "https://localhost.com/proof.jpg",
        "status": "approved",
        "created_date": "15-01-2023",
        "updated_date": "17-01-2023",
        "deleted_at": null,
    }
}
```

- Example failed response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": {
        "description": "description field is required",
    },
}
```

### Delete request-reimbursment

- DELETE `/request-reimbursment/:leaves_id`

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been deleted",
}
```

- Example failed response `Status: 404 Not found`

```json
{
    "status_code": 404,
    "result": "error",
    "message": "data not found"
}