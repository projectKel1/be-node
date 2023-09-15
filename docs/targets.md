# Documentation Targets ( Work In Progress )

## API Endpoint

```
https://node.flattenbot.site
```

### Get data targets

- GET `/targets`

- Params Query

| **Params**     | **Type**     | **Description**       | **Required** |
| -------------  | ------------ | --------------------- | :----------: |
| page           | int          | current page          | false        |
| status         | string       | search by status data | false        |
| user           | int          | search by user id     | false        |

Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "product": "product_name",
            "quantity": 100,
            "ended_date": "23-01-2023",
            "created_date": "15-01-2023",
            "updated_date": "17-01-2023",
            "deleted_date": null,
        }
    ]
}
```

### Create targets

- POST `/targets`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | int         | true         |
| product       | string      | true         | 
| quantity      | int         | true         |
| ended_date    | datetime    | true         |

- Example successfully response `Status: 200 OK`

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
        "product": "product field is required",
    },
}
```
### Get details targets
- GET `/targets/:id`

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": {
        "id": 1,
        "user_id": 1,
        "product": "product_name",
        "quantity": 100,
        "ended_date": "23-01-2023",
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
### Update targets

- PUT `/targets/:id`

- Form request body

| **Field**     | **Type**    | **Required** |
| ------------- | ----------  | :----------: |
| user_id       | int         | true         |
| product       | string      | true         | 
| quantity      | int         | true         |
| ended_date    | datetime    | true         |

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully update data",
    "data": {
        "id": 1,
        "user_id": 1,
        "product": "product_name_updated",
        "quantity": 200,
        "ended_date": "23-01-2023",
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
        "product": "product field is required",
    },
}
```
### Delete targets

- DELETE `/targets/:id`

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