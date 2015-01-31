/*  
	Your Project Title - Gamers Orbit Site
	Author: Frias, Ramon Rafael, G. IV
*/

(function($){
	
/*============================== TABBED ACCORDION FOR DASHBOARD PAGE ==============================*/
	$("#tabs p").hide().eq(0).show();
	$("#tabs p:not(:first)").hide();
	
	$("#tabs-nav span").click(function(e){
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
	$(".projects1").on("click", function(e){
		e.preventDefault();
		window.location.assign("projects.html");
	});
/*============================== GO TO DASHBOARD PAGE==============================*/
	$(".dashBoard").on("click", function(e){
		e.preventDefault();
		window.location.assign("dashboard.html");
	});
/*============================== GO TO PROFILE PAGE==============================*/
	$(".profile").on("click", function(e){
		e.preventDefault();
		window.location.assign("profile.html");
	});
/*============================== GO TO REGISTER PAGE==============================*/
	$(".myButton").on("click", function(e){
		e.preventDefault();
		window.location.assign("register.html");
	});
/*============================== GO TO SEARCH PAGE==============================*/
	$(".tasks").on("click", function(e){
		e.preventDefault();
		window.location.assign("search.html");
	});
/*============================== LOG IN ==============================*/
	$(".signInButton").click(function(){
		var user = $("#user").val();
		var pass = $("#pass").val();
		console.log("This notifies you if the password is working");
		$.ajax({
			url:"xhr/login.php",
			type: "post",
			dataType: "json",
			data: {
				username: user,
				password: pass
			},
			success: function(response){
				console.log("Test User");
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign("dashboard.html")
				};
			}
		});
	});
/*============================== LOG OUT ==============================*/
	$(".logOutButton").click(function(e){
		e.preventDefault;
		$.get("xhr/logout.php", function(){
			window.location.assign("index.html")
		})
	});
/*============================== REGISTER ==============================*/
	$("#register").on("click", function(){
		var firstname= $("#first").val(),
			lastname= $("#last").val(),
			username= $("#userName").val(),
			email= $("#email").val(),
			password= $("#password").val();
			console.log(firstname+" "+lastname+" "+username+" "+password);
			
		$.ajax({
			url: "xhr/register.php",
			type: "post",
			dataType: "json",
			data: {
				firstname: firstname,
				lastname: lastname,
				username: username,
				email: email,
				password: password
			},
			success: function(response){
				if (response.error){
					alert(response.error);
				}else{
					window.location.assign("index.html");
				}
			}
		});
	});
/*============================== DISPLAY USERNAME ==============================*/
	$.getJSON("xhr/check_login.php", function(data){
		console.log(data);
		$.each(data, function(key, val){
			console.log(val.first_name);
			$(".userid").html("Welcome User:<br>"+ val.first_name);
		})
	});
/*============================== NEW PROJECTS ==============================*/
	$("#addButton").on("click", function(){
		
		var projName = $("#projectName").val(),
			projDesc = $("#projectDescription").val(),
			projDue = $("#projectDueDate").val(),
			status = $("input[name = 'status']:checked").prop("id");
			
			$.ajax({
				url: "xhr/new_project.php",
				type: "post",
				dataType: "json",
				data: {
					projectName: projName,
					projectDescription: projDesc,
					projectDueDate: projDue,
					status: status
				},
				success: function(response) {
					console.log("Testing for success");
					
					if(response.error) {
						alert(response.error);
					}else{
						window.location.assign("projects.html");
					};
				}
			});
	});
/*============================== GET PROJECTS ==============================*/
	var projects = function(){
		
		$.ajax({
			url: "xhr/get_projects.php",
			type: "get",
			dataType: "json",
			success: function(response){
				if(response.error){
					console.log(response.error);
				}else{
					
					for(var i=0, j=response.projects.length; i < j; i++){
						var result = response.projects[i];
						
						$(".projects").append(
							//"<div style='background-color: #7FB2F0; padding: 20px; box-shadow: 2px 2px 10px #00ADEF;>" +
							"<div id='sortable' style='background-color: #7FB2F0; padding: 20px; box-shadow: 2px 2px 10px #00ADEF;>" +
							"<input class='projectid' type='hidden' value='" + result.id + "'>" +
							"<strong>Game Name:</strong><br> " + result.projectName + "<br><br>" +
							"<strong>Gameplay Due Date:</strong><br> " + result.projectDueDate + "<br><br>" +
							"<strong>Game Description:</strong><br> " + result.projectDescription + "<br><br>" +
							"<strong>Game Status:</strong><br> " + result.status + "<br><br>"
							+ "<button class='deletebtn'>Delete</button>"
							+ "<button class='editbtn'>Edit</button>"
							+ "</div> <br>"
						);
					};
					$(".deletebtn").on("click", function(e){
						//var pid = $(this).parent().find(".projectid").val();
						console.log("test delete");
						$.ajax({
							url: "xhr/delete_project.php",
							data: {
								projectID: result.id //pid
							},
							type: "POST",
							dataType: "json",
							success: function(response){
								console.log("Testing for success");
								
								if(response.error) {
									alert(response.error);
								}else{
									//console.log(result.id);
									window.location.assign("projects.html");
								};
							}
						});
					}); //End Delete
				}
			}
		})
	}
projects();
/*==============================  ============================*/

/*============================== DRAG/DROP ============================*/
$( "#sortable" ).sortable();
$( "#sortable" ).disableSelection();
/*==============================  ============================*/

/*============================== DATEPICKER ============================*/
$( ".mydatepicker" ).datepicker();
/*==============================  ============================*/

/*============================== PROGRESSBAR ============================*/
var progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Play Game!" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + 2 );
 
      if ( val < 99 ) {
        setTimeout( progress, 80 );
      }
    }
 
    setTimeout( progress, 2000 );
/*==============================  ============================*/
})(jQuery); // end private scope
