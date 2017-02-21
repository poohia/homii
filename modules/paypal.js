/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS ----------------------------------------- -------------/
var Client = require('node-rest-client').Client;
const util = require('util');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/

//--------------------------------------------------------------------------------------------/

module.exports = function(app){
	'use strict';
    
    var token = null;
    var base_url = "https://api.sandbox.paypal.com/v1/";
    var _urls = {
      get_token : base_url + "oauth2/token",
      payment : base_url + "payments/payment"
    };
    
    // les ids sont changer pour sécu donc paypal ne fonctionne plus
    var options_auth = { user: "AZT7V0RwrRZQx6N883FzAUNl2EFq62BbeDOjdD7qz8553JCWtNOIn2-6Yw8",
    password: "EG2SoSyJ20hvP4I0Aav5kMf1Au_e0GTa9Y7ngGMGtRvuliCCxChy0lzt5l" };

    function connect(callback)
    {
        var args = {
          data:   'grant_type=client_credentials' ,
          headers: {
              'Accept' : 'application/json',
              'Accept-Language' : 'en_FR'
          }
        };
        var client = new Client(options_auth);
        client.post(_urls.get_token, args , function(data, response){
            token = data.access_token;
            callback();
        });
        
    }
    
    function pay(data, callback)
    {
        var args = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            data : {
                  "intent": "sale",
                  "payer": {
                  "payment_method": "paypal"
                  },
                  "transactions": data.transactions,
                  "note_to_payer": "Contact us for any questions on your order.",
                  "redirect_urls": data.redirect_urls
                }
        };
        var client = new Client();
       client.post(_urls.payment, args, function(data, result){
           console.log(data);
        });
    }
    
    function payTmp(return_url, cancel_url, callback)
    {
        var args = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            data : {
                  "intent": "sale",
                  "payer": {
                  "payment_method": "paypal"
                  },
                   "transactions": [
                  {
                    "amount": {
                    "total": "149.4",
                    "currency": "EUR",
                    "details": {
                      "subtotal": "148",
                      "tax": "1.4",
                    }
                    },
                    "description": "This is the payment transaction description.",
                    "custom": "EBAY_EMS_90048630024435",
                    "invoice_number": "48787589673",
                    "payment_options": {
                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "soft_descriptor": "ECHI5786786",
                    "item_list": {
                    "items": [
                      {
                      "name": "VERT MALACHITE",
                      "description": "Stick Homii",
                      "quantity": "1",
                      "price": "49",
                      "tax": "0.7",
                      "sku": "1",
                      "currency": "EUR"
                      },
                      {
                      "name": "BORNE XXV / XXA",
                      "description": "Borne Homii",
                      "quantity": "1",
                      "price": "99",
                      "tax": "0.7",
                      "sku": "product34",
                      "currency": "EUR"
                      }
                    ],
                    }
                  }
                  ],
                  "note_to_payer": "Contact Homii for any questions on your order.",
                  "redirect_urls": {
                  "return_url": return_url,
                  "cancel_url": cancel_url
                  }
                }
        };
        //console.log(args.headers);
        var client = new Client();
        client.post(_urls.payment, args, function(data, result){
          console.log(data);
          console.log(data.links);
           if(data.links)
           {
             callback(data.links[1].href);
           }
           else
           {
             callback(cancel_url);
           }
        });
    }
    
    function payTmp2(data,cancel_url, callback)
    {
        
        var args = {
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            data : {
                  "intent": "sale",
                  "payer": {
                  "payment_method": "paypal"
                  },
                   "transactions": [
                  {
                    "amount": {
                    "total": data.transactions[0].amount.total,
                    "currency": "EUR",
                    "details": {
                      "subtotal": data.transactions[0].amount.details.subtotal,
                      "tax": data.transactions[0].amount.details.tax,
                    }
                    },
                    "description": "This is the payment transaction description.",
                    "custom": "EBAY_EMS_90048630024435",
                    "invoice_number": "48787589673",
                    "payment_options": {
                    "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "soft_descriptor": "ECHI5786786",
                    "item_list": data.transactions[1].item_list,
                  }
                  ],
                  "note_to_payer": "Contact Homii for any questions on your order.",
                  "redirect_urls": {
                  "return_url": data.redirect_urls.return_url,
                  "cancel_url": cancel_url
                  }
                }
        };
        //console.log(args.headers);
       // console.log(util.inspect(args.data, {showHidden: false, depth: null}));
        var client = new Client();
        client.post(_urls.payment, args, function(data, result){
           if(data.links)
           {
             callback(data.links[1].href);
           }
           else
           {
             callback(cancel_url);
           }
        });
    }


	return {
	    connect : connect,
	    pay : pay,
	    payTmp : payTmp,
	    payTmp2 : payTmp2
	}
}