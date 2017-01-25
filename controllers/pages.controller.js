/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mailchimp = require("./../modules/mailchimp")();
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var newsLetter = require('./../models/newsLetter');
var post       = require('./../models/post');
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
			res.render('index',{'flashMessage' : req.flash("message"),
				'error' : req.query.error,
				'valid' : req.query.valid
			});
        }
	}
	function home(req, res)
	{
		if(req.session.redirect)
        {
            res.redirect(req.session.redirect);
        }
        else
        {
        	post.find().limit(3).exec({},function(err, results){
        		res.render('home',{'flashMessage' : req.flash("message"),
				'error' : req.query.error,
				'valid' : req.query.valid,
				'articles' : results,
				'sessionCart' : (req.session.cart && req.session.cart.length > 0) 
				});
        	});
        }
	}
	
	function saveNewsLetterHome(req, res)
	{
		if(req.body.email_newsletter && req.body.email_newsletter !== "")
		{
			console.log(req.body.email_newsletter);
			newsLetter.find({'email' : req.body.email_newsletter},function(err, result)
				{
					if(result.length == 0)
					{
						var newNewsLetter = new newsLetter({
							email : req.body.email_newsletter
						});
						newNewsLetter.save();
                        mailchimp.addSubscriber(req.body.email_newsletter);
						res.redirect('/home?valid=emailSaved#newsletter');
					}
					else
					{
							res.redirect('/home?error=emailExist#newsletter');
					}
				})
			
		}
		else
		{
			res.redirect('/home?error=emailInvalide#newsletter');
		}
	
	}
	function saveNewsLetter(req, res)
	{
		if(req.body.email_newsletter && req.body.email_newsletter !== "")
		{
			console.log(req.body.email_newsletter);
			newsLetter.find({'email' : req.body.email_newsletter},function(err, result)
				{
					if(result.length == 0)
					{
						var newNewsLetter = new newsLetter({
							email : req.body.email_newsletter
						});
						newNewsLetter.save();
                        mailchimp.addSubscriber(req.body.email_newsletter);
						res.redirect('/?valid=emailSaved#newsletter');
					}
					else
					{
							res.redirect('/?error=emailExist#newsletter');
					}
				})
			
		}
		else
		{
			res.redirect('/?error=emailInvalide#newsletter');
		}
	
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
			res.render('login',{        	        'connexionEchec' : req.flash("connexionEchec"),
        	        'emailUsed' : req.flash("emailUsed"), 'valueFail' :  req.flash("valueFail"), });
	}
	
	
	return {
		index : index,
		f404 : f404,
		dashboard : dashboard,
		login : login,
		saveNewsLetter: saveNewsLetter,
		home : home,
		saveNewsLetterHome : saveNewsLetterHome
	}
}