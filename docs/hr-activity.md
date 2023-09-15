# Documentation HR Actvity log ( Work In Progress )

## API Endpoint

```
https://node.flattenbot.site
```

### Get data hr-activity

- GET `/hr-activity-logs`

- Params Query

| **Params**     | **Type**     | **Description**       | **Required** |
| -------------- | ------------ | --------------------- | ------------ |
| page	         | int	        | current page	        | false        |
| status	     | string	    | search by status data	| false        |
| user	         | int	        | search by user id	    | false        |

- Example successfully response Status: 200 OK

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": [
        {
            "id": 1,
            "user_id": 1,
            "logs": "example_log",
            "leave_id": 1,
            "reimbursment_id": 1,
            "created_at": "15-01-2023",
            "updated_at": "17-01-2023",
            "deleted_at": null,
        }
    ]
}
```

### Create hr-activity-log

- POST `/hr-activity-logs`

- Form request body

| **Field**       | **Type**    | **Required** |
| -------------   | ----------  | :----------: |
| user_id         | int         | true         |
| logs            | enum        | true         | 
| leave_id        | int         | true         |
| reimbursement_id| int         | true         |
| created_at      | datetime    | false        |
| updated_at      | datetime    | true         |
| deleted_at      | datetime    | true         |

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "record has been created",
}
```
### Get details hr-activity-log

- GET `/hr-activity-logs/:id`

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully fetch data",
    "data": {
        "id": 1,
        "user_id": 1,
        "logs": "example_log",
        "leave_id": 1,
        "reimbursment_id": 1,
        "created_at": "15-01-2023",
        "updated_at": "17-01-2023",
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

### Update hr-activity-log

- PUT `/hr-activity-logs/:id`

- Form request body

| **Field**       | **Type**    | **Required** |
| -------------   | ----------  | :----------: |
| user_id         | int         | true         |
| logs            | enum        | true         |
| leave_id        | int         | true         |
| reimbursement_id| int         | true         |
| created_at      | datetime    | true         |
| updated_at      | datetime    | true         | 
| deleted_at      | datetime    | false        |

- Example successfully response `Status: 200 OK`

```json
{
    "status_code": 200,
    "result": "success",
    "message": "successfully update data",
    "data": {
        "id": 1,
        "user_id": 1,
        "logs": "example_log_updated",
        "leave_id": 1,
        "reimbursment_id": 1,
        "created_at": "15-01-2023",
        "updated_at": "17-01-2023",
        "deleted_at": null,
    }
}
```
### Delete hr-activity-log

- DELETE `/hr-activity-logs/:id`

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
```