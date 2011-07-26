var http = require('http');

var server = function(route) {
	http.createServer(function(request,response) {
		route(request,response);
	}).listen(8888);
};

exports.start = server;
