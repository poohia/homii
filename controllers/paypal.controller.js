//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async = require("async");
var paypal = require("./../modules/paypal")();
var randtoken = require('rand-token');
const util = require('util')
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var order = require("./../models/order");
var kit = require("./../models/kit");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	var tax = {
	    value : 0.7,
	    string : "0.7"
	};
	
	function pay(req, res)
	{
	    console.log("i'm here");
	    if(req.body.order)
	    {
	        order.findById(req.body.order, function(err, result){
            	if(result.user.equals(req.user._id) && result.step === 2)
            	{
            	    result.token = randtoken.generate(16);
            	    result.save();
            	    paypal.connect(function(){
            	    createDataForPaypal(result, (objectPaypal) => {
            	       /* objectPaypal.redirect_urls = new Object();
            	        objectPaypal.redirect_urls.return_url = "https://homii-jordanazoulay.c9users.io/paypal/payment/sucess/" + result.token;
            	        objectPaypal.redirect_urls.cancel_url = "https://homii-jordanazoulay.c9users.io/paypal/payment/fail/" + result.token;
            	        
            	        console.log(util.inspect(objectPaypal, {showHidden: false, depth: null}));*/
            	        paypal.payTmp("https://homii-jordanazoulay.c9users.io/paypal/payment/success/" + result.token,
            	        "https://homii-jordanazoulay.c9users.io/paypal/payment/fail/" + result.token,
            	        (url) => {
            	        	res.redirect(url);
            	        });
            	    });
            	    });
            	    
            	}
            	else
            	{
            	   res.status(403).redirect('/');
            	}
	        });
	    }
	    else
	    {
	        res.status(403).redirect('/');
	    }
	}
	
	function createDataForPaypal(order, callback)
	{
	    var price = parseInt(order.price) ;
	    var data  = new Object();
	    data.transactions = new Array();
	    
	    var t = new Object();
	
	    t.amount = new Object();
	    t.amount.total = price + ((price * tax.value) / 100 );
	    t.amount.currency = "EUR";
	    
	    t.amount.details = new Object();
	    t.amount.details.subtotal = order.price;
	    t.amount.details.tax = tax.string;
	    t.amount.details.shipping = "0";
	    t.amount.details.handling_fee = "0";
	    t.amount.details.shipping_discount = "0";
	    t.amount.insurance = "0";
	    data.transactions.push(t);
	    
	    var t2 = new Object();
	    t2.item_list = new Object();
	    t2.item_list.items = new Array();
	    
	    async.map(order.kits, function(spool, done){
	        kit.findById(spool, function(err, result){
	            var item = new Object();
	            item.name = result.name;
	            item.description = result.description;
	            item.quantity = "1";
	            item.price = result.price;
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
		res.render('paymentFail');
	}
	
	function paymentSuccess(req, res)
	{
		req.session.redirect = null ;
		req.session.cart = undefined ;
		order.findOne({ 'token' : req.params.id }, function(err, result){		
		  result.token = '' ;
		  result.step = 3 ;
		  result.save();
		  res.render('paySuccess');
		});
	}
	
	return {
		f404 : f404,
		pay : pay,
		paymentFail : paymentFail,
		paymentSuccess : paymentSuccess
	}
}