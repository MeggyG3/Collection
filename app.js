
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , ejs=require('ejs')
    , fs = require('fs')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 4000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.logger({stream: fs.createWriteStream('./myLogFile.log', {flags: 'a'})}))

});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
//TODO 储存后并查询出来。
app.get('/saveHouseInfos', function (req, res) {
    var house={};
    house.name='1';
    house.vendor = '22';
    house.price = '';

    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
    db.open(function(){
        console.log('db opened');
        db.collection('house_info',function(err,collection){
            if (err) callback(err);
            collection.insert(house,{safe:true},function(err,docs){
                console.log(docs[0]._id);
                res.redirect('showHouseInfos');
            });
        });
    });
//    res.end();
});

app.get('/show',function(req,res){
    var users=[];

    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
    db.open(function(){
        db.collection('house_info',function(err,collection){
            if (err) callback(err);
            collection.find({}).toArray(function(err,docs){
                if (err) callback(err);
                console.log(docs);
                res.send(docs);
                res.end();
            });
        });
    });
});

app.post('/showHouseInfos',function(req,res){
    var users=[];

    var db=new Db('test',new Server('localhost',27017,{auto_reconnect:true}, {}));
    db.open(function(){
        db.collection('house_info',function(err,collection){
            if (err) callback(err);
            collection.find({}).toArray(function(err,docs){
                if (err) callback(err);
                console.log(docs);
//                res.send('hello:'+docs);
//                res.end();
            });
        });
    });
    res.send('hello:');
    res.end();
});