Homework #3
=========================

### Setup

* Clone this repo, run `sudo npm install`.
* Install redis and run on localhost:6379

### Run Server
The default server runs on port 3000

	$ node main.js
    Example app listening at http://:::3000
   
Access server on:

	http://localhost:3000

### Complete set/get

Create two routes, `/get` and `/set`.

When `/set` is visited, a new key, with below value is set:
> "this message will self-destruct in 10 seconds".
 
	http://localhost:3000/set

Above key expire in 10 seconds. To see the above message visit `/get` within 10 seconds of `/set`

	http://localhost:3000/get


### Complete recent

`/recent`, displays the most recently visited sites.

	http://localhost:3000/recent

It uses lpush, ltrim, and lrange redis commands to store the most recent 5 sites visited, and return that to the client.


### Complete upload/meow

The two routes, `/upload` store the images in a queue, and `/meow` display the most recent image to the client and *remove* the image from the queue.
 
Use curl to help you upload easily via terminal

	$ curl -F "image=@./img/morning.jpg" localhost:3000/upload

To access the above image visit below link:

	http://localhost:3000/meow
    
### Complete spawn/destory/listservers

A new command `spawn`, creates a new app server running on another port (new port mentioned in the message), to verify visit below link:

	http://localhost:3000/spawn
  	New Server spawned at port: 3001

To see the list of available servers, use the below command. Available servers should be stored in redis, which can be seen by `listservers`.

	http://localhost:3000/listservers
    Active servers are: http://localhost:3002 http://localhost:3001 http://localhost:3000

A new command `destroy`, destroys a random server, it takes approximately 2-3 seconds to identify randon server and destroy it (destroyed server is mentioned in the message). To verify visit below link:

	http://localhost:3000/destroy
    Server Destroyed at port: 3004
    
    http://localhost:3000/listservers
    Active servers are: http://localhost:3005 http://localhost:3003 http://localhost:3002 http://localhost:3001 http://localhost:3000

### Demonstrate proxy
Proxy `http://localhost:5050` uniformly deliver requests to available servers. E.g., if a visit happens to `/` then it toggle between `localhost:3000`, `localhost:3001`, etc.  And, it uses redis to look up which server to resolve to.

Start proxy server:

	$ node runProxy.js

Then visit:

	http://localhost:5050/
    
You can verify the uniform distribution of requests from the console from where you ran the terminal command, it list the port to which that command has been forwarded.

	$ node runProxy.js 
	listening on port 5050
	Forwarding request to http://127.0.0.1:3005
	Forwarding request to http://127.0.0.1:3003
	Forwarding request to http://127.0.0.1:3002

Also, you can perform all the above completed tasks using proxy.

### Screencast
Please find link to the youtube screencast here: https://youtu.be/HD65ReBb5nE
Be sure to view video in 720p (High Resolution) for clarity.

Alternatively, video is store in 'Video' directory in this repo.
