// REDIS
var redis = require('redis')
var client = redis.createClient(6379, 'redis') 
 
var ip = process.env.APPL_IP
console.log("Registering container ip: " + ip)
client.lpush("listserver", ip);
