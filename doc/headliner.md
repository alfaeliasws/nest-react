
# Headliner API Spec

## Create Headliner

Endpoint : POST /api/headliners

Headers :
- Authorization: token

Request Body :

```json
{
  "topic" : "Music",
  "headliner" : "Everybody Changes On Top 1 In Billboard"
}
{
  "topic" : "Music",
  "headliner" : "Everybody Changes On Top 1 In Billboard"
}
```

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "topic" : "Music",
    "headliner" : "Everybody Changes On Top 1 In Billboard"
  }
}
```

## Get Headliner

Endpoint : GET /api/headliners/:headlinerId

Headers :
- Authorization: token

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "topic" : "Music",
    "headliner" : "Everybody Changes On Top 1 In Billboard"
  } 
}
```

## Update Headliner

Endpoint : PUT /api/headliners/:headlinerId

Headers :
- Authorization: token

Request Body :

```json
{
  "topic" : "Music",
  "headliner" : "Everybody Changes On Top 1 In Billboard"
}
```

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "topic" : "Music",
    "headliner" : "Everybody Changes On Top 1 In Billboard"
  } 
}
```

## Remove Headliner

Endpoint : DELETE /api/headliners/:headlinerId

Headers :
- Authorization: token

Response Body :

```json
{
  "data" : true
}
```

## Search Headliner

Endpoint : GET /api/headliners

Headers :
- Authorization: token

Query Params :
- highlight: string, headliner or topic, optional
- admin: string, admin, optional
- page: number, default 1
- size: number, default 10

Response Body :

```json
{
  "data" : [
    {
        "id" : 1,
        "topic" : "Music",
        "headliner" : "Everybody Changes On Top 1 In Billboard"
    } ,
    {
        "id" : 2,
        "topic" : "Music",
        "headliner" : "Runaway Baby On Top 1 In Billboard"
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 10,
    "size" : 10
  }
}
```
