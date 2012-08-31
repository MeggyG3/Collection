/**
 * Created with JetBrains WebStorm.
 * User: yao
 * Date: 12-8-31
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */
var now = new Date();
//var jsdom = require('jsdom');
//
//jsdom.env('http://soufun.com/house/web/Search_Result.php', [
//    'http://code.jquery.com/jquery-1.8.0.min.js'
//],
//    function (errors, window) {
//        //console.log('本页有', window.$('div .searchListNoraml').length, '篇文章');
//        var d = window.$('div .searchListNoraml');
//     //   console.log("==="+d.html());
//        for(var i=0;i< d.length;i++){
//           var colHTML = d[i].innerHTML;
//        }
//
//        var time = new Date().getTime() - now.getTime();
//        console.log('耗时：' + time + 'ms');
//    });

var $ = require('jquery');
var http = require('http');

var options = {
    host:'soufun.com',
    port:80,
    path:'/house/%B1%B1%BE%A9_________________3_.htm'

};
Itemc =function(){
};
var items = new Array();
var html ='';

http.get(options, function (res) {
    res.on('data',function (data) {
        html += data;
    }).on('end', function () {
            var dom = $(html);
            var now = new Date();
            console.log('本页有', dom.find('div .searchListNoraml').length, '篇文章');
                    var d =dom.find('div .searchListNoraml');
     //   console.log("==="+d.html());
        for(var i=0;i< d.length;i++){
            var colHTML = d[i].innerHTML;
            var dom1 = $(colHTML);


           var item = new Itemc();

           var name =dom1.find("div.name").text();
           var price = dom1.find("div.price").find("span").html();
           var address =  dom1.find("font").html();
            console.log(""+name);

            item.title=trim(name);
            item.price = price;
            item.address=trim(address);

            items[i]=item;
            var Db = require('mongodb').Db;
            var Server = require('mongodb').Server;
            var db=new Db('test',new Server('210.72.21.94',27017,{auto_reconnect:true}, {}));
            db.open(function(){
                console.log('db opened');
                db.collection('my_users',function(err,collection){
                    if (err) callback(err);
                    collection.insert(items,{safe:true},function(err,docs){
                        //console.log(docs[0]._id);
                    });
                });
            });

        }
            console.log(items.length);
            console.log('耗时：' + (new Date().getTime() - now.getTime()) + 'ms');
        });
});

function trim(str){

    var SubStr;
    SubStr=str;
    while (SubStr.length>0) {
        if (SubStr.charAt(0)==" "){
            SubStr=SubStr.slice(1);
        }else{
            break;
        }
    }
    while (SubStr.length>0) {
        if (SubStr.charAt(SubStr.length-1)==" "){
            SubStr=SubStr.substr(0,SubStr.length-1);
        }else{
            break;
        }
    }
    return SubStr;
}