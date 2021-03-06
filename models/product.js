/**
* \file Server.js
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");

//----------------------------------------------------------------------------------------------/




var productSchema = mongoose.Schema({
    name : String,
    description : String,
    image : String,
    price : Number,
    price_with_tax : Number,
    product_type : Number
});





module.exports = mongoose.model('Product', productSchema);
