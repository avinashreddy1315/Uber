# Uber API Endpoint Documentation

# i) User Api's
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

---
---


# User Profile API

This API endpoint retrieves the profile information of the authenticated user. A valid JWT token must be provided in the `Authorization` header.

## Endpoint: `/users/profile`

### Method: `GET`

### Summary:
Retrieve the profile information of the authenticated user.

### Description:
This endpoint allows an authenticated user to fetch their profile information. Authentication is handled via a JWT token passed in the `Authorization` header or as a cookie.

### Authentication:
- Type: Bearer Token (`JWT`)

### Responses:

#### 200 - Success
The user profile data was retrieved successfully.

**Example Response:**
```json
{
    "userData": {
        "fullname": {
            "firstname": "Test",
            "lastname": "2 unit"
        },
        "_id": "677d44f6b07b71ed606080fa",
        "email": "test2@gmail.com",
        "__v": 0
    }
}
```

### Validation Error (Status Code: 401)
Occurs if invalid token , token not provided, if token expired

#### Example Response:
```json
    {
            "message": "Unauthorized",
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

# User Logout API

This API endpoint Logouts the user.

## Endpoint: `/users/logout`

### Method: `GET`

### Summary:
Logouts the user.

### Description:
This endpoint allows user to logout from the user and it will make the token to blacklist.

### Authentication:
- Type: Bearer Token (`JWT`)

### Responses:

#### 200 - Success
The user Logged out succesfully.

**Example Response:**
```json
{
    "message" : "user Logged out succesfully"
}
```

### Validation Error (Status Code: 401)
Occurs if invalid token , token not provided, if token expired

#### Example Response:
```json
    {
            "message": "Unauthorized",
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
# ii) Captain Api's
---

# Captain Registration API

This API endpoint is used to register a new captain. It accepts captain details such as their full name, email, password, and vehicle details, and creates a new captain in the database.

## Endpoint

`POST /captains/register`

## Summary

Registers a new captain in the system.

## Request

### Headers

| Key             | Value             |
|------------------|-------------------|
| Content-Type     | application/json  |

### Request Body

The body of the request should contain the following fields:

| Field            | Type   | Description                                   | Example                |
|-------------------|--------|-----------------------------------------------|------------------------|
| fullname          | object | The full name of the captain                 |                        |
| fullname.firstname | string | The first name of the captain                | "John"                |
| fullname.lastname  | string | The last name of the captain                 | "Doe"                 |
| email             | string | The email address of the captain             | "john.doe@example.com" |
| password          | string | The password for the captain                 | "12345667"            |
| vehicle           | object | The details of the captain's vehicle         |                        |
| vehicle.color      | string | The color of the vehicle                     | "red"                 |
| vehicle.plate      | string | The license plate of the vehicle             | "456 987"             |
| vehicle.capacity   | number | The number of passengers it can accommodate without the driver | 3                      |
| vehicle.vehicletype| string | The type of the vehicle (e.g., car, auto, motorcycle) | "car"                 |

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "12345667",
  "vehicle": {
    "color": "red",
    "plate": "456 987",
    "capacity": 3,
    "vehicletype": "car"
  }
}
```
### Responses

### Success (200)

| Field        | Type   | Description                                    |
|--------------|--------|------------------------------------------------|
| message      | string | A success message                             |
| token        | string | The authentication token for the captain      |
| newCaptain   | object | The details of the newly registered captain   |

```json
{
  "message": "Captain Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdkOWFiZmNiYWE4ODg2MDAwYmMyMDkiLCJpYXQiOjE3MzYzNjg3MjIsImV4cCI6MTczNjQ1NTEyMn0.QdoeLdHA5Nqos0hliNma5XSF9ByLkU94CNyeAwDr0m8",
  "newCaptain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$GOB9K7Hzlbbo/fQHsFfBFuTQ2w1NJ5Kr.f./k3NDlLDUvdqNRfp0W",
    "vehicle": {
      "color": "red",
      "plate": "456 987",
      "capacity": 3,
      "vehicletype": "car",
      "_id": "677c6488a73d604e3b357d5f",
      "status": "inactive"
    }
  }
}
```
### Validation Error (400)
Occurs when one or more validation rules are violated.

### Example Response
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
### Email Already Registered (401)
Occurs when the provided email is already registered in the system.

### Example Response
```json
{
  "message": "Email is already registered. Please log in."
}
```

### Internal Server Error (500)
Occurs when the server encounters an unexpected error.

### Example Response
```json
{
  "error": "Internal server error"
}
```

---
---

# Captain Login API

This API endpoint allows an existing captain to log in to the system by providing their email and password.

## Endpoint

`POST /captains/login`

## Summary

Authenticates an existing captain and returns a token along with their profile details.

## Request

### Headers

| Key             | Value             |
|------------------|-------------------|
| Content-Type     | application/json  |

### Request Body

The body of the request should contain the following fields:

| Field    | Type   | Description                             | Example                |
|----------|--------|-----------------------------------------|------------------------|
| email    | string | The email address of the captain        | "captain1@example.com" |
| password | string | The password for the captain            | "12345667"            |

### Example Request

```json
{
  "email": "captain1@example.com",
  "password": "12345667"
}
```

### Responses

#### Success (200)
| Field    | Type   | Description                                   |
|----------|--------|-----------------------------------------------|
| message  | string | A success message                            |
| token    | string | The authentication token for the captain     |
| captain  | object | The profile details of the authenticated captain |

### Example Response

```json
{
  "message": "Captain Logged In successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdkOWFiZmNiYWE4ODg2MDAwYmMyMDkiLCJpYXQiOjE3MzYzNjg3MjIsImV4cCI6MTczNjQ1NTEyMn0.QdoeLdHA5Nqos0hliNma5XSF9ByLkU94CNyeAwDr0m8",
  "captain": {
    "fullname": {
      "firstname": "Captain",
      "lastname": "Smith"
    },
    "vehicle": {
      "color": "red",
      "plate": "456789",
      "capacity": 3,
      "vehicleType": "car"
    },
    "_id": "677d9abfcbaa8886000bc209",
    "email": "captain1@example.com",
    "password": "$2b$10$.3ht2qHDbFmjJxXg8rfgTuwyo.Omd1eEaVU495lHIvHn4FIPicbKG",
    "status": "inactive",
    "__v": 0
  }
}
```

### Invalid Email or Password (401)

Occurs when the provided email or password is incorrect.

### Example Response
```json

