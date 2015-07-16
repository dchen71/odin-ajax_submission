//Initializes the hiding and showing of the loading picture upon ajax
$(document).ready(function () {
	$('.loading').hide();
	$(document)
	    .ajaxStart(function() {
    		$('.content').empty();
	        $('.loading').show();
	    })
	    .ajaxStop(function() {
	        $('.loading').hide();
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

	const head = '<div class="col-md-4 col-md-offset-4 well"><section>'
	const foot = '</section></div>'
	if(data.Response == "False"){
    	var response = '<p>No movies found</p>';
    	$('.content').append(head + response + foot);
	}
	else{
		var title = data.Title;
		var year = data.Year;
		var rating = data.Rated;
		var runtime = data.Runtime;
		var genre = data.Genre;
		var plot = data.Plot;
		var language = data.Language;
		var awards = data.Awards;
		var poster = data.Poster;
		var rating = data.imdbRating;

        var header = '<header class="content-header">' + 
        				'<h2>' + title + '</h2>' + 
        				'<hr>' + 
        				'<p class="col-md-4"><strong>Year:</strong> <em>' + year + '</em></p>' + 
        				'<p class="col-md-4"><strong>Runtime:</strong> <em>' + runtime + '</em></p>' + 
        				'<p class="col-md-4"><strong>Rating:</strong> <em>' + rating + '</em></p>'
        			'</header>';

    	var aside = '<div class="pull-right">' + 
    					'<aside class="pull-left text-left col-md-5 pic-info">' + 
    						'<img src="' + poster + '">' +
    						'<p class="col-md-offset-2"><strong>imdbRating:</strong>' + rating + '</p>' +
    					'</aside>';
    	var body = '<p><strong>Plot:</strong>' + plot + '</p>' +
        	       '<p><strong>Genre:</strong>' + genre + '</p>' +
        	       '<p><strong>Language:</strong>' + language + '</p>' +
        	       '<p><strong>Awards:</strong>' + awards + '</p>' +
        	     '</div>'
    	$('.content').append(head + header + aside + body + foot);    	
	}
};

//On submit of value, will perform the ajax search
$('#moviesearch').submit(function(){
	var title = document.getElementById('movietitle').value;
	ajaxSearch(title);
	return false;
});