kAUthentification Module: JAX-RS Services Documentation 
=======================================================
Author: Bertrand Pestre

AuthService End Points
------------------------

### Authenticate user (no hash)
#### /rest/auth

* Request type: POST
* Request type: JSON
* Return type: JSON
* Request example:

```JavaScript
{"email":"jean@claude.com","password":"claude"}
```
* Response example:
 * Success: 200 OK
 * Authentication error: null

```JavaScript
{
  "id": 1,
  "email": "admin@admin.com",
  "password": "admin",
  "name": "Admin",
  "role": "ADMIN",
  "timestamp": 1483458543000
}
```

