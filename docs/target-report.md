# Documentation Target Reports

## API Endpoint

```
https://node.flattenbot.site/v1
```

### Get data target_reports

- GET `/target_reports`

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
            "target_id": 1,
            "status": "completed",
            "url_proof": "https://localhost.com/proof.jpg",
            "created_date": "15-01-2023",
            "updated_date": "17-01-2023",
            "deleted_date": null,
        }
    ]
}
```
### Create target_reports

- POST `/target_reports`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | int         | true         |
| target_id     | int         | true         | 
| status        | string      | true         |
| url_proof     | string      | false        |

- Example success response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been created",
}
```

- Example successfully response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": {
        "status": "status field is required",
    },
}
```

### Get details target_reports

- GET `/target_reports/:id`

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": {
        "id": 1,
        "user_id": 1,
        "target_id": 1,
        "status": "completed",
        "url_proof": "https://localhost.com/proof.jpg",
        "created_date": "15-01-2023",
        "updated_date": "17-01-2023",
        "deleted_date": null,
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

### Update target_reports

- PUT `/target_reports/:id`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | int         | true         |
| target_id     | int         | true         | 
| status        | string      | true         |
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
        "target_id": 1,
        "status": "completed",
        "url_proof": "https://localhost.com/proof.jpg",
        "created_date": "15-01-2023",
        "updated_date": "17-01-2023",
        "deleted_date": null,
    }
}
```

- Example successfully response `Status: 400 Bad request`

```json
{
    "status_code": 400,
    "result": "error",
    "message": {
        "status": "status field is required",
    },
}
```

### Delete target_reports

- DELETE `/target_reports/:id`

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been deleted",
}
```

- Example successfully response `Status: 404 Not found`

```json
{
    "status_code": 404,
    "result": "error",
    "message": "data not found"
}