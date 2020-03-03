var express = require('express');
var path = require('path');
// var favicon = require('static-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(favicon());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); ///*JS client side files has to be placed under a folder by name 'public' */

// app.use('/', routes);
// app.use('/users', users);

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });




// app.get('/about:data',(req,res)=>{
//     res.send("about")
// })
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.post('/login', urlencodedParser,function(req,res){
//     console.log(req.body)
//     res.render('login',{qs:req.query});

// })
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo' ,{ useNewUrlParser: true }, error => {
    if(error){
        console.log("Error : Server not connecting");
        console.log(JSON.stringify(error))
    } 
    else {
        console.log("Successfully Connected");
    }
});
const studentdet=require('./models/studentdet').student;

var http=require("http")
var stud=[];
 /*
    add the new data 
    @param {} ,
    */
app.post('/api/stu', function(req, res){
// console.log(req.body)
    studentdet.find({fname:req.body.fname,dob:req.body.dob},function(err,docs){
       console.log(docs)
       console.log(docs.length) 
     if (docs&&docs.length) {

        res.status(200).json({"dup":"duplicate value"})
    }
    else{

        let newStudent= new studentdet();
        newStudent.fname=req.body.fname;
        newStudent.lname=req.body.lname;
        newStudent.dob=req.body.dob;
        newStudent.mail=req.body.mail;
        newStudent.phn=req.body.phn;
        newStudent.gender=req.body.gender;
        newStudent.area=req.body.area;
        newStudent.place=req.body.place;
        newStudent.save(function(err, docs){
         if(err){

            res.status(500).json({"error": err});
         }

        else {
            console.log("Data Saved Successfully")
            console.log(docs)
            res.status(200).json({data:docs});
        }

        })
    }
    })
});

 /*
    view the all data from db.
    @param {} ,
    */
app.get("/api/find",function(req,res){
    var query=req.params.fname;
    studentdet.find({},function(err,docs){
        console.log(docs.length)
        if(err){
            
            res.status(500).json({"error":err});
        }
        else{
            
        console.log("data saved Successfully")
        res.status(200).json({data:docs});
        }
    })    
});
 /*
    edit and update the data.
    @param {} ,
    */

app.post('/api/update',function(req,res){
    console.log("113")
    console.log(req.body)
   studentdet.update({"_id":req.body._id},
        {$set:{"fname":req.body.fname,
                "lname":req.body.lname,
                "dob":req.body.dob,
                "mail":req.body.mail,
                "phn":req.body.phn,
                "gender":req.body.gender,
                "area":req.body.area,
                "place":req.body.place   

               } 
        },function(err,docs){
            if(err){
                console.log(err)
                res.status(500);
            }else{
                    console.log("Data updated Successfully")
                    console.log(docs)
                    res.status(200).json({data:docs})
                 }
        }

        );
    

});
 /*
    delete the row value
    @param {} ,
    */

app.get("/api/del/:id",function(req,res){

    studentdet.remove({_id:req.params.id},function(err,docs){
        if(err){
            res.status(500).json({"error": err});
        }else{
            console.log("delete")
            res.status(200).json({data:docs});
        }
    })
    
});
app.listen(2000);
console.log("app lsitening on port 2000")
module.exports = app;
