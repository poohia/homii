/**
* \file Server.js
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");
var product   = require("./product");
var Schema = mongoose.Schema;
//----------------------------------------------------------------------------------------------/




var kitSchema = Schema({
    products : [{type: Schema.Types.ObjectId, ref: 'Product'}],
    price : String,
    description: String,
    image : String,
    name : String
});

module.exports = mongoose.model('Kit', kitSchema);
