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
var marketController = require("./../controllers/market.controller")();
var cartController = require("./../controllers/cart.controller")();
var orderController = require("./../controllers/orders.controller")();
var paypalController = require("./../controllers/paypal.controller")();
var blogController = require("./../controllers/blog.controller")();
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
  req.logout();
  res.clearCookie("user");
  res.redirect('/');
});
router.get("/logout", function(req, res, next) {
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

/** index **/
router.get('/', pageController.index);
router.get('/home', pageController.home);
router.post('/', pageController.saveNewsLetter);
router.post('/home', pageController.saveNewsLetterHome);
router.get('/dashboard', pageController.dashboard);
router.get('/login', pageController.login);

/** admin **/
router.get('/admin',adminController.index);
/*
router.get('/admin/create/kit', adminController.createKit);
router.post('/admin/create/kit', adminController.postCreateKit);*/
router.get('/admin/create/product', adminController.functionCreateProduct);
router.post('/admin/create/product', adminController.postCreateProduct);
router.get('/admin/news-letter', adminController.newsLetter);
router.get('/admin/news-letter/remove/:id', adminController.removeNewsLetter);
/*
router.get('/admin/kits', adminController.listKit);
router.get('/admin/kit/remove/:id', adminController.removeKit);
*/
router.get('/admin/products', adminController.listProduct);
router.get('/admin/articles', blogController.articles);
router.get('/admin/article/remove/:id', blogController.removeArticle);
router.get('/admin/article/edit/:id', blogController.editArticle);
router.post('/admin/article/edit/:id', blogController.postEditArticle);
/** market **/
router.get('/market', marketController.index);
/*
router.get('/market/show/kit/:id', marketController.showKit);*/
router.get('/market/show/product/:id', marketController.showProduct);

/** cart **/
router.get('/cart/show', cartController.index );
router.get('/cart/add/:id', cartController.addCart );
router.get('/cart/remove/:id', cartController.removeCart);

/** order **/
router.get('/order', orderController.index) ;
router.get('/order/step/2', orderController.step2) ;
router.post('/order/step/2', orderController.postStep2);
router.get('/order/cancel', orderController.cancelOrder);
router.get('/order/step/3/:id',orderController.step3);
router.post('/order/step/3/:id' , orderController.postStep3);

/** paypal **/
router.post('/paypal/payment', paypalController.pay);
router.get('/paypal/payment/success/:id', paypalController.paymentSuccess);
router.get('/paypal/payment/fail/:id', paypalController.paymentFail);

/** blog **/
router.get('/blog', blogController.index);
router.get('/admin/blog/post/add', blogController.create);
router.post('/admin/blog/post/add', blogController.postCreate);
router.get('/blog/:slug', blogController.article);

//------------------------------------------/





//----- ERROR PAGE HTTP -----------------/

// 404 Not Found

router.all(/.*/, pageController.f404);

module.exports = router;