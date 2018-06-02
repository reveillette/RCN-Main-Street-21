// Set Global variables here


// Site functions 
(function ($) {  // NOTE: all $(document).ready functions must be written this way for jQuery to work on a Drupal installation!!
	$(document).ready(function() {

		// --------------------------------------------------------------
		// Begin functions that perform outside ajax complete


		// Replace search text with search icon in menu
		$("#navbar li>a:contains('Search')").html("<span class='glyphicon glyphicon-search' aria-hidden='true'></span>");			

		// Replace user text with user icon in menu
		$("#navbar li>a:contains('User')").html("<span class='glyphicon glyphicon-user' aria-hidden='true'></span><span class='caret'></span>");			

		// Add placeholder print button to Project and Best Practice full view page
		$(".page-node.node-type-project:not('.node-type-edit') #block-system-main .group-left").append("<button class='btn btn-primary' id='download-pdf'>Download PDF</button>");
		$(".page-node.node-type-best-practice:not('.node-type-edit') #block-system-main .group-left").append("<button class='btn btn-primary' id='download-pdf'>Download PDF</button>");


		// --------------------------------------------------------------
		// Begin functions that perform on page refresh AND ajax complete

			// CODE GOES HERE

		
		// End functions that perform on page refresh AND ajax complete

		f.init();

	});

	// Perform function set on ajax complete
    $(document).ajaxComplete(function(e) {
	    e.stopPropagation();
	    f.init();
	});

    // Functions that perform on page refresh AND ajax complete
	var f = (function() {

	    var obj = {};
	    obj.init = function () {		

			// Sitewide interface

			
		}

					                                          

	    return obj;
	
	})();
	

})(jQuery);



