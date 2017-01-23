//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async = require("async");
var paypal = require("./../modules/paypal")();
var randtoken = require('rand-token');
const util = require('util');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var order = require("./../models/order");
var product = require("./../models/product");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	var tax = {
	    value : 0.7,
	    string : "0.7"
	};
	
	function pay(req, res)
	{
	    if(req.body.order)
	    {
	        order.findById(req.body.order, function(err, result){
            	if(result.user.equals(req.user._id) && result.step === 2)
            	{
            	    result.token = randtoken.generate(16);
            	    result.save();
            	    paypal.connect(function(){
            	    createDataForPaypal(result, (objectPaypal) => {
            	    	objectPaypal.redirect_urls = new Object() ;
            	        objectPaypal.redirect_urls.return_url = "https://homii-jordanazoulay.c9users.io/paypal/payment/sucess/" + result.token;
            	        objectPaypal.redirect_urls.cancel_url = "https://homii-jordanazoulay.c9users.io/paypal/payment/fail/" + result.token;
            	        paypal.payTmp2(objectPaypal, objectPaypal.redirect_urls.cancel_url, (url) => {
            	        		res.redirect(url);
            	        });
            	    /*    paypal.payTmp("https://homii-jordanazoulay.c9users.io/paypal/payment/success/" + result.token,
            	        "https://homii-jordanazoulay.c9users.io/paypal/payment/fail/" + result.token,
            	        (url) => {
            	        	res.redirect(url);
            	        });*/
            	    });
            	    });
            	    
            	}
            	else
            	{
            	   res.status(403).redirect('/home');
            	}
	        });
	    }
	    else
	    {
	        res.status(403).redirect('/home');
	    }
	}
	
	function createDataForPaypal(order, callback)
	{
	    var price = parseInt(order.price) ;
	    var data  = new Object();
	    data.transactions = new Array();
	    
	    var t = new Object();
	
	    t.amount = new Object();
	    t.amount.total = price + (tax.value * order.kits.length);
	    t.amount.currency = "EUR";
	    
	    t.amount.details = new Object();
	    t.amount.details.subtotal = order.price;
	    t.amount.details.tax = tax.value * order.kits.length;
	    
	    t.description = "This is the payment transaction description.";
	    t.custom = "EBAY_EMS_90048630024435";
	    t.invoice_number= "48787589673";
	    
	   t.payment_options = new Object();
	   t.payment_options.allowed_payment_method = "INSTANT_FUNDING_SOURCE";
	   
	   t.soft_descriptor = "ECHI5786786";
	    
	    data.transactions.push(t);
	    
	    var t2 = new Object();
	    t2.item_list = new Object();
	    t2.item_list.items = new Array();
	    
	    async.map(order.kits, function(spool, done){
	        product.findById(spool, function(err, result){
	            var item = new Object();
	            item.name = result.name;
	            if(result.product_type == 1 )
	            {
	            	item.description = "BORNE HOMII";
	            }else if(result.product_type == 2 )
	            {
	            	item.description = "STICK POUR BORNE HOMII";
	            }else if(result.product_type == 3)
	            {
	            	item.description = "Frontier Stove Anevay";
	            }
	            
	            item.quantity = "1";
	            item.price = result.price;
	            item.tax = tax.string;
	            item.sku = "1";
	            item.currency = "EUR";
	            t2.item_list.items.push(item);
	            done();
	        });
	    }, () => {
	        data.transactions.push(t2);
	         callback(data);
	    });
	}
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	function paymentFail(req, res)
	{
		req.session.redirect = null ;
		req.session.cart = undefined ;
		order.findOne({ 'token' : req.params.id }, function(err, result){		
		 if(result)
		 {
			  result.token = '' ;
			  result.step = 3 ;
			  result.save();
			  res.render('tunnel/paymentFail',
			  {
			  	'step' : 3
			  });
		 }
		 else
		 {
		 	res.redirect('/');
		 }
		});
	}
	
	function paymentSuccess(req, res)
	{
		req.session.redirect = null ;
		req.session.cart = undefined ;
		order.findOne({ 'token' : req.params.id }, function(err, result){		
		 if(result)
		 {
			  result.token = '' ;
			  result.step = 3 ;
			  result.save();
			  res.render('tunnel/paySuccess',
			  {
			  	'step' : 3
			  });
		 }
		 else
		 {
		 	res.redirect('/');
		 }
		});
	}
	
	return {
		f404 : f404,
		pay : pay,
		paymentFail : paymentFail,
		paymentSuccess : paymentSuccess
	}
}