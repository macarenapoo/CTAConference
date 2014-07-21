var data = new Firebase("https://cta-conference.firebaseio.com/");
var agenda = localData.agenda;

$(document).on("mobileinit",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var agendaHeight = height - 165;
	$("#agenda .sub-page-content").css("max-height", agendaHeight + "px");
	$("#speakers .sub-page-content").css("max-height", agendaHeight + "px");

	var offset = $("#speaker .sub-page-content").offset();
	speakerHeight = speakerHeight - offset.top;
	$("#speaker .sub-page-content").css("max-height", speakerHeight+"px");
	$("#speaker_bio .sub-page-content").css("max-height", speakerHeight+"px");

	reviewHeight = height - 160;
	$("#review .sub-page-content").css("max-height",reviewHeight + "px");

	infoHeight = height - 160;
	$("#info .sub-page-content").css("max-height",infoHeight + "px");

});

$(document).on("pageinit","#index", function(){
	$("#index").on("swiperight",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide", reverse: true});
	});
	$("#index").on("swipeleft",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide"});
	});
	$("#index").on("tap",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide"});
	});
});

$(document).on("pagecreate","#review", function(){
	$("#popupThanks").on({
	    popupbeforeposition: function () {
	        $('#review .ui-popup-screen').off();
	    }
	});
	$("#review select[name=speaker]").change(function(){
		$("#review select[name=speaker]").removeClass("invalid");
	});
	$("#review input[name=quality]").change(function(){
		$("#content_label").removeClass("invalid");
	});
	$("#review input[name=performance]").change(function(){
		$("#performance_label").removeClass("invalid");
	});
	$("#review input[name=entertaining]").change(function(){
		$("#entertaining_label").removeClass("invalid");
	});
	$("#review input[name=actionable]").change(function(){
		$("#actionable_label").removeClass("invalid");
	});

});

$(document).on("pageinit","#speaker", function(){
	$("#speaker").on("swiperight",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide", reverse: true});
	})
});

$(document).on("pageinit","#afterparty", function(){
	$("#afterparty").on("swiperight",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide", reverse: true});
	})
});


$(document).on("pageinit","#speaker_bio", function(){
	$("#speaker_bio").on("swiperight",function(event){
		$.mobile.back();
	})
});


$(document).on("pagebeforeshow","#agenda",function(){
	loadAgenda();	
});

$(document).on("pagecreate","#review",function(){
	loadReviews();
});

$(document).on("pagecreate","#speakers",function(){
	loadSpeakers();
});


$(document).on("pagebeforeshow","#afterparty",function(){

	$("#afterparty iframe").remove();
	
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	afterHeight = height - 60;

	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	afterWidth = width - 30;

	var iframe = document.createElement("iframe");
	$(iframe).attr({
		src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2602.6362667748645!2d-123.114781!3d49.283289100000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867178c58de583%3A0x13b07c95f3aaa412!2s560+Seymour+St!5e0!3m2!1ses!2sca!4v1404760373315",
		frameborder: "0",
		style: "border:0",
		seamless : true,
		height: afterHeight,
		width: afterWidth
	});
	$(iframe).appendTo($("#mapPopup"));

	
	$("#afterparty iframe").css("height", afterHeight + "px");
	
});

$(document).on("pagebeforeshow","#info",function(){

	$("#info iframe").remove();
	
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	afterHeight = height - 60;

	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	afterWidth = width - 30;

	var iframe = document.createElement("iframe");
	$(iframe).attr({
		src: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2602.6865338889006!2d-123.10885950000001!3d49.2823367!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548671798fe2be07%3A0xb50102a4b6ee9741!2s149+W+Hastings+St%2C+Vancouver%2C+BC+V6B%2C+Canad%C3%A1!5e0!3m2!1ses!2smx!4v1405022182753",
		frameborder: "0",
		style: "border:0",
		seamless : true,
		height: afterHeight,
		width: afterWidth
	});
	$(iframe).appendTo($("#mapPopup2"));

	
	$("#info iframe").css("height", afterHeight + "px");
	
});

function changeNav(to, from){
	var page;
	var x;
	var newPage;
	switch(to){
		case 1: 
			newPage = "agenda";
			x = -10;
		break;
		case 2:
			newPage = "speakers";
			x = 70;
		break;
		case 3:
			newPage = "review";
			x = 150;
		break;
		case 4:
			newPage = "info";
			x = 230;
	}
	switch(from){
		case 1: 
			page = "agenda";
		break;
		case 2:
			page = "speakers";
		break;
		case 3:
			page = "review";
		break;
		case 4:
			page = "info";
	}

	/*$("#"+newPage+" #nav div").addClass(newPage+"_active");
	$(".ui-page-active #nav div").removeClass(page+"_active");
	$(".ui-page-active #nav div").addClass(newPage+"_active");*/
	$(".ui-page-active #nav div").css("background-position",x+"px");

	if(from < to){
		$.mobile.changePage($("#"+newPage),{transition:"slide"});
	}else{
		$.mobile.changePage($("#"+newPage),{transition:"slide", reverse:true});
	}
}


