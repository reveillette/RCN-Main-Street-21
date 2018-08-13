// Set Global variables here
var searchSlide = '-200px';

// Site functions 
(function ($) {  // NOTE: all $(document).ready functions must be written this way for jQuery to work on a Drupal installation!!
	$(document).ready(function() {

		// --------------------------------------------------------------
		// Begin functions that perform outside ajax complete


		// Replace search text with search icon in menu
		var searchLink = $("#navbar li>a:contains('Search')");
		searchLink.html("<span class='glyphicon glyphicon-search' aria-hidden='true'></span>").attr('id', 'main-menu-search-link').attr('href', '#').css('padding-right', '0');			

		// Format navbar search form 

			// Replace search bar button icon with arrow
			$(".region-navigation #search-block-form .input-group-btn span").removeClass('glyphicon-search').addClass('glyphicon-circle-arrow-right');
			// Set search form input params
			$(".region-navigation #search-block-form input[type='text']").attr({
				size: "25",
				title: "Type a search term and hit enter",
				placeholder: "Search..."
			});
		
		// Replace user text with user icon in menu
		$("#navbar li>a:contains('User')").html("<span class='glyphicon glyphicon-user' aria-hidden='true'></span><span class='caret'></span>");			

		// Main menu search bar slideout
		$("#main-menu-search-link").click(function(e) {
			searchLink.toggleClass('active');
			var searchbar = $("#block-search-form #search-block-form");
			searchbar.fadeToggle();
			if (searchbar.css('left') != searchSlide) {
				searchbar.animate({
					left: searchSlide
				}, { 
					complete: function() {
						$("#block-search-form").css('overflow', 'hidden');
					}
				});
				console.log('search sliding in...');
			} else if (searchbar.css('left') == searchSlide) {
				searchbar.animate({
					left: '0'
				}, {
					complete: function() {
						$("#block-search-form").css('overflow', 'visible');
					}
				});
				console.log('search sliding out...');
			}
			
		});
		// Change name of content dashboard page 
		$(".page-admin-content .page-header").text("Content Dashboard");
		$(".page-admin-content .breadcrumb li.active").text("Content Dashboard");

		// Turn media browser links into buttons 
		$(".media-widget a.browse").addClass('btn btn-primary');

		// --------------------------------------------------------------
		// Begin functions that perform on page refresh AND ajax complete

		
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



