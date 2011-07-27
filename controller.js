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
	actionNotFound : function(response,pathname)
	{
		if( typeof(pathname) !== 'undefined' ) {
			console.log('Could not find the requested action:' + pathname);
		}
		response.writeHead(404);
		response.end();
	},
	render_json : function(response,object)
	{
		response.writeHead(200,{'Content-Type':'application/json'});
		if( typeof(object) !== 'undefined' )
		{
			response.write(JSON.stringify(object));
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
