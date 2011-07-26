var url = require('url');
var request_handler = require('./request_handler.js');

var route = function(request,response) {
	request_handler.handle(request,response);
};

exports.route = route;