function loadAgenda(){
	data.on('value', function(snapshot){
		agenda = snapshot.val().agenda;
		var speakers = snapshot.val().speakers;
		
		var agendaUl = $("#agenda ul.agenda");
		$("#agenda ul.agenda").empty();
		for(var i=0; i<agenda.length; i++){
			var li = document.createElement("li");

			var time = document.createElement("div");
			$(time).addClass("time");
			$(time).html(agenda[i].time);
			$(time).appendTo(li);

			var title = document.createElement("div");
			$(title).addClass("title");
			var titletext = agenda[i].title;
			$(title).html(titletext);
			$(title).appendTo(li);

			switch(agenda[i].type){
				case "event":

					$(li).addClass("event");
					$(li).appendTo(agendaUl);

					var image = document.createElement("img");
					$(image).attr("src","css/images/"+agenda[i].image);
					$(image).appendTo(li);

				break;

				case "party":

					var link = document.createElement("a");
					$(link).attr("href","#afterparty");
					$(link).addClass("party");
					$(link).attr("data-transition","slide");
					$(link).appendTo(agendaUl);

					$(li).appendTo(link);

				break;

				default:

					var link = document.createElement("a");
					$(link).attr("href","javascript:loadConference("+i+");");
					$(link).appendTo(agendaUl);
					
					$(li).appendTo(link);

					var speaker = document.createElement("div");
					$(speaker).addClass("speaker");
					var speakersName = "";
					for(var j = 0; j < agenda[i].speakers.length; j++){
						speakersName = speakersName + speakers[agenda[i].speakers[j]].name;
						if((agenda[i].speakers.length > 1) && (j != agenda[i].speakers.length -1)){
							speakersName += ", ";
						}
					}
					$(speaker).html(speakersName);
					$(speaker).appendTo(li);

				break;

			}
		}
	});
}

function titleoverflows(fulltitle){
	var title = fulltitle;
	if(title.length > 40){
		title = title.substring(0,40);
		for(var i=title.length-1; i>=0; i--){
			if(title.charAt(i) == " "){
				title = title.substring(0, i);
				title = title + "...";
				break;
			}
		}
	}
	return title;
}

function loadConference(id){
	data.on('value', function(snapshot){
		agenda = snapshot.val().agenda;
		var allSpeakers = snapshot.val().speakers;

		var speakers = agenda[id].speakers;
		var ul = $("#speaker .speakers");
		var images = $("#speaker .speaker_images");

		if(speakers.length > 1){
			$(images).addClass("multiple");
			$("#speaker .sub-page-content").addClass("multiple");
		}else{
			$(images).removeClass("multiple");
			$("#speaker .sub-page-content").removeClass("multiple");
		}

		$(images).empty();
		$(ul).empty();

		for(var i = 0; i<speakers.length; i++){
			var a = document.createElement("a");
			$(a).attr("href","javascript:loadBio("+agenda[id].speakers[i]+");")
			

			var mask = document.createElement("div");
			$(mask).addClass("mask m"+(i+1));

			var image = document.createElement("img");
			$(image).attr("src","css/images/speakers/"+allSpeakers[agenda[id].speakers[i]].image);
			$(a).appendTo(mask);
			$(image).appendTo(a);
			$(mask).appendTo(images);

			var li = document.createElement("li");
			var speaker = allSpeakers[agenda[id].speakers[i]].name;
			speaker += ", " + allSpeakers[agenda[id].speakers[i]].position;
			$(li).html(speaker);
			$(li).appendTo(ul);
		}

		var title = document.createElement("div");
		$(title).addClass("title");
		$(title).appendTo(images); 
		$(title).html(agenda[id].title);
		if(agenda[id].description == null){
			$("#speaker .description").html("");
		}else{
			$("#speaker .description").html(agenda[id].description);
		}

		var button = $("#submit_btn");
		$(button).attr("href","javascript:loadReviews("+id+");");
	});

	$.mobile.changePage($('#speaker'),{transition:"slide"});
}

function loadReviews(speaker){
	if(typeof(speaker) == 'undefined'){
		speaker = -1;
	}

	resetReviews();

	var select = $("#review select[name=speaker]");
	$(select).empty();

	var option = document.createElement("option");
	$(option).html("Select Speakers");
	$(option).attr("disabled",true);
	if(speaker == -1) $(option).attr("selected",true);
	$(option).appendTo(select);

	data.on('value', function(snapshot){
		agenda = snapshot.val().agenda;
		var allSpeakers = snapshot.val().speakers;

		for(var i=0; i<agenda.length; i++){
			if(agenda[i].type == "conference"){
				var option = document.createElement("option");
				var speakers = "";
				for(var j=0; j<agenda[i].speakers.length; j++){
					speakers += allSpeakers[agenda[i].speakers[j]].name;
					if(j != agenda[i].speakers.length - 1){
						speakers += ", "
					}
				}
				$(option).html(speakers);
				$(option).attr("value",speakers);
				$(option).attr("data-role","none");
				if(speaker == i) $(option).attr("selected",true);
				$(option).appendTo(select);
			}
		}

		if(speaker != -1){
			$.mobile.changePage($('#review'),{transition:"slide"});
		}
	});
}

