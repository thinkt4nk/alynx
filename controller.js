var querystring = require('querystring');
var url = require('url');

// Constructor
function Controller() {}
Controller.prototype = {
	ok : function(response,message)
	{
		response.writeHead(200,{'Content-Type':'text/plain'});
		if( typeof(message) !== 'undefined' )
		{
			response.write(message);
		}
		response.end();
	},
	redirect : function(response,destination)
	{
		response.writeHead(303,{'Location' : destination});
		response.end();
	}
};

exports.Controller = Controller;
