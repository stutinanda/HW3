var http = require('http'),
    httpProxy = require('http-proxy');
// REDIS
var redis = require('redis')
var client = redis.createClient(6379, 'redis') 
var server_index = 0;
var app_ip = process.env.APPL_IP;
// 
// Create a proxy server with custom application logic 
// 
var proxy = httpProxy.createProxyServer({});
 
// 
// Create your custom server and just call `proxy.web()` to proxy 
// a web request to the target passed in the options 
// also you can use `proxy.ws()` to proxy a websockets request 
// 
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request 
  // and then proxy the request. 
	
	/*client.llen("listserver", function (err, server_count){
		if ((server_index + 1) > server_count){
			server_index = 0;
		}
	})

	setTimeout(function(){
		client.lindex("listserver", server_index, function(err, app_ip){
			server_index += 1;*/
			value = 3000;
  			proxy.web(req, res, { target: 'http://' + app_ip + ':' + value });
                	console.log('Forwarding request to http://' + app_ip + ':' + value);
        /*	})
	}, 1500);*/

});
 
console.log("listening on port 5050")
server.listen(5050); 