function submitReview(){
	var reviewsData = new Firebase("https://cta-conference.firebaseio.com/reviews");
	var name = $("#review input[name=name]").val();
	var conference  = $("#review select[name=speaker]").val();
	var performance = $("#review input[name=performance]:checked").val();
	var content = $("#review input[name=quality]:checked").val();;
	var entertaining = $("#review input[name=entertaining]:checked").val();;
	var actionable = $("#review input[name=actionable]:checked").val();;
	var comments = $("#review textarea[name=comments]").val();;

	var valid = validateForm();
	console.log(conference, performance, content, entertaining, actionable, comments);

	if(valid){
		reviewsData.push({
			name: name,
			conference: conference,
			performance: performance,
			content: content,
			entertaining: entertaining,
			actionable: actionable,
			comments: comments
		});
		resetReviews();
		$.mobile.changePage($('#thankyou'),{transition:"slide"});
	}
}

function validateForm(){
	var conference  = $("#review select[name=speaker]").val();
	var performance = $("#review input[name=performance]:checked").val();
	var content = $("#review input[name=quality]:checked").val();;
	var entertaining = $("#review input[name=entertaining]:checked").val();;
	var actionable = $("#review input[name=actionable]:checked").val();;

	if((conference == null)||(performance == undefined)||(entertaining == undefined)||(actionable = undefined)){
		if(conference == null){
			$("#review select[name=speaker]").addClass("invalid");
		}
		if(performance == null){
			$("#performance_label").addClass("invalid");
		}
		if(content == null){
			$("#content_label").addClass("invalid");
		}
		if(entertaining == null){
			$("#entertaining_label").addClass("invalid");
		}
		if(actionable == null){
			$("#actionable_label").addClass("invalid");
		}
		if($("#alert").css("display") == "none"){
			$("#alert").slideToggle();
		} 
		return false;
	}else{
		return true;
	}
}

function loadSpeakers(){
	$("#speakers .speakers_list").empty();
	$("#speakers .speakers_list").html("");
	data.on('value',function(snapshot){
		var allSpeakers = snapshot.val().speakers;

		for(var i=0; i<allSpeakers.length; i++){
			var a = document.createElement("a");
			$(a).attr("href","javascript:loadBio("+i+");");
			$(a).appendTo($("#speakers .speakers_list"));

			var li = document.createElement("li");
			$(li).appendTo(a);

			var img = document.createElement("div");
			$(img).addClass("speaker_img");
			$(img).css("background-image","url('css/images/speakers/"+allSpeakers[i].image+"')");
			$(img).appendTo(li);

			var name = document.createElement("div");
			$(name).addClass("name");
			$(name).html(allSpeakers[i].name);
			$(name).appendTo(li);

			var position = document.createElement("div");
			$(position).addClass("position");
			var length = checkLength(allSpeakers[i].position);
			if(length) $(name).css("padding-top","3px");
			$(position).html(allSpeakers[i].position);
			$(position).appendTo(li);
		}
	});
}

function checkLength(string){
	if(string.length > 35){
		return true;
	}else{
		return false;
	}
	
}

function loadBio(id){
	data.on('value', function(snapshot){
		agenda = snapshot.val().agenda;
		var allSpeakers = snapshot.val().speakers;

		$("#speaker_bio .m1 img").attr("src","css/images/speakers/diamond/"+allSpeakers[id].image);
		$("#speaker_bio .speaker_images .title").html(allSpeakers[id].name);
		$("#speaker_bio .twitter").html(allSpeakers[id].twitter);

		$("#speaker_bio .description").empty();
		var bio = document.createElement("p");
		$(bio).html(allSpeakers[id].bio);
		$(bio).appendTo($("#speaker_bio .description"));
		var p = document.createElement("p");
		if(allSpeakers[id].gender == "m"){
			$(p).html("Don't miss out his talks listed below:");
		}else{
			$(p).html("Don't miss out her talks listed below:");
		}
		$(p).appendTo($("#speaker_bio .description"));

		$("#speaker_bio .agenda").empty();

		for(var i=0; i< agenda.length; i++){
			if(agenda[i].type == "conference"){
				for(var j= 0; j< agenda[i].speakers.length; j++){
					if(agenda[i].speakers[j] == id){
						var a = document.createElement("a");
						$(a).appendTo($("#speaker_bio .agenda"));
						$(a).attr("href","javascript:loadConference("+i+");")

						var li = document.createElement("li");
						$(li).appendTo(a);

						var time = document.createElement("div");
						$(time).addClass("time");
						$(time).html(agenda[i].time);
						$(time).appendTo(li);

						var title = document.createElement("div");
						$(title).addClass("title");
						$(title).html(agenda[i].title);
						$(title).appendTo(li);
					}
				}
			}
		}
	});
	$.mobile.changePage($('#speaker_bio'),{transition:"slide"});
}

function resetReviews(){
	$("#review input[type=radio]").each(function(){
		$(this).attr("checked",false);
	});

	$("#review textarea").val("");

	$("#review input").removeClass("invalid");
	$("#review select").removeClass("invalid");
	$("#alert").css("display","none");
}


