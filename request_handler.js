var querystring = require('querystring');
var url = require('url');
var formidable = require('formidable');

var getQuery = function(request)
{
	return querystring.parse(url.parse(request.url).query);
}

var handle = function(request,response,controller)
{
	// convention: http://www.myapi.com/uploadPhotos => function actionUploadPhotos
	var pathname = (url.parse(request.url).pathname).replace(/^\/(.*)/,'$1');
	var conventional_pathname = pathname[0].toUpperCase();
	if( pathname.length > 1 )
	{
		conventional_pathname = pathname[0].toUpperCase() + pathname.slice(1);
	}
	var action_name = 'action' + conventional_pathname;
	// if the handler exists, run it
	if( typeof(controller[action_name]) === 'function' )
	{
		console.log('Routing to handler:' + action_name);
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
				controller[action_name](request,response);
			});
		}
		else
		{
			controller[action_name](request,response);
		}
	}
	else
	{
		controller.actionNotFound(response,pathname);
	}
}

exports.handle = handle;
