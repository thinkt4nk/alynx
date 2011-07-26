var http = require('http');

var server_port = 8888;
var server = function(route) {
	console.log('starting server on port '+ server_port);
	http.createServer(function(request,response) {
		route(request,response);
	}).listen(server_port);
};

exports.start = server;
