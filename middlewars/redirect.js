// append to modules/server.js '.use(yourmodule.start)'
module.exports = {
    start: function(req, res, next) {
        redirect.principalFunction(req, res, next);
    },
    redirect: function() {
        return redirect;
    }
};

//--------------------------- DEPENDENCYS -------------------------------------------------------/
//---------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES --------------------------------------------------------/
//--------------------------------------------------------------------------------------------/


var redirect = function() {
    'use strict';

    function principalFunction(req, res, next)
    {
        next();
    }
    function redirect(req , res)
    {
        if(req.session.redirect)
        {
            res.redirect(req.session.redirect);
        }
    }
    return {
        principalFunction : principalFunction,
    }
}();