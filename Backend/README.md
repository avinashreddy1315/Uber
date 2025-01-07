# Uber API Endpoint Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user. It accepts user details such as fullname, email, and password, and creates a new user in the database.

---

### Method
`POST`

---

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required, minimum length: 3)
  - `lastname` (string, minimum length: 3)
- `email` (string, required, unique, minimum length: 5)
- `password` (string, required, minimum length: 6)

#### Example Request Body:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "12345667"
}
```
---
### Responses

###  Success (Status Code: 200)
If the registration is successful, the server responds with the following:

#### Example Response:
```json
{
    "message": "User Registration successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjNjQ4OGE3M2Q2MDRlM2IzNTdkNWYiLCJpYXQiOjE3MzYyMDU0NDh9.4v0baEDpe2Z9fFMtXv1L1mss4dJTFlbEDwrmnVNcuWo",
    "newUser": {
        "fullname": {
            "firstname": "Test",
            "lastname": "1 unit"
        },
        "email": "test1@gmail.com",
        "password": "$2b$10$GOB9K7Hzlbbo/fQHsFfBFuTQ2w1NJ5Kr.f./k3NDlLDUvdqNRfp0W",
        "_id": "677c6488a73d604e3b357d5f"
    }
}
```
### Validation Error (Status Code: 400)
Occurs when the request body validation fails (e.g., missing required fields or invalid data).

#### Example Response:
```json
{
    "errors": [
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```
### Email Already Registered (Status Code: 401)
Occurs when the email is already registered.

#### Example Response:
```json
{
    "message": "Email already registered. Please log in."
}
```

### Internal Server Error (Status Code: 500)
Occurs when the server encounters an unexpected error.

#### Example Response:
```json
{
    "error": "Internal server error"
}
```

---
---

## Endpoint: `/users/login`

### Description
This endpoint is used to log in an existing user. It accepts user details such as email and password, and authenticates the user.

---

### Method
`POST`

---

### Request Body
The request body should be a JSON object with the following fields:
- `email` (string, required, minimum length: 5): The email address of the user.
- `password` (string, required, minimum length: 6): The password for the user.

#### Example Request Body:
```json
{
    "email": "test1@example.com",
    "password": "12345667"
}

```
---
### Responses

###  Success (Status Code: 200)
If the Logged IN is successful, the server responds with the following:

#### Example Response:
```json
{
    "message": "User Loggedin Succesfull",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdjNjQ4OGE3M2Q2MDRlM2IzNTdkNWYiLCJpYXQiOjE3MzYyMDU0NDh9.4v0baEDpe2Z9fFMtXv1L1mss4dJTFlbEDwrmnVNcuWo",
    "user": {
        "fullname": {
            "firstname": "Test",
            "lastname": "1 unit"
        },
        "email": "test1@gmail.com",
        "password": "$2b$10$GOB9K7Hzlbbo/fQHsFfBFuTQ2w1NJ5Kr.f./k3NDlLDUvdqNRfp0W",
        "_id": "677c6488a73d604e3b357d5f"
    }
}
```
### Validation Error (Status Code: 401)
Occurs only If user not registred are incorrect email are password.

#### Example Response:
```json
    {
            "msg": "Invalid email or password",
    }
```

### Internal Server Error (Status Code: 500)
Occurs when the server encounters an unexpected error.

#### Example Response:
```json
{
    "error": "Internal server error"
}
```