/**
* \file Server.js
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");
var kit = require("./kit");
var Schema = mongoose.Schema;
//----------------------------------------------------------------------------------------------/




var orderSchema = Schema({
    price : Number,
    step : Number,
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    kits : [{type: Schema.Types.ObjectId, ref: 'Kit'}],
    address: {
        nom : String,
        prenom: String,
        rue : String,
        code_postal: String,
        pays : String,
        complement: String
    },
    token : String
});

module.exports = mongoose.model('Order', orderSchema);
