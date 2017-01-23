var compte = function()
{
   
   var _selectors = {
       nav_compte : "#link-compte",
       div_compte : $("#compte-infos")
   }
   
   var hasShow = false ;
   
   function showOrHideCompte(e)
   {
       e.preventDefault();
       if(!hasShow)
       {
           _selectors.div_compte.fadeIn(500);
           hasShow = true;
       }
       else
       {
         _selectors.div_compte.fadeOut(500);
         hasShow = false ;   
       }
   }
   
   function init()
   {
       $(_selectors.nav_compte).on("click",showOrHideCompte);
   }
   
    
    return{
        init: init
    }
}();