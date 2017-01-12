/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var paypal = require("./../modules/paypal")();
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var newsLetter = require('./../models/newsLetter');
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function index(req, res)
	{
	    if(req.session.redirect)
        {
            res.redirect(req.session.redirect);
        }
        else
        {
		
			res.render('index',{'flashMessage' : req.flash("message")});
        }
	}
	function saveNewsLetter(req, res)
	{
		var newNewsLetter = new newsLetter({
			email : req.body.email
		});
		newNewsLetter.save();
		res.redirect('/');
	}
	function dashboard(req, res)
	{
		res.render('dashboard',{'user' : req.user});
	}
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	function login(req ,res)
	{
		//console.log(req.user);
			res.render('login',{'flashMessage' : req.flash("message")});
	}
	
	
	return {
		index : index,
		f404 : f404,
		dashboard : dashboard,
		login : login,
		saveNewsLetter: saveNewsLetter
	}
}