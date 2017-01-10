/**
* \file 
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");
var Schema = mongoose.Schema;
//----------------------------------------------------------------------------------------------/




var newsLetterSchema = Schema({
    email : String
    
});

module.exports = mongoose.model('NewsLetter', newsLetterSchema);
