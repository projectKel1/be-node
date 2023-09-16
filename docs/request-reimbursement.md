# Documentation Request Reimbursement

## API Endpoint

```
https://node.flattenbot.site
```
### Get data request-reimbursement

- GET `/request-reimbursement`

- Params query

| **Params**     | **Type**     | **Description**       | **Required** |
| -------------  | ------------ | --------------------- | :----------: |
| page           | int          | current page          | false        |
| type           | string       | search by type data   | false        |
| status         | string       | search by status data | false        |
| user           | int          | search by user id     | false        |

- Available value

| **Field** | **value**                                   |
| --------- | ------------------------------------------- |
| type      | travel, business, healthcare, tax, others   |
| status    | pending, approved_lead, approved_hr, reject |

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
            "nominal": "300000",
            "url_proof": "https://localhost.com/proof.jpg",
            "status": "pending",
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

### Create request-reimbursement

- POST `/request-reimbursement`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| description   | string      | true         |
| type          | string      | true         |
| nominal       | bigInt      | true         |
| url_proof     | string      | false        |

- Available value

| **Field** | **Value**                                   |
| --------- | ------------------------------------------- |
| type      | travel, business, healthcare, tax, others   |

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
    "message": "internal server error"
}
```

### Get details request-reimbursement

- GET `/request-reimbursement/:user_id`

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
        "nominal": "300000",
        "url_proof": "https://localhost.com/proof.jpg",
        "status": "pending",
        "created_date": "15-01-2023",
        "updated_date": "17-01-2023",
        "deleted_at": null,
    }
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
    "data": null
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

### Update request-reimbursement

- PUT `/request-reimbursement/:reimbursement_id`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| description   | string      | true         |
| type          | string      | true         |
| nominal       | bigInt      | true         |
| url_proof     | string      | false        |

- Available value

| **Field** | **Value**                                   |
| --------- | ------------------------------------------- |
| type      | travel, business, healthcare, tax, others   |

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
        "nominal": "300000",
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
    "message": "record to update not found",
}
```

### Delete request-reimbursement

- DELETE `/request-reimbursement/:leaves_id`

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been deleted",
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
    "message": "data not found"
}