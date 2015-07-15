//Initializes the hiding and showing of the loading picture upon ajax
$(document).ready(function () {
	$('.loading').hide();
	$(document)
	    .ajaxStart(function() {
	        $('.loading').show();
	        console.log("showing");
	    })
	    .ajaxStop(function() {
	        $('.loading').hide();
	        console.log("hiding");
	    });
});

//Performs th ajax search returning json
function ajaxSearch(title){

	$.ajax({
 
    	// The URL for the request
    	url: "http://www.omdbapi.com/?t=" + title + "&r=json",
 
    	// Whether this is a POST or GET request
    	type: "GET",
 
    	// The type of data we expect back
    	dataType : "json",
 
    	// Code to run if the request succeeds;
    	// the response is passed to the function
    	success: function(json) {
    	    console.log(json);
    	    if(json.Response == "False")
    	    	createEntry(json); 	    	
    	},
 
    	// Code to run if the request fails; the raw request and
    	// status codes are passed to the function
    	error: function( xhr, status, errorThrown ) {
    	    alert( "Sorry, there was a problem!" );
    	    console.log( "Error: " + errorThrown );
    	    console.log( "Status: " + status );
    	    console.dir( xhr );
    	},
 
    	// Code to run regardless of success or failure
    	complete: function( xhr, status ) {
    	    console.log( "The request is complete!" );
    	}
	});
};

//Creates the data to append to the body
function createEntry(data){
	console.log('data is here');
	const head = '<div class="col-md-4 col-md-offset-4 well"><section>'
	const foot = '</section></div>'
	if(data.Response == "False"){
    	$('.movies').append(head + '<p>No movies found</p>' + foot);
   		 console.log('made it');
	}
	else{
		var title = data.Title;
		var year = data.Year;
		var rating = data.Rated;
		var release = data.Released;
		var runtime = data.Runtime;
		var genre = data.Genre;
		var plot = data.Plot;
		var language = data.Language;
		var awards = data.Awards;
		var poster = data.Poster;
	}
};

//On submit of value, will perform the ajax search
$('#moviesearch').submit(function(){
	var title = document.getElementById('movietitle').value;
	ajaxSearch(title);
	return false;
});