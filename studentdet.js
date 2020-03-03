 var mongoose = require('mongoose');
var Schema = mongoose.Schema;


 /*var studentSchema = new Schema({
 	fname: String,
    lname: String,
    dob	 : Number,
    gender : String,
    mail : String,
    phn :Number,
    area : String.
    place: String
 });*/

 var studentSchema = new Schema({
	fname : {type: String},
	lname : {type: String},
	dob: {type: Date},
	gender : {type:String},
	mail:{type:String},
	phn : {type:Number},
	area :{type:String},
	place:{type:String}
});

 var student=mongoose.model('STUD',studentSchema);//linking schema and collection
 module.exports={student};
 