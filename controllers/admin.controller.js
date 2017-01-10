/**
* \file
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async = require("async");

var response = require("./../modules/response")();
const assert = require('assert');
require('mpromise');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var product = require('./../models/product');
var kit = require('./../models/kit');
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function index(req, res)
	{
	   // console.log(req.user);
		res.render('admin',{'flashMessage' : req.flash("message")});
	}


	function createKit(req, res)
	{
		product.find({}, (err, results)=>{
		
	//	res.render('createKit',{'flashMessage' : req.flash("message"), 'products' : results});
			res.render('createKit', {'products' : results});	
		});
	  /*var query = 	product.find();
	  assert.ok(!(query instanceof require('mpromise')));

    // A query is not a fully-fledged promise, but it does have a `.then()`.
    query.then(function (doc) {
    //	console.log(doc);
    
    	 res.render('createKit',{'flashMessage' : req.flash("message"), 'products' : doc});
    });   
	  /*query.then(function(results) {
		   	res.render('createKit',{'flashMessage' : req.flash("message"), 'products' : results});
		});*/
	
	}
	
	function postCreateKit(req, res)
	{
		var newKit = new kit({
			price : req.body.price,
			name  :  req.body.name,
			description : req.body.informations,
			products : req.body.product 
		});
		newKit.save();
		
		res.redirect('/admin');
		
	}
	
	
	return {
		index : index,
		createKit : createKit,
		postCreateKit : postCreateKit,
	}
}