$(document).on("pageinit","#agenda",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#speaker",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#extra",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#review",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#speakers",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#speaker_bio",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
});
$(document).on("pageinit","#info",function(){
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var pageHeight = Math.ceil(((height - 115)*100)/height);
	$(".sub-page-content").css("max-height", pageHeight + "%");
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
	$("#review input[name=entertaining]").change(function(){
		$("#entertaining_label").removeClass("invalid");
	});
	$("#review input[name=actionable]").change(function(){
		$("#actionable_label").removeClass("invalid");
	});
	$("#review input[name=advanced]").change(function(){
		$("#advanced_label").removeClass("invalid");
	});

});

$(document).on("pageinit","#speaker", function(){
	$("#speaker").on("swiperight",function(event){
		$.mobile.changePage($('#agenda'),{transition:"slide", reverse: true});
	})
});

$(document).on("pageinit","#extra", function(){
	$("#extra").on("swiperight",function(event){
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
	$("#agenda .sub-page-content").on("scroll",function(){
		checkDate();
	});	
});

$(document).on("pagecreate","#review",function(){
	if($("#review form select[name=speaker]").html() == false){
		loadReviews();
	}
});

$(document).on("pagecreate","#speakers",function(){
	loadSpeakers();
});

$(document).on("pagebeforeshow","#twitter",function(){
	loadTwitter(last);
	$("#twitter .sub-page-content").on("scroll",function(){
		lazyLoad();
	});	
});

var iframesrc = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2602.6362667748645!2d-123.114781!3d49.283289100000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867178c58de583%3A0x13b07c95f3aaa412!2s560+Seymour+St!5e0!3m2!1ses!2sca!4v1404760373315";
$(document).on("pagebeforeshow","#extra",function(){

	$("#extra iframe").remove();
	
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	afterHeight = height - 60;

	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	afterWidth = width - 30;

	var iframe = document.createElement("iframe");
	$(iframe).attr({
		src: iframesrc,
		frameborder: "0",
		style: "border:0",
		seamless : true,
		height: afterHeight,
		width: afterWidth
	});
	$(iframe).appendTo($("#mapPopup"));

	
	$("#extra iframe").css("height", afterHeight + "px");
	
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

$(document).on("pagecreate","#info",function(){
	loadInfo();
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
	alert("this is trying to load agenda");
	alert(navigator.onLine);
	if (navigator.onLine) {
		alert("You are online");
		var data = new Firebase("https://cta-conf.firebaseio.com/");
		data.on('value', function(snapshot){
			agenda = snapshot.val().agenda;
			var speakers = snapshot.val().speakers;
			
			var agendaUl = $("#agenda ul.agenda");
			var date = "Online, September 11";

			$("#agenda ul.agenda").empty();
			
			for(var i in agenda){
				if(agenda[i].date != date){
					var label = document.createElement("label");
					$(label).html(agenda[i].date+"<sup>th</sup>");
					$(label).appendTo(agendaUl);
					date = agenda[i].date;
				}
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

					case "extra":

						var link = document.createElement("a");
						$(link).attr("href","javascript:loadExtra("+i+")");
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
						for(var j in agenda[i].speakers){
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
	}else{
		alert("no network");
		var agenda = localData.agenda;
		var speakers = localData.speakers;
		
		var agendaUl = $("#agenda ul.agenda");
		var date = "Thursday, September 11";

		$("#agenda ul.agenda").empty();
		
		for(var i in agenda){
			if(agenda[i].date != date){
				var label = document.createElement("label");
				$(label).html(agenda[i].date+"<sup>th</sup>");
				$(label).appendTo(agendaUl);
				date = agenda[i].date;
			}
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

				case "extra":

					var link = document.createElement("a");
					$(link).attr("href","javascript:loadExtra("+i+")");
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
					for(var j in agenda[i].speakers){
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
	}
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
	if (navigator.onLine) {
		var data = new Firebase("https://cta-conf.firebaseio.com/");
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
				$(image).attr("src","css/images/speakers/diamond/"+allSpeakers[agenda[id].speakers[i]].image);
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
			if(agenda[id].speakers.length > 1){
				var speakersList = "";
				for(var j=0; j<agenda[id].speakers.length; j++){
					console.log(allSpeakers[agenda[id].speakers[j]].name);
					var name = justName(allSpeakers[agenda[id].speakers[j]].name);
					console.log(name);
					if(j != agenda[i].speakers.length - 1){
						speakersList += " + ";
					}
					speakersList += name;
				}
				console.log(speakersList);
				$(button).attr("href","javascript:loadReviews('"+speakersList+"');");
				
			}else{
				$(button).attr("href","javascript:loadReviews('"+allSpeakers[agenda[id].speakers[0]].name+"');");
			}
		});
	} else {
		var agenda = localData.agenda;
		var allSpeakers = localData.speakers;

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
			$(image).attr("src","css/images/speakers/diamond/"+allSpeakers[agenda[id].speakers[i]].image);
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
		if(agenda[id].speakers.length > 1){
			var speakersList = "";
			for(var j=0; j<agenda[id].speakers.length; j++){
				console.log(allSpeakers[agenda[id].speakers[j]].name);
				var name = justName(allSpeakers[agenda[id].speakers[j]].name);
				console.log(name);
				if(j != agenda[i].speakers.length - 1){
					speakersList += " + ";
				}
				speakersList += name;
			}
			console.log(speakersList);
			$(button).attr("href","javascript:loadReviews('"+speakersList+"');");
			
		}else{
			$(button).attr("href","javascript:loadReviews('"+allSpeakers[agenda[id].speakers[0]].name+"');");
		}
	}

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
	$(option).html("Select Speaker");
	$(option).attr("disabled",true);
	if(speaker == -1) $(option).attr("selected",true);
	$(option).appendTo(select);

	if (navigator.onLine) {
		var data = new Firebase("https://cta-conf.firebaseio.com/");
		data.on('value', function(snapshot){
			agenda = snapshot.val().agenda;
			var allSpeakers = snapshot.val().speakers;

			for(var i=0; i<agenda.length; i++){
				if(agenda[i].type == "conference"){
					var option = document.createElement("option");
					var speakers = "";
					for(var j=0; j<agenda[i].speakers.length; j++){
						if(agenda[i].speakers.length > 1){
							var opt = document.createElement("option");
							$(opt).html(allSpeakers[agenda[i].speakers[j]].name);
							$(opt).attr("value",allSpeakers[agenda[i].speakers[j]].name);
							$(opt).attr("data-role","none");
							$(opt).appendTo(select);
							var name = justName(allSpeakers[agenda[i].speakers[j]].name);
							speakers += name;
							if(j != agenda[i].speakers.length - 1){
								speakers += " + ";
							}
						}else{
							speakers += allSpeakers[agenda[i].speakers[j]].name;
						}
						
					}
					$(option).html(speakers);
					$(option).attr("value",speakers);
					$(option).attr("data-role","none");
					$(option).appendTo(select);
				}
			}

			$("#review form select[name=speaker] option").each(function(){
				if($(this).attr("value") == speaker){
					$(this).attr("selected",true);
				}
			});

			if(speaker != -1){
				$.mobile.changePage($('#review'),{transition:"slide"});
			}
		});
	} else {
		var agenda = localData.agenda;
		var allSpeakers = localData.speakers;

		for(var i=0; i<agenda.length; i++){
			if(agenda[i].type == "conference"){
				var option = document.createElement("option");
				var speakers = "";
				for(var j=0; j<agenda[i].speakers.length; j++){
					if(agenda[i].speakers.length > 1){
						var opt = document.createElement("option");
						$(opt).html(allSpeakers[agenda[i].speakers[j]].name);
						$(opt).attr("value",allSpeakers[agenda[i].speakers[j]].name);
						$(opt).attr("data-role","none");
						$(opt).appendTo(select);
						var name = justName(allSpeakers[agenda[i].speakers[j]].name);
						speakers += name;
						if(j != agenda[i].speakers.length - 1){
							speakers += " + ";
						}
					}else{
						speakers += allSpeakers[agenda[i].speakers[j]].name;
					}
					
				}
				$(option).html(speakers);
				$(option).attr("value",speakers);
				$(option).attr("data-role","none");
				$(option).appendTo(select);
			}
		}

		$("#review form select[name=speaker] option").each(function(){
			if($(this).attr("value") == speaker){
				$(this).attr("selected",true);
			}
		});

		if(speaker != -1){
			$.mobile.changePage($('#review'),{transition:"slide"});
		}
	}	
}

function justName(name){
	var space = name.indexOf(" ");
	var justname = name.substring(0,space);
	return justname;
}

function submitReview(){
	if (navigator.onLine) {
		var reviewsData = new Firebase("https://cta-conference.firebaseio.com/reviews");
		var name = $("#review input[name=name]").val();
		var conference  = $("#review select[name=speaker]").val();
		var advanced = $("#review input[name=advanced]:checked").val();
		var entertaining = $("#review input[name=entertaining]:checked").val();
		var actionable = $("#review input[name=actionable]:checked").val();;
		var comments = $("#review textarea[name=comments]").val();;

		var valid = validateForm();

		if(valid){
			reviewsData.push({
				name: name,
				conference: conference,
				entertaining: entertaining,
				actionable: actionable,
				advanced: advanced,
				comments: comments
			});
			resetReviews();
			$.mobile.changePage($('#thankyou'),{transition:"slide"});
		}
	} else{
		alert("Sorry, you can't submit a review without network connection.")
	}
}

function validateForm(){
	var conference  = $("#review select[name=speaker]").val();
	var advanced = $("#review input[name=advanced]:checked").val();
	var entertaining = $("#review input[name=entertaining]:checked").val();;
	var actionable = $("#review input[name=actionable]:checked").val();;

	if((conference == null)||(advanced == undefined)||(entertaining == undefined)||(actionable = undefined)){
		if(conference == null){
			$("#review select[name=speaker]").addClass("invalid");
		}
		if(advanced == undefined){
			$("#advanced_label").addClass("invalid");
		}
		if(entertaining == undefined){
			$("#entertaining_label").addClass("invalid");
		}
		if(actionable == undefined){
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
	if (navigator.onLine) {
		var data = new Firebase("https://cta-conf.firebaseio.com/");
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
	} else {
		var allSpeakers = localData.speakers;

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
	}
}

function checkLength(string){
	if(string.length > 35){
		return true;
	}else{
		return false;
	}
	
}

function loadBio(id){
	if (navigator.onLine) {
		var data = new Firebase("https://cta-conf.firebaseio.com/");
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
	} else {
		var agenda = localData.agenda;
		var allSpeakers = localData.speakers;

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
	}
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
var last = undefined;

function loadTwitter(lastTweet){
	if (navigator.onLine) {
		if(lastTweet == undefined){
			var allTweets = twitter.limit(10);
		}else{
			var allTweets = twitter.limit(11).endAt(null,lastTweet);
		}

		var allTweets = new Firebase("https://cta-conf.firebaseio.com/tweets");
		allTweets.on('value', function(snapshot){
			tweets = snapshot.val();
			console.log(tweets);
			var ul = $("#tweets");
			var tweetsArray = [];
			last = undefined;
			//$(ul).empty();
			for(var i in tweets){
				if(last == undefined) last = i;
				console.log(last);
				var li = document.createElement("li");
				//$(li).prependTo(ul);
				tweetsArray.unshift(li);

				var img = document.createElement("img");
				$(img).attr("src",tweets[i].user__profile_image_url);
				$(img).appendTo(li);

				var content = document.createElement("div");
				$(content).addClass("content");
				$(content).appendTo(li);

				var date = document.createElement("div");
				var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
				var fullDate = new Date(tweets[i].created_at);
				var month = months[fullDate.getMonth()];
				var day = fullDate.getUTCDate();
				var hour = fullDate.getHours();
				var minutes = fullDate.getMinutes();
				if(minutes < 10){
					minutes = "0"+minutes.toString();
				}
				var newDate = month+" "+day+" at "+hour+":"+minutes;
				$(date).addClass("date");
				$(date).html(newDate);
				$(date).appendTo(content);

				var name = document.createElement("div");
				$(name).addClass("name");
				$(name).html(tweets[i].user__name);
				$(name).appendTo(content);

				var username = document.createElement("div");
				$(username).addClass("username");
				$(username).html("@"+tweets[i].user__screen_name);
				$(username).appendTo(content);

				var text = document.createElement("div");
				$(text).addClass("text");
				$(text).appendTo(content);

				var p = document.createElement("p");
				var plain = tweets[i].text;
				var ctaconf = plain.replace("#ctaconf","<span class='ctaconf'>#ctaconf</span>");
				var CTAConf = ctaconf.replace("#CTAConf","<span class='ctaconf'>#CTAConf</span>");
				var unbounce = CTAConf.replace("@unbounce","<span class='ub'>@unbounce</span>");
				$(p).html(unbounce);
				$(p).appendTo(text);
			}
			if(lastTweet == undefined){
				for(var i = 0; i < tweetsArray.length; i++){
					console.log(tweetsArray);
					$(tweetsArray[i]).appendTo(ul);
				}
			}else{
				for(var i = 1; i < tweetsArray.length; i++){
					console.log(tweetsArray);
					$(tweetsArray[i]).appendTo(ul);
				}
			}
			$(".spinner").css("display","none");
			var load = $("#loadMore");
			$(load).attr("href","javascript:loadTwitter('"+last+"')");
		});
	}
}


function lazyLoad(){

	var scroll = $("#twitter .sub-page-content").scrollTop();
	var divHeight = $("#twitter .sub-page-content").height();
	var ulHeight = $("#tweets").height();
	var bottom = ulHeight - divHeight + 70 - scroll;
	console.log(bottom);
	if(bottom == 20){
		$(".spinner").css("display","block");
		setTimeout('loadTwitter(last)',3000);
		//loadTwitter(last);
	} 
}

function loadExtra(id){
	var extra = $("#extra .sub-page-content");
	$(extra).empty();
	if (navigator.onLine) {
		var data = new Firebase("https://cta-conf.firebaseio.com/");
		data.on('value', function(snapshot){
			agenda = snapshot.val().agenda;
			iframesrc = agenda[id].map;
			var img = document.createElement("img");
			$(img).attr("src",agenda[id].image);
			$(img).appendTo(extra);
			
			var title = document.createElement("div");
			$(title).addClass("title");
			$(title).html(agenda[id].title);
			$(title).appendTo(extra);

			var h2 = document.createElement("div");
			$(h2).addClass("h2");
			$(h2).html(agenda[id].h2);
			$(h2).appendTo(extra);

			var address = document.createElement("div");
			$(address).addClass("address");
			$(address).html(agenda[id].address);
			$(address).appendTo(extra);

			var button = document.createElement("a");
			$(button).attr("href","#mapPopup");
			$(button).attr("data-rel","popup");
			$(button).addClass("button");
			$(button).html("View Map");
			$(button).appendTo(extra);

			if(agenda[id].description != ""){
				var hr = document.createElement("hr");
				$(hr).appendTo(extra);

				var text = document.createElement("div");
				$(text).addClass("text");
				$(text).html(agenda[id].description);
				$(text).appendTo(extra);

				var ul = document.createElement("ul");
				$(ul).addClass("questions");
				$(ul).appendTo(extra);

				for(var x in agenda[id].questions){
					var li = document.createElement("li");
					$(li).appendTo(ul);

					var q = document.createElement("div");
					$(q).addClass("question");
					$(q).html(agenda[id].questions[x].q);
					$(q).appendTo(li);

					var a = document.createElement("div");
					$(a).addClass("answer");
					$(a).html(agenda[id].questions[x].a);
					$(a).appendTo(li);
				}
			}
		});
	} else {
		var agenda = localData.agenda;
		iframesrc = agenda[id].map;
		var img = document.createElement("img");
		$(img).attr("src",agenda[id].image);
		$(img).appendTo(extra);
		
		var title = document.createElement("div");
		$(title).addClass("title");
		$(title).html(agenda[id].title);
		$(title).appendTo(extra);

		var h2 = document.createElement("div");
		$(h2).addClass("h2");
		$(h2).html(agenda[id].h2);
		$(h2).appendTo(extra);

		var address = document.createElement("div");
		$(address).addClass("address");
		$(address).html(agenda[id].address);
		$(address).appendTo(extra);

		var button = document.createElement("a");
		$(button).attr("href","#mapPopup");
		$(button).attr("data-rel","popup");
		$(button).addClass("button");
		$(button).html("View Map");
		$(button).appendTo(extra);

		if(agenda[id].description != ""){
			var hr = document.createElement("hr");
			$(hr).appendTo(extra);

			var text = document.createElement("div");
			$(text).addClass("text");
			$(text).html(agenda[id].description);
			$(text).appendTo(extra);

			var ul = document.createElement("ul");
			$(ul).addClass("questions");
			$(ul).appendTo(extra);

			for(var x in agenda[id].questions){
				var li = document.createElement("li");
				$(li).appendTo(ul);

				var q = document.createElement("div");
				$(q).addClass("question");
				$(q).html(agenda[id].questions[x].q);
				$(q).appendTo(li);

				var a = document.createElement("div");
				$(a).addClass("answer");
				$(a).html(agenda[id].questions[x].a);
				$(a).appendTo(li);
			}
		}
	}

	$("#extra .questions li").on("tap",function(){
		if($(this).hasClass("open")){
			$(this).removeClass("open");
		}else{
			$(this).addClass("open");
		}
		$(this).children(".answer").slideToggle(400);
	})
	
	$.mobile.changePage($("#extra"),{transition:"slide"});
}

function checkDate(){
	var scroll = $("#agenda .sub-page-content").scrollTop();
	if(scroll > 100){

		$("#agenda #header_main label").html("Friday, September 12<sup>th</sup>");
	}else{
		$("#agenda #header_main label").html("Thursday, September 11<sup>th</sup>");
	}
}

function loadInfo(){
	if (navigator.onLine) {
		var wifi = new Firebase("https://cta-conf.firebaseio.com/wifi");
		wifi.on('value', function(snapshot){
			wifi = snapshot.val();
			
			var network = document.createElement("p");
			$(network).html("<span>Network:</span> "+wifi.network);
			$(network).appendTo($("#info .wifi"));

			var password = document.createElement("p");
			$(password).html("<span>Password:</span> "+wifi.password);
			$(password).appendTo($("#info section.wifi"));
		});
	} else {
		wifi = localData.wifi;
			
		var network = document.createElement("p");
		$(network).html("<span>Network:</span> "+wifi.network);
		$(network).appendTo($("#info .wifi"));

		var password = document.createElement("p");
		$(password).html("<span>Password:</span> "+wifi.password);
		$(password).appendTo($("#info section.wifi"));
	}
}

