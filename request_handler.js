var querystring = require('querystring');
var url = require('url');

var ok = function(response,message)
{
	response.writeHead(200,{'Content-Type':'text/plain'});
	if( typeof(message) !== 'undefined' )
	{
		response.write(message);
	}
	response.end();
};
var getQuery = function(request)
{
	return querystring.parse(url.parse(request.url).query);
};


// HANDLERS
var actions = {
	status : function(request,response)
	{
		var query = getQuery(request);
		console.log(query);
		ok(response,'status');
	},
	uploads : function(request,response)
	{
		var query = getQuery(request);
		console.log(query);
		ok(response,'uploads');
	}
};

var handle = function(request,response)
{
	var pathname = (url.parse(request.url).pathname).replace(/^\/(.*)/,'$1');
	if( typeof(actions[pathname]) === 'function' )
	{
		console.log('Routing to handler:'+ pathname);
		actions[pathname](request,response);
	}
	else
	{
		console.log('Could not find the requested action:' + pathname);
		response.writeHead(404,{'Content-Type':'text/plain'});
		response.end();
	}
}

exports.handle = handle;
