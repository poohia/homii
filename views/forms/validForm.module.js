var validForm = function(){
	'use strict';
	
	var _forms = {
		login : '#form_signin',
		signup : '#form_signup',
		logout : '#form_logout',
		signup_tunnel : '#form_signup_tunnel',
		newsletter : '#form_news_letter',
		address : '#form_order_address'
	}
	
	function logout()
	{
		var isValid = true;
		var isToken = token(this);
		return (isValid && isToken);
	}

	function login(){
	    
		var isValid = true;

	    var items = {
	      $email : $("#email"),
	      $password : $("#password")
	    }

	    if(validator.password(items.$password.val()))
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	isValid = false ;
	    }
	    if(validator.email(items.$email.val()))
	    {
	        items.$email.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	        items.$email.removeClass("valid").addClass("invalid");
	        isValid = false ;
	    }
	    var isToken = token(this);
	    return (isValid && isToken); 
	};

	function signup(){
		var isValid = true;

		var items = {
	      $email : $("#signup_email"),
	      $password : $("#signup_password"),
	      $password_again : $("#password_again"),
	      $speudo         : $("#name"),
	      $sexe			  : $("input[name=sexe]:checked")
	    }

	    if(validator.password(items.$password.val()) && (items.$password_again.val() === items.$password.val()) )
	    {
	    	items.$password.removeClass("invalid").addClass("valid");
	    	items.$password_again.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$password.removeClass("valid").addClass("invalid");
	    	items.$password_again.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
	    if(validator.email(items.$email.val()))
	    {
	    	items.$email.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$email.removeClass("valid").addClass("invalid");
	    	isValid = false;

	    }
	    if(validator.no_Empty(items.$speudo.val()))
	    {
	    	items.$speudo.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$speudo.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
		if(validator.sexe(items.$sexe.val()))
	    {
	    	items.$sexe.removeClass("invalid").addClass("valid");
	    }
	    else
	    {
	    	items.$sexe.removeClass("valid").addClass("invalid");
	    	isValid = false;
	    }
        var isToken = token(this);
	    return (isValid && isToken); 
	};
	function newsLetter()
	{
		var isToken = token(this);
		
		var isValid = true;

		var items = {
	      $email : $("#news-letter-email"),
	      $error_message : $("#message-error")
	      
	    }
		if(validator.email(items.$email.val()))
	    {
	    	
	    }
	    else
	    {
	    	items.$error_message.removeClass("hidden");
	    	isValid = false;
	    }
	    
	    return (isValid && isToken); 
	}
	function address()
	{
		var isToken = token(this);
	    var isValid = true;
		
		var items = {
			$name : $("#message-name"),
			$last_name : $("#last_name"),
			$rue  : $("#rue"),
			$code_postal : $("#code_postal"),
			$vile : $("#ville"),
			$pays : $("#pays")
		};
		if(validator.sexe(items.$sexe.val()))
		{
			$(">.form-error-message", items.$sexe.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$sexe.parent()).removeClass("hidden");
			isValid = false;
		}
		
		if(validator.no_Empty(items.$name.val()))
		{
			$(">.form-error-message", items.$name.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$name.parent()).removeClass("hidden");
			isValid = false;
		}
		
		if(validator.no_Empty(items.$last_name.val()))
		{
			$(">.form-error-message", items.$last_name.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$last_name.parent()).removeClass("hidden");
			isValid = false;
		}
		if(validator.french_Code_Postal(items.$code_postal.val()))
		{
			$(">.form-error-message", items.$code_postal.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$code_postal.parent()).removeClass("hidden");
			isValid = false;
		}		
		if(validator.no_Empty(items.$rue.val()))
		{
			$(">.form-error-message", items.$rue.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$rue.parent()).removeClass("hidden");
			isValid = false;
		}
		if(validator.no_Empty(items.$vile.val()))
		{
			$(">.form-error-message", items.$vile.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$vile.parent()).removeClass("hidden");
			isValid = false;
		}
		if(validator.no_Empty(items.$pays.val()))
		{
			$(">.form-error-message", items.$pays.parent()).addClass("hidden");
		}
		else
		{
			$(">.form-error-message", items.$pays.parent()).removeClass("hidden");
			isValid = false;
		}		
		 return (isValid && isToken); 
		
	}
	
	function signupTunnel()
	{
			var isValid = true;

		var spans = {
		  $name : $("#message-name"),
	      $email : $("#message-email"),
	      $password : $("#message-password"),
	      $password_again : $("#message-password2"),
	    }
	    
		var items = {
		  $name : $("#name"),
	      $email : $("#email"),
	      $password : $("#password"),
	      $password_again : $("#password_again"),
	    }
	    
		if(validator.password(items.$password.val()))
		{
			spans.$password.addClass("hidden");
		}
		else
		{
			spans.$password.removeClass("hidden");
		}
	    if((items.$password_again.val() === items.$password.val()))
	    {
	    	spans.$password_again.addClass("hidden");
	    }
	    else
	    {
	    	spans.$password_again.removeClass("hidden");
	    	isValid = false;
	    }
	    if(validator.email(items.$email.val()))
	    {
	    	spans.$email.addClass("hidden");
	    }
	    else
	    {
	    	spans.$email.removeClass("hidden");
	    	isValid = false;

	    }
	    if(validator.no_Empty(items.$name.val()))
	    {
	    	spans.$name.addClass("hidden");
	    }
	    else
	    {
	    	spans.$name.removeClass("hidden");
	    	isValid = false;
	    }

        var isToken = token(this);
	    return (isValid && isToken); 
	}
	function token($form)
	{
		var $token = $("input[name='token']", $form);
		
		if($token.val().length != 0)
			return false;
		else
			return true;
			
	};

	function init(){
		$(_forms.login).on("submit",login);
		$(_forms.signup).on("submit",signup);
		$(_forms.logout).on("submit",logout);
		$(_forms.newsletter).on("submit", newsLetter);
		$(_forms.address).on("submit", address);
		$(_forms.signup_tunnel).on("submit",signupTunnel);

	}

	return {
		init: init
	}

}();