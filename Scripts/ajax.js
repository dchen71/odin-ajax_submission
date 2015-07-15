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
    	success: function( json ) {
    	    console.log(json);
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

//On submit of value, will perform the ajax search
$('#moviesearch').submit(function(){
	var title = document.getElementById('movietitle').value;
	ajaxSearch(title);
	return false;
});