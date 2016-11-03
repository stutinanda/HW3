var redis = require('redis')
var multer  = require('multer')
var express = require('express')
var fs      = require('fs')
var app = express()
// REDIS
var client = redis.createClient(6379, '127.0.0.1', {})

///////////// WEB ROUTES

// Add hook to make it easier to get all visited URLS.
app.use(function(req, res, next) 
{
    console.log(req.method, req.url);
    client.llen("recent", function(err, value){
	if (value > 4) {
	    client.ltrim("recent", 1, -1);
	}
	client.rpush("recent", req.url);
    })
    next(); // Passing the request to the next handler in the stack.
});

app.get('/', function(req, res) {
   res.send('hello world')
})

app.get('/set', function(req, res) {
   client.setex("key", 10,"this message will self-destruct in 10 seconds");
   res.send('');
})

app.get('/get', function(req, res){
    client.get("key", function(err,value){ 
    	res.send(value)
    });
})

app.get('/recent', function(req, res){
    client.lrange("recent", 0, -1, function(err, obj){
	res.send(obj);
    })
})

app.post('/upload',[ multer({ dest: './uploads/'}), function(req, res){
   console.log(req.body) // form fields
   console.log(req.files) // form files

   if( req.files.image )
   {
	fs.readFile( req.files.image.path, function (err, data) {
	    if (err) throw err;
 	    var img = new Buffer(data).toString('base64');
	    client.rpush("images", img);
 	    console.log("Image uploaded in the queue!");
	});
   }

   res.status(204).end()
}]);

app.get('/meow', function(req, res) {
{
   client.llen("images",function(err, val){
    if(val > 0){
       client.rpop("images", function(error, imagedata){
	   if (error) { res.send("No image in the queue!"); }
           else {
       		res.writeHead(200, {'content-type':'text/html'});
		res.write("<h1>\n<img src='data:my_pic.jpg;base64,"+imagedata+"'/>");
       		res.end();
	   }
       })
    } else {
	res.send('No image in the queue!');
    }
   })
}
})

// HTTP SERVER
var server = app.listen(3000, function () {

   var host = server.address().address
   var port = server.address().port

   console.log('Example app listening at http://%s:%s', host, port)
})

