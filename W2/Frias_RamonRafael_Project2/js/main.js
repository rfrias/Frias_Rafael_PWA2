/*  
	Your Project Title - Gamers Orbit Site
	Author: Frias, Ramon Rafael, G. IV
*/

(function($){
	
/*============================== TABBED ACCORDION FOR DASHBOARD PAGE ==============================*/
	$("#tabs p").hide().eq(0).show();
	$("#tabs p:not(:first)").hide();
	
	$("#tabs-nav li").click(function(e){
		e.preventDefault();
		$("#tabs p").hide();
	
	$("#tabs-nav .current").removeClass("current");
		$(this).addClass("current");
		var clicked = $(this).find("a:first").attr("href");
		
		$("#tabs " + clicked).fadeIn("fast");
	}).eq(0).addClass("current");
	
/*============================== ADD MODAL ==============================*/
	$(".modalClick").on("click", function(event){
		event.preventDefault();
		$("#overlay")
			.fadeIn()
			.find("#modal")
			.fadeIn();
	});
	
	$(".close").on("click", function(event){
		event.preventDefault();
		$("#overlay")
			.fadeOut()
			.find("#modal")
			fadeOut();
	});
/*============================== FADING STATUS OPTION ==============================*/
	$(".mystatus").mouseover(function(){
		$(this).fadeTo(100, .3);
	});
	
	$(".mystatus").mouseout(function(){
		$(this).fadeTo(100, 1);
	});
/*============================== TOOLTIP ==============================*/
	$(".masterTooltip").hover(function(){
		//Hover over code
		var title = $(this).attr("title");
		$(this).data("tipText", title).removeAttr("title");
		$("<p class='tooltip'></p>")
		.text(title)
		.appendTo("body")
		.fadeIn("slow");
	}, function(){
		//Hover out code
		$(this).attr("title", $(this).data("tiptText"));
		$(".tooltip").remove();
	}).mousemove(function(e){
		var mousex = e.pageX + 20; //Get X coordinates
		var mousey = e.pageY + 10; //Get Y coordinates
		$(".tooltip")
			.css({top: mousey, left: mousex});
	});	
/*============================== GO TO HOME PAGE==============================*/
	$(".home").on("click", function(e){
		e.preventDefault();
		window.location.assign("index.html");
	});
/*============================== GO TO PROJECTS PAGE==============================*/
	$(".projects").on("click", function(e){
		e.preventDefault();
		window.location.assign("projects.html");
	});
/*============================== GO TO DASHBOARD PAGE==============================*/
	$(".dashboard").on("click", function(e){
		e.preventDefault();
		window.location.assign("dashboard.html");
	});
/*============================== GO TO PROFILE PAGE==============================*/
	$(".profile").on("click", function(e){
		e.preventDefault();
		window.location.assign("profile.html");
	});
		

	
})(jQuery); // end private scope




