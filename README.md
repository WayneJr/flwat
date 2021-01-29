# Rule Validation API
**Base-URL** : https://serene-garden-56147.herokuapp.com/

[HTTP] GET ```/``` 

The root endpoint. It returns my profile information.

[HTTP] POST ```/validate-rule```

This endpoint takes in a JSON payload and validates the user's input and returns the necessary result.

**sample payload**

```
{
  "rule": {
    "field": "missions",
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
} 
```

Response: (HTTP 200) 

```
{
  "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}
```
