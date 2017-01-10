var createKit = function(){
        'use strict';
    
    var _selectors = 
    {
        div_products : $(".product"),
        form : $("#form_create_kit")
    }
    var input = "<input type='hidden' id='__id__' value='__id__' name='product' /> "
    function clickOfProduct()
    {
        var $that = $(this);
        var id = $that.data("id");
        if( $that.hasClass("active"))
        {
            $that.removeClass("active");
            $("#" + id).remove();
        }
        else
        {
            $that.addClass("active");
            _selectors.form.append($(input.replace(/__id__/g, id)));
        }
    }
    
    function init()
    {
        console.log("init of createKit module js");
        _selectors.div_products.on("click", clickOfProduct );
    }
    
    return {
        init : init
    }
}();