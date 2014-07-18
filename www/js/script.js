
$(document).on("pagebeforeshow","#agenda",function(){
		loadAgenda();
		
});

$(document).on("pageinit","#agenda",function(){
		bindAgenda();
});

function loadAgenda(){
	var agendaUl = $("#agenda ul.agenda");
	$("#agenda ul.agenda").empty();
	for(var i=0; i<agenda.length; i++){
		var link = document.createElement("a");
		$(link).attr("href","javascript:loadSpeaker("+i+");");
		$(link).appendTo(agendaUl);

		var li = document.createElement("li");
		$(li).attr("data-speaker",i);
		$(li).appendTo(link);

		var time = document.createElement("div");
		$(time).addClass("time");
		$(time).html(agenda[i].time);
		$(time).appendTo(li);

		var title = document.createElement("div");
		$(title).addClass("title");
		var titletext = titleoverflows(agenda[i].title);
		$(title).html(titletext);
		$(title).appendTo(li);

		var speaker = document.createElement("div");
		$(speaker).addClass("speaker");
		var speakers = agenda[i].speakers;
		var speakersName = "";
		for(var j = 0; j < agenda[i].speakers.length; j++){
			speakersName = speakersName + speakers[j].name;
			if((speakers.length > 1) && (j != speakers.length -1)){
				speakersName += ", ";
			}
		}
		$(speaker).html(speakersName);
		$(speaker).appendTo(li);
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

function bindAgenda(){
	$("#agenda ul.agenda li").on("tap",function(){
		alert("speaker");
		loadSpeaker($(this).data("speaker"));
	});
}

function loadSpeaker(id){
	var speakers = agenda[id].speakers;
	var ul = $("#speaker .speakers");
	var images = $("#speaker .speaker_images");
	$(images).empty();
	$(ul).empty();

	for(var i = 0; i<speakers.length; i++){
		var mask = document.createElement("div");
		$(mask).addClass("mask m"+(i+1));
		var image = document.createElement("img");
		$(image).attr("src","css/images/speakers/"+speakers[i].image);
		$(image).appendTo(mask);
		$(mask).appendTo(images);

		var li = document.createElement("li");
		var speaker = speakers[i].name;
		speaker += ", " + speakers[i].position;
		$(li).html(speaker);
		$(li).appendTo(ul);
	}

	var title = agenda[id].title;
	$("#speaker .title").html(title);
	$("#speaker .description").html(agenda[id].description);

	$.mobile.changePage($('#speaker'),{transition:"slide"});
}