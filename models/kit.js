/**
* \file Server.js
* \brief 
* \date 
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async  = require("async");
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



kitSchema.methods.findWithProducts = function(id_kit , callback)
{
    var data = new Object();
    var kitModel = this.model("Kit");
    kitModel.findById({'_id' : id_kit}, function(err, result){

        data.kit = result;
        data.products = new Array();
        async.map(result.products, function(spool, done){
            product.findById(spool, done);
        }, function(err, results)
        {
           data.products = results;
            callback(err, data);
        });
    })
}

module.exports = mongoose.model('Kit', kitSchema);