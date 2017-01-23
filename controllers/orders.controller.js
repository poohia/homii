//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async  = require("async");
var firewall = require("./../middlewars/firewall").firewall();
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var kit = require("./../models/product");
var order = require("./../models/order");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	// step 1
	function index(req ,res)
	{
		if(!req.session.cart)
		{
			res.redirect('/market');
		}
		else
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
	    	req.session.redirect = "/order";
	           res.render("tunnel/step1", {
        	        'TVA' : '0.2',
        	        'kits' :  results,
        	        'isUser' : firewall.isUser(req.user.local.role),
        	        'user' : req.user,
        	        'step' : 1
	            });
		   });
		}
		
	
	}
	function cancelOrder(req, res)
	{
		req.session.redirect = null;
		res.redirect('/market');
	}
	function step2(req, res)
	{
		if(!req.session.cart)
		{
			res.redirect('/market');
		}
		else
		{
			req.session.redirect = "/order/step/2";
			res.render('tunnel/step2',
			 {
			 	'step' : 2
			 }
						);
		}
	}
	function postStep2(req , res)
	{
		var tmpOrder = new order({
			user : req.user._id,
			kits : new Array(),
			address : {
				nom : req.body.name,
				prenom : req.body.last_name,
				rue : req.body.rue,
				code_postal : req.body.code_postal,
				ville : req.body.ville,
				pays : req.body.pays,
				complement : (req.body.complement) ? req.body.complement : '',
				
			},
			step : 2,
			price : 0,
		});
		async.parallel([
			// ajout des kits
			function(callback)
			{
				for(var i = 0 ; i < req.session.cart.length ; i++)
				{
					for(var j = 0 ; j < req.session.cart[i].count ; j++ )
					{
						tmpOrder.kits.push(req.session.cart[i].id);	
					}
				}
				callback(null, null);
			},
			// calcul le prix
			function(callback)
			{
				async.map(req.session.cart, function(spool, done){
				  kit.findById(spool.id, function(err, result){
				  	for(var i = 0 ; i < spool.count ; i++)
				  		tmpOrder.price +=  parseInt(result.price) ;
				  	done(err, result);
				  });	
				},callback);
			}
			],
		
		
		function(err, result){	
		  tmpOrder.save(function(err){
			   		res.redirect('/order/step/3/' + tmpOrder._id);
			   });
		});
		

		
	}
	
	function step3(req, res)
	{
		order.findById(req.params.id ,  function(err, result){
				if(result.user.equals(req.user._id) && result.step === 2)
				{
					res.render('tunnel/step3', {
						'order' : result,
						'step'  : 3
					});
				}
				else
				{
                   req.session.redirect = null;
			       res.status(403).redirect('/home');
				}
		});
	}
	function postStep3(req, res)
	{
	 order.findById(req.params.id, function(err, result){
	 	if(result.user.equals(req.user._id) && result.step === 2)
	 	{
	 		result.step = 3;
	 		result.save();
	 		res.redirect('/order/payment/success');
	 	}
	 	else
	 	{
	 		req.session.redirect = null;
			res.status(403).redirect('/home');
	 	}
	 })
	 };
	 function paySuccess(req, res)
	 {
	 	req.session.redirect = null;
	 	req.session.cart = undefined ;
	 	res.render('paySuccess');
	 }
	 
	return {
		f404 : f404,
		index: index,
		step2 : step2,
		cancelOrder : cancelOrder,
		postStep2 : postStep2,
		step3 : step3,
		postStep3 :postStep3,
		paySuccess : paySuccess
	}
}