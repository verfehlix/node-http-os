var http = require('http');
var os = require('os');

var port = 8899;

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');

    var osData = {
    	hostname: os.hostname(),
    	type: os.type(),
    	platform: os.platform(),
    	uptime: os.uptime(),
    	mem: {
    		free: os.freemem(),
    		freePercent: ((os.freemem() / os.totalmem())*100).toFixed(2),
    		total: os.totalmem()
    	},
    	cpus: os.cpus(),
    	loadavg: os.loadavg()
    };

    res.end(JSON.stringify(osData, null, 4));
});
console.log("node-http-os listening on port " + port);
app.listen(port);