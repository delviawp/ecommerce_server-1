# e-commerce-cms


## GET /products
Get all products that the user have

### Properties
- token (String)

### Request Header
```javascript
{
   "access_token" : "<user_token>" 
}
```

### Response
Status 200

```javascript
[
    {
        "id": 1,
        "name": "tahu goreng",
        "image_url": "www.google.com",
        "price": 10000,
        "stock": 5,
        "createdAt": "2020-06-20T15:04:33.095Z",
        "updatedAt": "2020-06-21T10:25:39.618Z"
    }
]
```
<br>

## POST /products
Create a product

### Properties
- Name (String)
    - Can not be null or empty
- Image Url (String)
    - Can not be null or empty
- Price (Integer)
    - Can not be null or empty
    - Can not be negatives
- Stock (Integer)
    - Can not be null or empty
    - Can not be negatives


#### Request Header
```javascript
{
   "Content-Type": "application/json",
   "access_token" : "<user_token>" 
}
```

#### Request Body
```javascript
{
	"name": "jengkol",
	"image_url": "www.google.com",
	"price": 5000,
	"stock": 10
}
```

#### Response
Status 201
```javascript
{
    "product": {
        "id":  1,
        "name": "tahu",
        "image_url": "www.google.com",
        "price": 100000,
        "stock": 5,
        "updatedAt": "2020-06-21T16:17:59.382Z",
        "createdAt": "2020-06-21T16:17:59.382Z"
    },
}
```

Status 400
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Product's name can't be empty)"
  ]
}
```
<br>

## GET /todos/:id

<br>

## PUT /products/:id
Update a product details by the id from the products resources

### Properties
- Name (String)
    - Can not be null or empty
- Image Url (String)
    - Can not be null or empty
- Price (Integer)
    - Can not be null or empty
    - Can not be negatives
- Stock (Integer)
    - Can not be null or empty
    - Can not be negatives

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "access_token" : "<user_token>"
}
```

#### Request Body
```javascript
{
	"name": "tahu goreng",
	"image_url": "www.google.com",
	"price": 10000,
	"stock": 5
}
```

#### Response
Status (200)
```javascript
{
    "edited": {
        "name": "tahu goreng",
        "image_url": "www.google.com",
        "price": 10000,
        "stock": 5
    },
    "message": "Product edited"
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Product's name can't be empty)",
    "Validation errors (Product's Image Url can't be empty)",
    "Validation errors (Product's Price can't be negatives)",
    "Validation errors (Product's Stock can't be negatives)"
  ]
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Product not found"
}
```
<br>

## DELETE /products/:id
Delete a products

### Properties
- id (Number)
    - Gotten from the client

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "access_token" : "<user_token>"
}
```

#### Response
Status (200)
```javascript
{
    "deleted": {
        "id": 1,
        "name": "jengkol",
        "image_url": "www.google.com",
        "price": 5000,
        "stock": 1,
        "createdAt": "2020-06-21T16:17:59.382Z",
        "updatedAt": "2020-06-21T16:19:15.215Z"
    },
    "message": "Product has been deleted"
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Products not found"
}
```
<br>

## POST /register
Sign up an account

### Properties
- Name (String)
    - Can not be null or empty
- email (String)
    - Can not be null or empty
- password (String)
    - Can not be null or empty
- role (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"email": "admin@mail.com",
	"password": "1234",
	"role": "admin"
}
```

#### Response
Status (201)
```javascript
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTI2Njk3OH0.WEUDS-NsY92pockeEpEax0Q55D-RXANJhcPafHvDTpY"
}
```
Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Name can not be empty)",
    "Validation errors (Email can not be empty)",
    "Validation errors (Password can not be empty)"
  ]
}
```
<br>

## POST /login
Login to an account
Generates a token for authentication

### Properties
- email (String)
- password (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```
#### Request Body
```javascript
    {
        "email" : "admin@mail.com",
        "password" : "1234"
    }

```

#### Response
Status (200)
```javascript
{
    "message": "user success to login",
    "statusCode": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTYwNTI2Njk3OH0.WEUDS-NsY92pockeEpEax0Q55D-RXANJhcPafHvDTpY"
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": "Invalid Email / Password"
}
```
<br>