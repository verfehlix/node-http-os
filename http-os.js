var http = require('http');
var os = require('os');

//config
var port = 8899;
var updateRate = 10000; //how often the time series gets updated (in ms)
var timeSeriesSize = 2; //how many entries the timeSeries can hold

//time series holds osData over time
var timeSeries = [];

var refreshTimeSeries = function (){
    if(timeSeries.length>=timeSeriesSize){
        timeSeries.shift();
    }
    timeSeries.push(getOsData());
    console.log(getDateTime() + " pushed new data to time series.");
};

var getOsData = function() {
    var osData = {
        time: getDateTime(),
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
        uptime: os.uptime(),
        mem: {
            free: os.freemem(),
            freePercent: ((os.freemem() / os.totalmem()) * 100).toFixed(2),
            total: os.totalmem()
        },
        cpus: os.cpus(),
        loadavg: os.loadavg()
    };

    return osData;
};

function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min + ":" + sec + " - " + day + "." + month + "." + year + ".";
};

//init app
var app = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    //send timeSeries as json data
    res.end(JSON.stringify(timeSeries, null, 4));
});

//startup app
console.log("node-http-os listening on port " + port);
app.listen(port);

//start interval in which time series gets updated (+ first initial push to time series)
refreshTimeSeries();
setInterval(function() {
    refreshTimeSeries();
}, updateRate);