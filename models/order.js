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
    kits : [{type: Schema.Types.ObjectId, ref: 'Kit'}]
    
});

module.exports = mongoose.model('Order', orderSchema);
