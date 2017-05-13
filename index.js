var restify = require('restify');
var mongoose = require('mongoose');
var server = restify.createServer();
//server.use(restify.queryParser()); needed for multiple arguements

const port = 8088;
const dbserver = 'mongodb://localhost/todo'
//adding routes
var tasks = require('./routes/tasks');
var client = require('./client'); //client is a route but not in the route folder, frontend split off

mongoose.connect(dbserver);
var db = mongoose.connection;

//Hook for err
db.on('error', function(msg) {
	console.log('Mongoose bit the dust;' + msg);
});

db.once('open', function() {
	console.log("Mongoose connection established.");
});
//html incoming
// server.get('/', function(req, res, next) {
// 	res.send("SUCCESS");
// });
server.get('/', client.get);
server.get('/tasks', tasks.read); //read route
server.post('/tasks/:arg1', tasks.create); //create route, ":task" argument must match req.params.task in route
server.put('/tasks/:arg1', tasks.update); //update
//server.post('/path/:arg1/:arg2', functionCall); //multiple arguements

server.listen(port, function() {
	console.log('%s listening on %s', server.name, port);
});
