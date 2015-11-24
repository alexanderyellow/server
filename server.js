var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var pg = require('pg'); // postgre include
var conString = "postgres://postgres:yellow@localhost:5432/testdb";
var bodyParser = require("body-parser"); // Body parser for fetch posted data

var client = new pg.Client(conString);
client.connect(function(err) {

    if(err) {
        return console.error('could not connect to postgres', err);
    }
    console.log('connected');
  /*  client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].theTime);
        //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        client.end();
    }); */
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

app.get('/book',function(req,res){
    console.log('get request');
    var data = {
        "error":1,
        "Books":""
    };

    client.query("SELECT * from book",function(err, rows){
        if(rows.length != 0){
            data["error"] = 0;
            data["Books"] = rows;
            res.json(data);
        }else{
            data["Books"] = 'No books Found..';
            res.json(data);
        }
    });
});

app.listen(3000);