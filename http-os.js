var http = require('http');
var os = require('os');

//config
var port = 8899;
var updateRate = 1000; //how often the time series gets updated (in ms)
var timeSeriesSize = 50; //how many entries the timeSeries can hold
var logToConsole = false; //should app-startup & pushes to timeSeries be logged to the console? 

//time series holds osData over time
var timeSeries = [];

var refreshTimeSeries = function (){
    if(timeSeries.length>=timeSeriesSize){
        timeSeries.shift();
    }
    timeSeries.push(getOsData());
    if(logToConsole){
        console.log(getDateTime() + " pushed new data to time series.");
    }
};

var getOsData = function() {
    var osData = {
        time: {
            full: getDateTime(),
            hour: getDateTimeHour(),
            day: getDateTimeDay()
        },
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform(),
        uptime: os.uptime(),
        mem: {
            free: os.freemem(),
            freePercent: calcPercent(os.freemem(),os.totalmem()),
            total: os.totalmem()
        },
        cpus: os.cpus(),
        loadavg: os.loadavg()
    };

    return osData;
};

var calcPercent = function(a,b){
    return ((a / b) * 100).toFixed(1);
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

function getDateTimeHour() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
};

function getDateTimeDay() {
    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "." + month + "." + year + ".";
};

//init app
var app = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //send timeSeries as json data
    res.end(JSON.stringify(timeSeries,null,4));
});

//startup app
if(logToConsole){
    console.log("node-http-os listening on port " + port);    
}
app.listen(port);

//start interval in which time series gets updated (+ first initial push to time series)
refreshTimeSeries();
setInterval(function() {
    refreshTimeSeries();
}, updateRate);