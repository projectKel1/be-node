# Documentation Request Leaves

## API Endpoint

```
https://node.flattenbot.site
```

### Get data request-leaves

- GET `/request-leaves`

- Params Query

| **Params**     | **Type**     | **Description**       | **Required** |
| -------------  | ------------ | --------------------- | :----------: |
| page           | int          | current page          | false        |
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
            "reason": "some reason",
            "started_date": "20-01-2023",
            "ended_date": "23-01-2023",
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

### Create request-leaves

- POST `/request-leaves`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| reason        | string      | true         | 
| started_date  | datetime    | true         |
| ended_date    | datetime    | true         |
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
        "reason": "reason field is required",
    },
}
```

### Get details request-leaves

- GET `/request-leaves/:user_id`

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": {
        "id": 1,
        "user_id": 1,
        "reason": "some reason",
        "started_date": "20-01-2023",
        "ended_date": "23-01-2023",
        "url_proof": "https://localhost.com/proof.jpg",
        "pending": "pending",
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

### Update request-leaves

- PUT `/request-leaves/:leaves_id`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | string      | true         |
| reason        | string      | true         | 
| started_date  | datetime    | true         |
| ended_date    | datetime    | true         |
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
        "reason": "some reason updated",
        "started_date": "20-01-2023",
        "ended_date": "23-01-2023",
        "url_proof": "https://localhost.com/proof.jpg",
        "pending": "pending",
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
        "reason": "reason field is required",
    },
}
```

### Delete request-leaves

- DELETE `/request-leaves/:leaves_id`

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