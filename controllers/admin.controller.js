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
	
	function functionCreateProduct(req, res)
	{
		res.render('createProduct');
	}
	
	function postCreateProduct(req ,res)
	{
		async.parallel([
			function(callback)
			{
				var tmpProduct = new product({
				   name : req.body.product_name,
				   description : req.body.product_description,
				   image : '/images/products/' + req.files.product_file.name
				});
				tmpProduct.save(callback);
			},
			function(callback)
			{
				req.files.product_file.mv('views/images/products/' + req.files.product_file.name, function(err){
						 	if(err){
						 		callback("00001", null);
						 	}
						 	else 
								callback(null, null);
						 });
			}
			], 
		
		
		function(err, results){
			res.redirect('/admin');
		});
	}
	
	function postCreateKit(req, res)
	{
		/*console.log(req.body);
		console.log(req.files);
		console.log(req.body.product);*/
		//	for(var i = 0 ; i < req.body.length ; i++)
	
	
	     async.parallel([
			function(callback)
			{
				var arrayResult = new Array();
				for(var elem in req.body )
				{
						
						if(elem.startsWith("product."))
						 {
						 	arrayResult.push(req.body[elem]);
						 }
				}
						
						
			 var newKit = new kit({
					price : req.body.kit_price,
					name  :  req.body.kit_name,
					description : req.body.kit_description,
					products : arrayResult ,
					image : '/images/kit/' + req.files.kit_file.name
				});
                newKit.save(callback);
			},
			function(callback)
			{
				req.files.kit_file.mv('views/images/kits/' + req.files.kit_file.name, function(err){
						 	if(err){
						 		callback("00001", null);
						 	}
						 	else 
								callback(null, null);
						 });
			}
			], 
		
		
		function(err, results){
			res.redirect('/admin');
		});
		
	}
	
	
	return {
		index : index,
		createKit : createKit,
		postCreateKit : postCreateKit,
		functionCreateProduct : functionCreateProduct,
		postCreateProduct : postCreateProduct
	}
}