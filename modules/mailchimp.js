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
	
	    var options_auth = { user: "anystring",
    password : "aff34e60426e5c8c3e753c613331a1de-us14" }; // token


    var base_url = "https://us14.api.mailchimp.com/3.0/";

    var _urls = {
        add_subscriber : base_url + "lists/72d96dda02/members" 
    };
    
    function test()
    {
        var client = new Client(options_auth);
        client.get(base_url, function(data, response){
           console.log(data); 
        });
    }
    
    function addSubscriber(email , callback )
    {
        var args = {
          data : {
            'email_address'  : email,
            "status" : "subscribed"
            },
          headers : {
             'Content-Type' : 'application/json',
          }
        }
        var client = new Client(options_auth);
        client.post(_urls.add_subscriber, args, function(data, response){
           if(callback)
                callback(email);
        });     
    }
    
	return {
	    test : test,
	    addSubscriber : addSubscriber
	}
}