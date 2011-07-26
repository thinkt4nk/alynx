var controllers = require('./controller');
var querystring = require('querystring');
var url = require('url');
var formidable = require('formidable');

var getQuery = function(request)
{
	return querystring.parse(url.parse(request.url).query);
}

// HANDLERS
var controller = new controllers.Controller();
controller.actions = { 
	test_form : function(request,response)
	{
		if( typeof(request.POST) !== 'undefined' )
		{
			console.log(request.POST);
			controller.redirect(response,'/test_form');
		}
		else
		{
			// output form
			response.writeHead(200,{'Content-Type':'text/html'});
			response.write('<html><head></head><body><form action="" method="POST"><label>name</label><input name="name" type="text" /><br /><label>age</label><input type="text" name="age" /><br /><input type="submit" value="Submit" /></form></body></html>');
			response.end();
		}
	}
};


var handle = function(request,response)
{
	var pathname = (url.parse(request.url).pathname).replace(/^\/(.*)/,'$1');
	if( typeof(controller.actions[pathname]) === 'function' )
	{
		console.log('Routing to handler:'+ pathname);
		// Handle and inject GET data into request object
		var query = getQuery(request);
		request['GET'] = query;
		// Handle POST, if applicable
		if( request.method === 'POST' )
		{
			var post_data = "";
			request.addListener('data',function(chunk) {
				post_data += chunk;
			});
			request.addListener('end',function() {
				var post_object = querystring.parse(post_data);
				request['POST'] = post_object;
				controller.actions[pathname](request,response);
			});
		}
		else
		{
			controller.actions[pathname](request,response);
		}
	}
	else
	{
		console.log('Could not find the requested action:' + pathname);
		response.writeHead(404,{'Content-Type':'text/plain'});
		response.end();
	}
}

exports.handle = handle;