{
  "message": "Invalid email or password."
}
```

### Internal Server Error (500)

Occurs when the server encounters an unexpected error.
### Example Response
```json

{
  "error": "Internal server error"
}
```

---
---

# Captain Profile API

This API endpoint retrieves the profile information of the authenticated captain. A valid JWT token must be provided in the `Authorization` header.

## Endpoint

`GET /captain/profile`

---

## Summary

Fetches the profile details of the authenticated captain.

---

## Request

### Headers

| Key             | Value             |
|------------------|-------------------|
| Authorization    | Bearer <token>    |

---

## Responses

### Success (200)

| Field          | Type   | Description                                     |
|-----------------|--------|-------------------------------------------------|
| fullname        | object | The full name of the captain                   |
| fullname.firstname | string | The first name of the captain                |
| fullname.lastname  | string | The last name of the captain                 |
| vehicle         | object | The details of the captain's vehicle           |
| vehicle.color    | string | The color of the vehicle                      |
| vehicle.plate    | string | The license plate of the vehicle              |
| vehicle.capacity | number | The passenger capacity of the vehicle         |
| vehicle.vehicleType | string | The type of the vehicle (e.g., car, auto)   |
| email           | string | The email address of the captain               |
| status          | string | The current status of the captain (e.g., active, inactive) |
| _id             | string | The unique ID of the captain                   |
| __v             | number | The version key for the captain's record       |

#### Example Response

```json
{
  "captainData": {
    "fullname": {
      "firstname": "Captain",
      "lastname": "Smith"
    },
    "vehicle": {
      "color": "red",
      "plate": "456789",
      "capacity": 3,
      "vehicleType": "car"
    },
    "email": "captain1@example.com",
    "status": "active",
    "_id": "677d9abfcbaa8886000bc209",
    "__v": 0
  }
}
```

### Unauthorized (401)
Occurs when the token is missing, invalid, or expired.

### Example Response
```json
{
  "message": "Unauthorized"
}
```

### Captain Not Found (404)
Occurs when the requested captain does not exist in the database.

### Example Response
```json
{
  "message": "Captain not found"
}
```
### Internal Server Error (500)
Occurs when the server encounters an unexpected error.

### Example Response
```json
{
  "error": "Internal server error"
}
```

---
---

# captain's Logout API

This API endpoint Logouts the captain's.

## Endpoint: `/captains/logout`

### Method: `GET`

### Summary:
Logouts the captains and blacklist the token and remove it from databse after 24hrs.

### Description:
This endpoint allows captains to logout from the captain and it will make the token to blacklist.

### Authentication:
- Type: Bearer Token (`JWT`)

### Responses:

#### 200 - Success
The captain Logged out succesfully.

**Example Response:**
```json
{
    "message" : "user captain out succesfully"
}
```

### Validation Error (Status Code: 401)
Occurs if invalid token , token not provided, if token expired

#### Example Response:
```json
    {
            "message": "Unauthorized",
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

