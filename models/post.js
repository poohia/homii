//--------------------------- DEPENDENCYS -------------------------------------------------------/
var mongoose = require('mongoose');
var validator  = require("./../views/common_modules/validate.module");
var slug = require('slug');
var date = require('date-and-time');
//----------------------------------------------------------------------------------------------/


//---- MODEL --------------------/

var postSchema = mongoose.Schema({
    slug : String,
    titre_1 : String,
    titre_2 : String,
    image : String,
    contenu : String,
    preview : String,
    author : String,
    created_date   : String,
    vues : Number
});
module.exports = mongoose.model('Post', postSchema);


//---- FUNCTIONS ------/
postSchema.pre("save",function(next)
{
    this.slug = slug(String(this.titre_1).toLowerCase());
    this.created_date = date.format(new Date(), 'D MMM YYYY'); 
    next();
});
//---------------------/