//--------------------------- DEPENDENCYS ------------------------------------------------------/
var chalk = require('chalk');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
var productModel = require('./../models/product');
//---------------------------------------------------------------------------------------------/


module.exports = function() {

//----- DATABASE --------/
    var _db = null ;
    
   _db =  require('./../modules/mongoose')();
   _db.connect();
//-----------------------/

//--------- Functions --------------------------------------------------------/



//---------------------------------------------------------------------------/


//--------- PATERN CONSOLE TOOL --------------------------------------------/
    function finish() {
        process.exit(0);
    }

    function finishWithError(message) {
        if (message !== undefined)
            console.log(chalk.red.bold.underline("Error : ", message));
        process.exit(1);
    }

    function help() {
        var help = new String('');
        /*help = "\tuser:create     create new user";
        help += "\n\tuser:generate   generate random users";*/
        help += "\tproduct:generate genere produits fixtures";
        return help;
    }

    function getCommande() {
       return "product";
    }

    function scriptCreateProducts()
    {
        
        productModel.create({
            'name': 'playstation 4',
            'description' : 'une console'
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        productModel.create({
            'name': 'playstation 3',
            'description' : 'une console'
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        productModel.create({
            'name': 'playstation 2',
            'description' : 'une console'
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        productModel.create({
            'name': 'Xbox',
            'description' : 'une console'
        }, function(err, user) {
            if (err)
                FinishWithError(err);
            console.log(chalk.bgGreen.bold("User :", user, " \ncreated!"));

        });
        
    }

    function start(commande) {
        var commandeSplit = commande.split(':');
        switch (commandeSplit[0]) {
             case 'generate':
                scriptCreateProducts();
                break;
            default:
                finish();
        }
    }

    return {
        help: help,
        getCommande: getCommande,
        start: start
    }
//----------------------------------------------------------------------/
}();