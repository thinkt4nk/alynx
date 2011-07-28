var server = require('./server.js');
var router = require('./router.js');
var Controller = require('./controller').Controller;

var controller = new Controller();
// HANDLERS
controller.actionTestForm = function(request,response)
{
	if( typeof(request.POST) !== 'undefined' )
	{
		console.log(request.POST);
		this.redirect(response,'/testForm');
	}
	else
	{
		// output form
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write('<html><head></head><body><form action="" method="POST"><label>name</label><input name="name" type="text" /><br /><label>age</label><input type="text" name="age" /><br /><input type="submit" value="Submit" /></form></body></html>');
		response.end();
	}
};

server.start(router.route,controller);
