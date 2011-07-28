var url = require('url');
var request_handler = require('./request_handler.js');



var route = function(request,response,controller) {
	request_handler.handle(request,response,controller);
};

exports.route = route;
