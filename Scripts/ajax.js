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

//Global for header and footer for the content views
const head = '<div class="col-md-4 col-md-offset-4 well"><section>'
const foot = '</section></div>'

//Performs the ajax search that will create the entries
function ajaxSearch(id){

	$.ajax({
 
    	// The URL for the request
    	url: "http://www.omdbapi.com/?i=" + id + "&r=json",
 
    	// Whether this is a POST or GET request
    	type: "GET",
 
    	// The type of data we expect back
    	dataType : "json",
 
    	// Code to run if the request succeeds;
    	// the response is passed to the function
    	success: function(json) {
    	    console.log(json);
			if(json.Response == "False"){
    			var response = '<p>No movies found</p>';
    			$('.content').append(head + response + foot);
			}
			else {
				createEntry(json); 	    	
			}

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

//Collects the title ids from the json request
function ajaxInfo(title){

	$.ajax({
 
    	// The URL for the request
    	url: "http://www.omdbapi.com/?s=" + title + "&type=movie&r=json",
 
    	// Whether this is a POST or GET request
    	type: "GET",
 
    	// The type of data we expect back
    	dataType : "json",
 
    	// Code to run if the request succeeds;
    	// the response is passed to the function
    	success: function(json) {
    	    console.log(json);
			if(json.Response == "False"){
    			var response = '<p>No movies found</p>';
    			$('.content').append(head + response + foot);
			}
			else {
				if(json.length > 10)
					var max = 10;
				else
					var max = json.length;
				for(var i=0; i< 10; i++){
					console.log(json.Search[i]);
					ajaxSearch(json.Search[i].imdbID);
				}
			}

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

//Creates the data to append to the body showing each content for movie
function createEntry(data){
	var title = data.Title;
	var year = data.Year;
	var rating = data.Rated;
	var runtime = data.Runtime;
	var genre = data.Genre;
	var plot = data.Plot;
	var language = data.Language;
	var awards = data.Awards;
	var rating = data.imdbRating;
	if (data.Poster == 'N/A')
		var poster = "Images/NA.png";
	else
		var poster = data.Poster;


	//Contains the title and generatl information
    var header = '<header class="content-header">' + 
    				'<h2>' + title + '</h2>' + 
    				'<hr>' + 
    				'<p class="col-md-4"><strong>Year:</strong> <em>' + year + '</em></p>' + 
    				'<p class="col-md-4"><strong>Runtime:</strong> <em>' + runtime + '</em></p>' + 
    				'<p class="col-md-4"><strong>Rating:</strong> <em>' + rating + '</em></p>'
    			'</header>';

    //Shows the picture and creates the main div
    var aside = '<div">' + 
    				'<aside class="pull-left text-left col-md-5 pic-info">' + 
    					'<img src="' + poster + '">' +
    					'<p class="col-md-offset-2"><strong>imdbRating:</strong>' + rating + '</p>' +
    				'</aside>';
    
    //Main body of the div in aside
    var body = '<div class="text-left">' + 
    		   		'<p><strong>Plot:</strong>' + plot + '</p>' +
       	       		'<p><strong>Genre:</strong>' + genre + '</p>' +
       	       		'<p><strong>Language:</strong>' + language + '</p>' +
       	       		'<p><strong>Awards:</strong>' + awards + '</p>' +
       	       '</div>'
       	     '</div>'
    
    $('.content').append(head + header + aside + body + foot);    	
};

//On submit of value, will perform the ajax search
$('#moviesearch').submit(function(){
	var title = document.getElementById('movietitle').value;
	ajaxInfo(title);
	return false;
});