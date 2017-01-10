var cart = function()
{
    'use strict';
    
    var _selectors = {
        btn_add_cart : ".add-cart",
        btn_remove_cart : ".remove-cart",
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
    
    function init()
    {
        $(_selectors.btn_add_cart).on("click", addCart);
        $(_selectors.btn_remove_cart).on("click", removeCart);
    }
    
    return{
        init: init
    }
}();

$(document).ready(function(){
   cart.init(); 
});