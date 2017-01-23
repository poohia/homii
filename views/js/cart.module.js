var cart = function()
{
    'use strict';
    
    var _selectors = {
        btn_add_cart : ".add-cart",
        btn_remove_cart : ".remove-cart",
        cart :  $("#cart-link")
    };
    var _self = {
        
    };
    
    function removeCart()
    {
        $.get($(this).data("href"))
        .done(function(data)
        {
            console.log(data);
        })
        .fail(function(data)
        {
           console.log(data); 
        });
    }
    
    function addCart()
    {
        var $that = $(this);
        $that.html('<i class="fa fa-refresh fa-spin  fa-fw"></i><span class="sr-only">Loading...</span>');
        $.get($(this).data("href"))
        .done(function(data)
        {
            $("> span",_selectors.cart).text("1");
            setTimeout(function()
            {
                 $that.html('Acheter');
            }, 1000);
            console.log(data);
        })
        .fail(function(data)
        {
                        setTimeout(function()
            {
                 $that.html('Acheter');
            }, 1000);
        });
    }
    
    function init()
    {
        $(_selectors.btn_add_cart).on("click", addCart);
     //   $(_selectors.btn_remove_cart).on("click", removeCart);
    }
    
    return{
        init: init
    }
}();

$(document).ready(function(){
   cart.init(); 
});