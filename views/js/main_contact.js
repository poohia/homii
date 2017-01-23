$(document).ready(function() {
	$(".list").addClass("hide");
	$("#contact .cercle").on("click", function() {
		$(".cercle").removeClass("active");
		$(this).addClass("active");
		var data = $(this).attr("data");
		$(".list").removeClass("show");
		$("."+data).addClass("show");
	})

	$(".listToogle").hide();

	$(".contentToogle .linkToogle").on("click", function(e) {
		e.preventDefault();

		var $question = $(this).parent(".contentToogle");
		var $info = $(this).parent(".contentToogle").children('.listToogle');
		var $glyphicon = $(this).children('.glyphicon');

		if ($question.hasClass("active")) {
			$info.slideUp(200);
			$question.removeClass("active");
			$(".glyphicon").addClass("glyphicon-menu-down");
			$(".glyphicon").removeClass("glyphicon-menu-up");
			$glyphicon.addClass("glyphicon-menu-down");
			$glyphicon.removeClass("glyphicon-menu-up");
		}
		else {
			$(".contentToogle").not($info).removeClass("active");
			$(".listToogle").not($info).slideUp(200);
			$info.slideDown(200);
			$question.addClass("active");
			$(".glyphicon").addClass("glyphicon-menu-down");
			$(".glyphicon").removeClass("glyphicon-menu-up");
			$glyphicon.addClass("glyphicon-menu-up");
			$glyphicon.removeClass("glyphicon-menu-down");
		}
	});


	$(".slide-prev").on("click", function() {
		$(this).parent("row-slide").css({"margin-left":"-25vw"})
	})

})