//--------------------------- DEPENDENCYS -------------------------------------------------------/
var firewall = require("./../middlewars/firewall").firewall();;
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var kit = require('./../models/kit');
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
        	kit.find({}, (err, results) => {
	        res.render('market', {'kits' : results, 'isAdmin' : firewall.isAdmin(req.user.local.role)});
	    });
        }
	    
	    
	}
	
	function showKit(req , res)
	{
	    var tmpKit = new kit();
	    tmpKit.findWithProducts(req.params.id, function(err, data){
	         res.render("showKit", {'data' : data, 'isAdmin' : firewall.isAdmin(req.user.local.role)});
	    });
	   
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
		showKit : showKit,
		showProduct : showProduct
	}
}