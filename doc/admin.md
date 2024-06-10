# Admin API Spec

## Login Admin

Endpoint : POST /api/admin/login

Request Body :

```json
{
  "username" : "admin1",
  "password" : "rahasia"
}
```

Response Body (Success) :

```json
{
  "data" : {
    "username" : "admin1",
    "name" : "Joko Anwar",
    "token" : "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "errors" : "Username or password is wrong"
}
```

## Logout Admin

Endpoint : DELETE /api/admin/logout

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "data" : true
}
```