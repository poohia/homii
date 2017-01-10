/**
* \file Server.js
* \brief 
* \date 25/06/2016
* \author AZOULAY Jordan 
*/

//--------------------------- DEPENDENCYS --------------------------------------------/
var express = require('express');
var router = express.Router();

var passport = require('passport');
require('./passport')(passport);

//----------------------------------------------------------------------------------/

//-------- CONTROLLERS   ----------------------------------------------------------/

var pageController = require("./../controllers/pages.controller")();
var adminController = require("./../controllers/admin.controller")();

//--------------------------------------------------------------------------------/


// PARENT ROUTE  : '/'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

//---------- login gestion ------------/
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      if (req.body.remember !== undefined) {
        res.cookie('user', user._id + ";" + user.local.password, {
          maxAge: 2592000000,
          secure: true,
          httpOnly: true
        }); // Expires in one month
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.post("/logout", function(req, res, next) {
  console.log("i'm here");
  req.logout();
  res.clearCookie("user");
  res.redirect('/');
});


// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}));
//-------------------------------------------------/



//------ Routing --------------------------/


router.get('/', pageController.index);
router.post('/', pageController.saveNewsLetter);
router.get('/dashboard', pageController.dashboard);
router.get('/login', pageController.login);

/** admin **/
router.get('/admin',adminController.index);
router.get('/admin/create/kit', adminController.createKit);
router.post('/admin/create/kit', adminController.postCreateKit);
router.get('/admin/create/product', adminController.functionCreateProduct);
router.post('/admin/create/product', adminController.postCreateProduct);
//------------------------------------------/





//----- ERROR PAGE HTTP -----------------/

// 404 Not Found

router.all(/.*/, pageController.f404);

module.exports = router;