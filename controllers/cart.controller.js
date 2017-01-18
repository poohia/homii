//--------------------------- DEPENDENCYS -------------------------------------------------------/
var response = require("./../modules/response")();
var async  = require("async");
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var kit = require("./../models/product");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function removeCart(req, res)
	{
	    var isExist = {
	        test :    false
	        };
	    var id = req.params.id;
	     for(var i = 0 ; i < req.session.cart.length ; i++)
	     {
	         if(req.session.cart[i].id === id )
               {
                   isExist.test = true;
                   isExist.id = i;
               }
	     }
	     if(isExist.test)
	     {
	         req.session.cart.splice(isExist.id, 1);
	         response.responseJson(res, {"action" : "ok"});
	     }
	     else
	     {
	         response.badRequestJson(res, {"MESSAGE" : "Le kit que vous essayez de supprimer n'est plus dans votre panier"});
	     }
	}
	
	function addCart(req , res)
	{
	    var id = req.params.id;
	    kit.findById(id, function(err, result)
	    {
	        
	       if(!result)
	       {
	           response.badRequestJson(res, {"MESSAGE" : "Il n'y a que les kit qui peuvent être ajouter au panier"});
	       }
	       else
	       {
	           if(req.session.cart === undefined )
            	    {
            	          req.session.cart = new Array();
            	          var produit = {
            	              id : id,
            	              count : 1
            	          };
            	          req.session.cart.push(produit);
            	          
            	    }
            	    else
            	    {
            	        var isExist = {
            	            test : false
            	        };
            	        for(var i = 0 ; i < req.session.cart.length ; i++)
            	        {
            	              if(req.session.cart[i].id === id )
            	               {
            	                   isExist.test = true;
            	                   isExist.id = i;
            	               }
            	        }
            	        if(isExist.test)
            	        {
            	            req.session.cart[isExist.id].count += 1;
            	        }
            	        else
            	        {
            	          var produit = {
            	              id : id,
            	              count : 1
            	          };
            	          req.session.cart.push(produit);
            	        }
            	    }
            	   
            	     response.responseJson(res, {"action" : "ok"});
	       }
	    });
	    
	}
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	function index(req, res)
	{
	    async.map(req.session.cart, function(spool, done){
	        kit.findById(spool.id, function(err, result){
	       // result.count = req.session.cart[result._id].count;
            for(var i = 0 ; i < req.session.cart.length ; i++)
            {
                 if(req.session.cart[i].id == result._id)
                {
                    result.count = req.session.cart[i].count;
                    break;
                }
            }
            done(err, result);
	        });
	    }, function(err, results){
	           res.render("cart", {
        	        'TVA' : '0.2',
        	        'kits' :  results
	            });
	    });
	 
	}
	
	
	
	return {
		f404 : f404,
		addCart : addCart ,
		index: index,
		removeCart : removeCart
	}
}