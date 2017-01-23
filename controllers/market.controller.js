//--------------------------- DEPENDENCYS -------------------------------------------------------/
var firewall = require("./../middlewars/firewall").firewall();;
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var product = require('./../models/product');
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	function index(req ,res)
	{
		if(req.session.redirect)
        {
            res.redirect(req.session.redirect);
        }else
        {
        	product.find({}, (err, results) => {
	        res.render('market', {'products' : results,
	       // 'isAdmin' : firewall.isAdmin(req.user.local.role),
	        'sessionCart' : (req.session.cart && req.session.cart.length > 0) 	
	        	
	        }
	        
	        );
	    });
        }
	    
	    
	}
	

	function showProduct(req, res)
	{
	    product.findById(req.params.id, function(err, data){
	    	res.render("showProduct", {'data' : data});
	    });
	}
	
	return {
	    index : index,
		f404 : f404,
		showProduct : showProduct
	}
}