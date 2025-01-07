# Uber Api Endpoint document

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It accepts user details such as fullname, email, and password, and creates a new user in the database.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, minimum length: 3)
- `email` (string, required, unique, minimum length: 5)
- `password` (string, required, minimum length: 6)

Example:
```json
{
    
    {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "12345667"
    }
}
```


### Request Response


The request Response should be a JSON object with the following fields:
- `user`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, minimum length: 3)
  - `email` (string, required, unique, minimum length: 5)
  - `password` (string, required, minimum length: 6)
- `Success message` : As User Registred succesfull.
- `Token`: an Random Token generted by JsonWebToken


Example:
```json
{
    "message": "User Registrion succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjNjQ4OGE3M2Q2MDRlM2IzNTdkNWYiLCJpYXQiOjE3MzYyMDU0NDh9.4v0baEDpe2Z9fFMtXv1L1mss4dJTFlbEDwrmnVNcuWo",
    "newUser": {
        "fullname": {
            "firstname": "Test",
            "lastname": "1 unit"
        },
        "email": "test1@gmail.com",
        "password": "$2b$10$GOB9K7Hzlbbo/fQHsFfBFuTQ2w1NJ5Kr.f./k3NDlLDUvdqNRfp0W",
        "_id": "677c6488a73d604e3b357d5f",
        "__v": 0
    }
}
```



