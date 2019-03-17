var passport = require("passport");
var model = require("../model/index");
var bcrypt = require("bcrypt");
var joi = require("joi");
const key = require("../key.js");

var collection = {};

collection.generalInfo = function (req, res, next) {
    console.log(req.body);
    console.log("here 2")
  
  var organization= new model.organization({
    organizationName:req.body.organizationName,
    superAdminId:key.superAdmin.id,
    taxId:req.body.taxId,
    NumberOfEmployee:req.body.noemp,
    registrationNumber:req.body.regno,
    contact:req.body.contact,
    address:req.body.address  	

  });
 
    model.organization.create(organization,function(err,result){
    	if(err){
    		console.log(err)
    	}
    	else{

    		res.redirect('/generalInfo');
    	}

    });
}


collection.getGeneralInfo=function(req,res,next){
  
  model.organization.findOne({superAdminId:key.superAdmin.id},function(err,result){
   if(err){
  console.log(err);
   }else{
   	console.log(result);
     res.render('generalInformation',{data:result});
   }
     
  })
   }
   
collection.getLocation=function(req,res,next){
  
  model.organization.findOne({superAdminId:key.superAdmin.id},function(err,result){
   if(err){
  console.log(err);
   }else{
   	console.log(result);
     res.render('getLocation',{data:result});
   }
     
  })
   }

collection.postLocation=function(req,res,next){
  

    var location= new model.organization({
    name:req.body.name,
    city:req.body.city,
    noOfEmployees:req.body.noOfEmployees,
    country:req.body.country,
    phone:req.body.contact 	

  });
    console.log(location);
 
    model.organization.findOneAndUpdate({superAdminId:key.superAdmin.id},{$push:{locations:location}},function(err,result){
    	if(err){
    		console.log(err)
    	}
    	else{
    		console.log(result);

    		res.redirect('/location');
    	}

    });



   }




module.exports = collection;