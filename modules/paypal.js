/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS ----------------------------------------- -------------/
var Client = require('node-rest-client').Client;
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
    
    var options_auth = { user: "AZT7V0RwrRZQx6N883FzAUNl2EFq62BbeDOjdD7qz8553JCWtNOIn2-6Yw8-FMIlPN3uZVKtNg6NQH6j",
    password: "EG2SoSyJ20hvP4I0Aav5kMf1Au_e0GTa9Y7ngGMGtRvuliCCxChy0lzt5lJMhuZO4rtxb85floAwQUt-" };

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
    
    function pay(options, callback)
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
                    "total": "2.11",
                    "currency": "EUR",
                    "details": {
                      "subtotal": "2.00",
                      "tax": "0.07",
                      "shipping": "0.03",
                      "handling_fee": "1.00",
                      "shipping_discount": "-1.00",
                      "insurance": "0.01"
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
                      "name": "hat",
                      "description": "Brown color hat",
                      "quantity": "1",
                      "price": "1",
                      "tax": "0.01",
                      "sku": "1",
                      "currency": "EUR"
                      },
                      {
                      "name": "handbag",
                      "description": "Black color hand bag",
                      "quantity": "1",
                      "price": "1",
                      "tax": "0.02",
                      "sku": "product34",
                      "currency": "EUR"
                      }
                    ],
                    "shipping_address": {
                      "recipient_name": "Hello World",
                      "line1": "4thFloor",
                      "line2": "unit#34",
                      "city": "SAn Jose",
                      "country_code": "US",
                      "postal_code": "95131",
                      "phone": "011862212345678",
                      "state": "CA"
                    }
                    }
                  }
                  ],
                  "note_to_payer": "Contact us for any questions on your order.",
                  "redirect_urls": {
                  "return_url": "http://www.amazon.com",
                  "cancel_url": "http://www.hawaii.com"
                  }
                }
        };
        console.log(args.headers);
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
                    "total": "2.11",
                    "currency": "EUR",
                    "details": {
                      "subtotal": "2.00",
                      "tax": "0.07",
                      "shipping": "0.03",
                      "handling_fee": "1.00",
                      "shipping_discount": "-1.00",
                      "insurance": "0.01"
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
                      "name": "hat",
                      "description": "Brown color hat",
                      "quantity": "1",
                      "price": "1",
                      "tax": "0.01",
                      "sku": "1",
                      "currency": "EUR"
                      },
                      {
                      "name": "handbag",
                      "description": "Black color hand bag",
                      "quantity": "1",
                      "price": "1",
                      "tax": "0.02",
                      "sku": "product34",
                      "currency": "EUR"
                      }
                    ],
                    "shipping_address": {
                      "recipient_name": "Hello World",
                      "line1": "4thFloor",
                      "line2": "unit#34",
                      "city": "SAn Jose",
                      "country_code": "US",
                      "postal_code": "95131",
                      "phone": "011862212345678",
                      "state": "CA"
                    }
                    }
                  }
                  ],
                  "note_to_payer": "Contact us for any questions on your order.",
                  "redirect_urls": {
                  "return_url": return_url,
                  "cancel_url": cancel_url
                  }
                }
        };
        //console.log(args.headers);
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
	    payTmp : payTmp
	}
}