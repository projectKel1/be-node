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