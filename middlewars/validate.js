/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

module.exports = {
    start: function(req, res, next){

    	module_validate.getValid(req, res, next);
    	
    },
    validate : function(){
    	return module_validate;
    }
};

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var validator  = require("./../views/common_modules/validate.module");
var response =  require("./../modules/response")();
//---------------------------------------------------------------------------------------------/

var module_validate = function(){
	'use strict';
 	
 	function getValid(req, res, next)
 	{

 		var isValid = true ; 
 		var body = req.body;
 		
 		/*** RULES  for validate body **********/
 		
 		if(body.email !== undefined)
 		{
 			(validator.email(body.email))? '' : isValid = false;
 		}
 		if(body.password !== undefined)
 		{
 			(validator.password(body.password))? '': isValid = false;
 		}
 		if(body.name !== undefined)
 		{
 			(validator.no_Empty(body.name))? '' : isValid = false;
 		}
 		if(body.mobile !== undefined)
 		{
 			(validator.only_Number(body.mobile))? '' : isValid = false;
 		}
 		if(body.sexe !== undefined)
 		{
 			(validator.sexe(body.sexe))? '' : isValid = false ;
 		}
		
		if(body.last_name !== undefined)
		{
			(validator.no_Empty(body.last_name))? '' : isValid = false ;
		}
		if(body.rue !== undefined)
		{
			(validator.no_Empty(body.rue))? '' : isValid = false ;
		}
		if(body.code_postal !== undefined)
		{
			(validator.french_Code_Postal(body.code_postal))? '' : isValid = false ;
		}
		if(body.ville !== undefined)
		{
			(validator.no_Empty(body.ville))? '' : isValid = false ;
		}
		if(body.pays !== undefined)
		{
			(validator.no_Empty(body.pays))? '' : isValid = false ;
		}
		
 		if(body.token !== undefined)
 		{
 			(!validator.no_Empty(body.token))? '' : isValid = false;
 		}
 
 		/************************************/
 		if(isValid)
		{
			next();
		}
		else
		{
			if(req.body.lastUrl)
		      {
		      	 req.flash('valueFail', 'Les valeurs sont incorrectes.')
		      	res.status(400).redirect(req.body.lastUrl);
		      	
		      }
		    else if(req.session.redirect)
			{
				res.status(400).redirect(req.session.redirect);
			}
			else
			{
				res.status(400).redirect('/');
			}
		//	response.responseBadRequest(res);
		}
 	}

	return {
		getValid: getValid
	}

}();



