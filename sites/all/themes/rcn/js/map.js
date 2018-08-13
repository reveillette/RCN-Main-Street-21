if (typeof L !== 'undefined') {

// Set Global variables here
var domain = window.location.hostname;
var imgFolder = "/sites/all/themes/rcn/img/icons/"


var mapLayers = (function() {
        var mapLayers = null;
        jQuery.ajax({
            'async': false,
            'global': true,
            'url': "sites/all/themes/rcn/js/maplayers.js",
            'dataType': "json",
            'success': function (data) {
                mapLayers = data;
            }
        });
        return mapLayers;
    })();



var categories = mapLayers.layers.map(function(a) { return a.category; });

var leafletLayerGroups = [];
var leafletLayers = [];
var mapboxAttribution = 'Overlays &copy; RCN 21st Centuries, Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>';
var baseLayers = {
	"Dark": L.tileLayer('https://api.mapbox.com/styles/v1/reveillette/cjelnhic4aeyk2qqqr544n3pk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV2ZWlsbGV0dGUiLCJhIjoidmZvYW11SSJ9.2WIhYoRgi7LZF1zOS2xUoA', {id: 'rcn', attribution: mapboxAttribution}),
	"Light": L.tileLayer('https://api.mapbox.com/styles/v1/reveillette/cjfu3te0x04sd2smixzakjicb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV2ZWlsbGV0dGUiLCJhIjoidmZvYW11SSJ9.2WIhYoRgi7LZF1zOS2xUoA', {id: 'light', attribution: mapboxAttribution}),
	"Satellite": L.tileLayer('https://api.mapbox.com/styles/v1/reveillette/cjfu3to0r8rb92snzstexd23k/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmV2ZWlsbGV0dGUiLCJhIjoidmZvYW11SSJ9.2WIhYoRgi7LZF1zOS2xUoA', {id: 'satellite', attribution: mapboxAttribution})

};

var networkIcon = imgFolder + "circle-stroked-15.svg";

// Style variables 
globalIconSize = 10;
globalHeatMapRadius = 15;
globalIconAnchor = [0,0]
globalPopupAnchor = [6,0]
brandPrimary = "#3399ff";
globalPolygonStrokeWeight = "0.25";
globalPolygonStrokeColor = 'white';
globalPolygonFillOpacity = 0.75;
globalLineStrokeWeight = "0.75";
globalThinLineStrokeWeight = "0.25";
globalBoldLineStrokeWeight = "2.0";
globalDashArraySolid = null;
globalDashArrayDashed = "4 2";
globalSimplifyFactor = 0.35;
gradientStart = "#061320";
gradientMid = "#3399ff";
gradientEnd = "#bbddff";
globalGradient = {0: gradientStart, 0.75: gradientMid, 1: gradientEnd};
globalLinearSvgGradient = "<linearGradient id='linearGradient' x1='0%' y1='100%' x2='0%' y2='0%'><stop offset='0%' style='stop-color:" + gradientStart + "; stop-opacity:" + globalPolygonFillOpacity + "'/><stop offset='100%' style='stop-color:" + gradientMid + "; stop-opacity:" + globalPolygonFillOpacity + "'/></linearGradient>";
globalRadialSvgGradient = "<radialGradient id='radialGradient' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'><stop offset='30%' style='stop-color:" + gradientEnd + "; stop-opacity:" + globalPolygonFillOpacity + "'/><stop offset='60%' style='stop-color:" + gradientMid + "; stop-opacity:" + globalPolygonFillOpacity + "'/><stop offset='100%'' style='stop-color:" + gradientStart + ";stop-opacity:0'/></radialGradient>";
legendIconSize = "height='15' width='15'";
legendCircleSize = "cx='7' cy='7' r=7";

var patternDefs = {
	whiteStripesDiagonal: new L.StripePattern({
		id: "whiteStripesDiagonal",
		weight: globalThinLineStrokeWeight,
		height: 3,
		color: "white",
		angle: -45
	}),
	blueStripesDiagonal: new L.StripePattern({
		id: "blueStripesDiagonal",
		weight: globalLineStrokeWeight,
		height: 3,
		color: brandPrimary,
		angle: -45
	})
}



var overlays = [];
    
(function ($) {

	// Leaflet map modifications and additions
	$(document).on('leaflet.map.load', function(e, map, lMap) {

	if ($("body").hasClass("page-network")) {

 		// Move zoom control to a new position
    	lMap.zoomControl.setPosition('bottomright');

    	// Add pattern/gradient definitions to map
    	for (var key in patternDefs) {
    		patternDefs[key].addTo(lMap); 
    	}

	    // Create Layers Control - basemaps
		    var basemapsControl = L.control.layers(baseLayers, null, {
		    	collapsed: false
		    })
		    basemapsControl.addTo(lMap);

		    // Add titles to Layers Control (basemaps)
			$(basemapsControl._container).prepend("<h5><a data-toggle='collapse' href='#Basemaps' aria-expanded='false' aria-controls='Basemaps'>Basemaps</a></h5>")
			$(basemapsControl._form).addClass('collapse').attr('id', 'Basemaps'); // Add Bootstrap Collapse to target


	    // Create Layers Control for each overlay category 
			categories = categories.unique();

			// Set up categories and layer filter
			for (i=0; i<categories.length; i++) {
				
				// Create leaflet layer groups by category
				leafletLayerGroups[i] = {name: categories[i], layerGroup: L.layerGroup()};

				// Add categories to overlays
				overlays[i] = {name: categories[i], overlay: {}};

			}

	    	refreshMap(lMap);

		    var overlayControls = [];

		    for (i=0; i<overlays.length; i++) {

		    	overlayControls[i] = L.control.layers(null, overlays[i].overlay, {
			    	collapsed: false,				    	
			    });

			    overlayControls[i].addTo(lMap);

				// Add titles and collapse to Layers Control (overlays)
			    $(overlayControls[i]._container).prepend("<h5><a data-toggle='collapse' href='#" + overlays[i].name + "' aria-expanded='false' aria-controls='" + overlays[i].name + "'>" + overlays[i].name.replace(/_/g," ") + "</a></h5>")
				$(overlayControls[i]._form).addClass('collapse').attr('id', overlays[i].name); // Add Bootstrap Collapse to target

			}

			// Add show/hide all to layers control 
			$(".leaflet-control-layers").each(function(i) {
				if (i>0) {
					$(this).find("h5").prepend("<input type='checkbox' class='leaflet-control-layers-selector leaflet-showhideall'></input>");
				}

				$(".leaflet-showhideall").click(function() {
					var checkboxes = $(this).parents('h5').siblings('form.leaflet-control-layers-list').find('input[type="checkbox"]');

					if (this.checked == false) {	// Box reading HIDE ALL is checked to hide all layers
						checkboxes.each(function(i) {
							if (this.checked == true) {	// If overlay controls are unchecked, click to check box and show
								this.click();	
							}
						});
						$(this).siblings('span').html("<strong>SHOW ALL</strong>");	// Change text to read SHOW ALL											
					} else { 							// Box reading SHOW ALL is checked to show all layers
						checkboxes.each(function(i) {
							if (this.checked == false) {	// If overlay controls are checked, click to uncheck box and hide
								this.click();	
							}
						});
						$(this).siblings('span').html("<strong>HIDE ALL</strong>");	// Change text to read HIDE ALL											
					}	
				});

			});

			// Uncheck (hide) overlays when Layers Control is collapsed
			// $(".leaflet-control-layers-list.collapse").on('hidden.bs.collapse', function () {
			//    var checkboxes = $(this).find("input.leaflet-control-layers-selector");
			//    checkboxes.each(function(i) {
			//    	if (this.checked == true) {
			// 		this.click();
			// 	   } 
			// 	});
			// });

			// Refresh Layers Control box when Layers Control is collapsed/expanded
			$(".leaflet-control-layers-list.collapse").on({
				'hidden.bs.collapse': function () { overlayControlsWidth(layersControlContainer); },
				'shown.bs.collapse': function () { overlayControlsWidth(layersControlContainer); }
			});




		// Append hide button to layers control container
		var layersControlContainer = $(".leaflet-top.leaflet-right");
		$(layersControlContainer).append("<div class='leaflet-control-layers-hide'><a id='hideme'>Hide</a></div>");
		$('#hideme').click(function(e) {
			var controlWidth = layersControlContainer.width();

			if ($(this).text() == "Hide") {
				$(this).text("Show");
				layersControlContainer.animate({
					right: controlWidth * -1
				});
			} else if ($(this).text() == "Show") {
				$(this).text("Hide");
				layersControlContainer.animate({
					right: 0
				});
			}
		});
	 		

    	// Set overlay controls container size
    	overlayControlsWidth(layersControlContainer);



			// Add Map Legend
				var legend = L.control({position: 'bottomleft'});
				legend.onAdd = function (map) {

				    var legend = L.DomUtil.create('div', 'legend');
					$(legend).append("<h4>Legend</h4>");
					$(legend).append("<div class='legend-group Network'><h6>Partners</h6><div class='legend-elem'><div class='legend-icon legend-marker'><img src='" + networkIcon + "'></div><label>RCN MainStreet21 Network Partners</label></div></div></div>");

					for (i=0; i<categories.length; i++) {
						var legendGroup = L.DomUtil.create('div', categories[i] + " legend-group", legend);
						$(legendGroup).append("<h6>" + categories[i].replace(/_/g," ") + "</h6>");
					}

					return legend;
				};
				legend.addTo(lMap);
		 
		// Functions to perform on map state change
			lMap.on({
				'zoom': function(e) {
					refreshMap(lMap);
				},
				'resize': function(e) {
					refreshMap(lMap);
					overlayControlsWidth(layersControlContainer);
				},
				'move': function(e) {
					refreshMap(lMap);
				},
				'overlayadd': function(e) {
					refreshLegend(e, legend);
				},
				'overlayremove': function(e) {
					refreshLegend(e, legend);
				}
			}); 

	}
	});

			

// ESRI Leaflet add layer functions
// Load map layers/refresh map layers
 	function refreshMap(lMap, legend) {
		
		// Add layers to layer groups, and sub-layers to layer filter
		for (i=0; i<mapLayers.layers.length; i++) {

				var layer = mapLayers.layers[i];
				var cat = layer.category;
			    var url = layer.url;
			    var name = layer.name;
			    var type = layer.type;
			    var iconUrl = imgFolder + layer.iconUrl;
			    var symbology = layer.symbology;
			    var symbol = layer.symbol;
			    var invert = layer.invert;
			    var property = layer.property;
			    var where = layer.where;
			    var popupTitle = layer.popupTitle;
			    var popupBody = layer.popupBody;

			// Create layers
		    if (type == 'point') {
		    	leafletLayers[i] = createMarkerLayer(lMap, layer, url, iconUrl, popupTitle, popupBody);
		    } else if (type == 'polygon') {
		    	leafletLayers[i] = createPolygonLayer(lMap, layer, url, symbology, symbol, invert, property, where, popupTitle, popupBody);
		    } else if (type == 'line') {
		    	leafletLayers[i] = createLineLayer(lMap, layer, url, symbol, property, where, popupTitle, popupBody);
		    } else if (type == 'heatmap') {
		    	leafletLayers[i] = createHeatLayer(lMap, layer, url, popupTitle, popupBody);
		    } else if (type == 'circle') {
		    	leafletLayers[i] = createCircleLayer(lMap, layer, url, symbol, property, popupTitle, popupBody);
		    }		    

		    // Create overlays
		    var targetOverlayObj = search(cat, overlays);
		    var targetOverlay = targetOverlayObj.overlay;
		    targetOverlay[name] = leafletLayers[i];

		    targetOverlay[name] = leafletLayers[i];

		}

	}



// Add Layers	

	// Add Marker Layer	//lMap, url, iconUrl
	function createMarkerLayer (lMap, layer, url, iconUrl, popupTitle, popupBody, iconSize, iconAnchor, popupAnchor) {
		if (iconSize == null) {
			iconSize = [globalIconSize,globalIconSize];
		} 

		if (iconAnchor == null) {
			iconAnchor = globalIconAnchor;
		} 

		if (popupAnchor == null) {
			popupAnchor = globalPopupAnchor;
		} 

		var icon = L.icon({
			iconUrl: iconUrl,
			iconSize: iconSize,
			iconAnchor: iconAnchor,
			popupAnchor: popupAnchor
		});

		var marker = L.esri.featureLayer({
	    	url: url,
	    	pointToLayer: function(geojson, latlng) {
	    		return L.marker(latlng, {
	    			icon: icon
	    		})
	    	}
	  	});

		spinner(marker, lMap);
		
		// Bind popups
		marker.bindPopup(function(l) {
			return createPopup(l, popupTitle, popupBody);
		});
		
		// Add legend element
		marker.on('load', function() {
			addMarkerLegendIcon(layer);
		});

		return marker;
	}
	
	// Add Heatmap Layer
	function createHeatLayer (lMap, layer, url, popupTitle, popupBody) {

		var heat = L.esri.Heat.featureLayer({
	    	url: url,
	    	radius: globalHeatMapRadius,
	    	gradient: globalGradient,
	    	blur: 15,
	    	max: 2,
	    	maxZoom: 12
	    });
		var iconStyle = {
			iconUrl: imgFolder + "dot.png",
			iconSize: globalIconSize,
			iconAnchor: globalIconAnchor,
			popupAnchor: globalPopupAnchor
		}
		var icon = L.icon(iconStyle);

		var marker = L.esri.featureLayer({
	    	url: url,
	    	pointToLayer: function(geojson, latlng) {
	    		return L.marker(latlng, {
	    			icon: icon
	    		})
	    	}
	  	});

	  	marker.on('load', function(icon) {
	  		// Add legend element
			addHeatmapLegendIcon(layer, iconStyle);
	  	});

	    spinner(heat, lMap);

	    // Bind popups
		marker.bindPopup(function(layer) {
			return createPopup(layer, popupTitle, popupBody);
		});

	    var group = L.layerGroup([marker, heat]);
   	    return group;
	}

	// Add Polygon Layer
	function createPolygonLayer (lMap, layer, url, symbology, symbol, invert, property, where, popupTitle, popupBody) {
		var propVals = [];
		var fillColor;

		var polygon = L.esri.featureLayer({
			url: url,
			simplifyFactor: globalSimplifyFactor,
			onEachFeature: function(feature) {
				var value = feature.properties[property];
				propVals.push(value);
			}			
		});

		if (where != null) {
			polygon.setWhere(where);
		}

	  	polygon.on('load', function() {
	 	 	polygon.setStyle( function(feature) {
				var value = feature.properties[property];
				var style; 

				if (symbology == 'single') {
					style =  polygonStyle(fillColor, symbol);					
				} else if (symbology == 'classify') {
					fillColor = classifyData(value, propVals, invert);
					style =  polygonStyle(fillColor, symbol);															
				}
				
				// Add legend element
				addPolygonLegendIcon(layer, style);

				return style;
			});
		});

		spinner(polygon, lMap);
		
		// Bind popups
		polygon.bindPopup(function(layer) {
			return createPopup(layer, popupTitle, popupBody);
		});

		return polygon;
	}

	// Add Line Layer
	function createLineLayer (lMap, layer, url, symbol, property, where, popupTitle, popupBody) {
		var propVals = [];
		var min;
		var max;
		var color;

		var line = L.esri.featureLayer({
			url: url,
			simplifyFactor: globalSimplifyFactor,
			onEachFeature: function(feature) {
				var value = feature.properties[property];
				propVals.push(value);
			}			
		});

		if (where != null) {
			line.setWhere(where);
		}

	  	line.on('load', function() {
	 	 	line.setStyle( function(feature) {
				var value = feature.properties[property];
				var style = lineStyle(symbol);

				// Add legend element
				addLineLegendIcon(layer, style);

				return style;
			});
		});

		spinner(line, lMap);
		
		// Bind popups
		line.bindPopup(function(layer) {
			return createPopup(layer, popupTitle, popupBody);
		});

		return line;
	}

	// Add Circle Layer
	function createCircleLayer (lMap, layer, url, symbol, property, popupTitle, popupBody) {
		var propVals = [];
		var radius;

		var circle = L.esri.featureLayer({
			url: url,
			onEachFeature: function(feature) {
				var value = feature.properties[property];
				if (!value) {
					value = 0;
				}
				propVals.push(value);
			},	
			pointToLayer: function(geojson, latlng) {
	    		return L.circleMarker(latlng, {
	    			radius: 15
	    		}); 
	    	}
					
		});

	  	circle.on('load', function() {
	 	 	circle.setStyle(function(feature) {
				var value = feature.properties[property];
				var fillPattern;
				var min = Math.min.apply(null, propVals);
				var max = Math.max.apply(null, propVals);
				var radius = map_range(feature.properties[property], min, max, 1, 100);
				var color;

				// set fill pattern
				if (symbol == "white-stripes-diagonal") {
					fillPattern = patternDefs.whiteStripesDiagonal;
					color = "white";
				} else if (symbol == "blue-stripes-diagonal") {
					fillPattern = patternDefs.blueStripesDiagonal;
					color = brandPrimary;
				}
		        
				var style =  {
				    fillPattern: fillPattern,
				    weight: globalPolygonStrokeWeight,
				    color: color,
				    stroke: globalPolygonStrokeWeight,
				    fillOpacity: globalPolygonFillOpacity,
				    radius: radius	
			    }; 
				
				// Add legend element
				addCircleLegendIcon(layer, style);

				return style;
			});
		});

		spinner(circle, lMap);
		
		// Bind popups
		circle.bindPopup(function(layer) {
			return createPopup(layer, popupTitle, popupBody);
		});

		return circle;
	}


// Popups
	function createPopup(layer, popupTitle, popupBody) {
  		var title = layer.feature.properties[popupTitle];
  		if (!title) {
  			return null;
  		}

  		var body = "";
  		for (var key in popupBody) {
				if (popupBody.hasOwnProperty(key)) {
					body = body + "<div><label>" + key + ":&nbsp;</label>" + layer.feature.properties[popupBody[key]] + "</div>";
				}
  		}
		return L.Util.template('<h6>' + title + '</h6>' + body, layer.feature.properties);

	}


// Legends

	function refreshLegend(e, lMap) {
	    var layerName = e.name;

	    if (e.type == "overlayadd") {
	    	// addLegendElement(layerName);
	    } else if (e.type == "overlayremove") {
	    	removeLegendElement(layerName)
	    }
	    var layerStyles = e.target;
	    var layerNames;

	}

	function addLegendElement(layer, iconHTML, style) {

		var id = layer.name;
		id = id.replace(/ /g,"_").replace(/\(|\)/g,"");

		var legendGroup = "div.legend ." + layer.category;
		var elem = document.getElementById(id);
		
		// Add legend element if it doesn't exist
		if (!elem) {
			var legendElement = "<div class='legend-elem' id='" + id + "'><label>" + layer.name + "</label></div>";
			var legendIcon = $(legendElement).appendTo(legendGroup);
			legendIcon.prepend(iconHTML);

			// Style icon
			if (style) {
				$(legendIcon).find('.legend-icon').css(style);
			}
		}

		// Show legend group if hidden
		if ($(legendGroup).css('display') == 'none') {
			$(legendGroup).css('display', 'inline-block');
		}
	}

	function removeLegendElement(layerName) {
		
		var elem = $("#" + layerName.replace(/ /g,"_").replace(/\(|\)/g,""));
		var legendGroup = elem.parent(".legend-group");
		
		// Remove legend element
		elem.remove();

		// Hide legend group if empty
		var elems = legendGroup.find(".legend-elem");

		if (elems.length == 0) {
			$(legendGroup).css('display', 'none');
		}
	}

	function addMarkerLegendIcon(layer) {
		
		var markerLegendIcon = "<div class='legend-icon legend-marker'><img src='" + imgFolder + layer.iconUrl + "' height='" + globalIconSize + "' width='" + globalIconSize + "'></div>";
		addLegendElement(layer, markerLegendIcon);
	}

	function addPolygonLegendIcon(layer, style) {
		
		var polygonLegendIcon = "<svg " + legendIconSize + "><defs>" + globalLinearSvgGradient + "</defs><rect class='legend-icon legend-polygon' " + legendIconSize + "></rect></svg>";
		var fill;
		var stroke;

		// Set icon fill
		if (layer.symbology == 'single') {
			if (!style.fillPattern) {
				fill = style.fillColor;
			} else {
				var pattern = $(style.fillPattern._dom).attr("id");
				fill = "url(#" + pattern + ")";
			}
		} else if (layer.symbology == 'classify') {
			fill = "url(#linearGradient)";
		} 

		// Set icon stroke
		if (style.stroke == false) {
			stroke = "none";
		} else {
			stroke = style.color;
		}

		var css = {
			fill: fill, 
			"stroke-width": style.weight,
			stroke: stroke,
			opacity: style.fillOpacity
		}

		addLegendElement(layer, polygonLegendIcon, css);
	}

	function addLineLegendIcon(layer, style) {

		lineLegendIcon = "<svg " + legendIconSize + "><line x1='0' y1='15' x2='15' y2='0' class='legend-icon legend-line'></svg>";
		
		var css = {
			fill: style.fill,
			"stroke-width": style.weight,
			stroke: style.color,
			"stroke-dasharray": style.dashArray,
			opacity: style.opacity
		}

		addLegendElement(layer, lineLegendIcon, css);
	}

	function addHeatmapLegendIcon(layer, style) {
		
		var heatmapLegendIcon = "<svg " + legendIconSize + "><defs>" + globalRadialSvgGradient + "</defs><g><circle class='legend-icon legend-heatmap' " + legendCircleSize + "></circle><image xlink:href='" + style.iconUrl + "' " + legendIconSize + "/></g></svg>";
		
		var css = {
			fill: "url(#radialGradient)", 
			stroke: false,
			opacity: style.fillOpacity
		}

		addLegendElement(layer, heatmapLegendIcon, css);				
	}

	function addCircleLegendIcon(layer, style) {
		var circleLegendIcon = "<svg " + legendIconSize + "><circle class='legend-icon legend-circle' " + legendCircleSize + "></circle></svg>";
		var pattern = $(style.fillPattern._dom).attr("id");
		
		var css = {
			fill: "url(#" + pattern + ")", 
			"stroke-width": style.weight,
			stroke: style.color,
			opacity: style.fillOpacity
		}

		addLegendElement(layer, circleLegendIcon, css);				
	}


// Map styling functions
	
	// Style polygon layers 
	function polygonStyle(fillColor, symbol) {
		var fillPattern;
		var stroke = true;
		var color = globalPolygonStrokeColor;
		var fillOpacity = globalPolygonFillOpacity;
		var weight = globalPolygonStrokeWeight;

		switch(symbol) {
		    case "white-stripes-diagonal":
		        fillPattern = patternDefs.whiteStripesDiagonal;
				stroke = true;
		        break;
		    case "blue-stripes-diagonal":
		        fillPattern = patternDefs.blueStripesDiagonal;
		        stroke = true;	
		        color = brandPrimary;	
				weight = globalLineStrokeWeight;		
		        break;
		    case "blue-nostroke":
		        fillColor = brandPrimary;
		        stroke = false;
		        fillOpacity = 1;
		        break;
			case "white-nostroke":
		        fillColor = "white";
		        stroke = false;
		        fillOpacity = 0.25;
		        break;		        
			case "blue-stroke":
		        fillColor = brandPrimary;
		        break;
		}

		var style =  {
		    fillColor: fillColor,
		    fillPattern: fillPattern,
		    weight: weight,
		    color: color,
		    stroke: stroke,
		    fillOpacity: fillOpacity	
	    }

	    return style;
			
	}

	// Style line layers
	function lineStyle(symbol) {
		
		var color;
		var weight;
		var dashArray;

		if (symbol == 'thin-line' || symbol == 'dash-line-white') {
			color = "white";
		} else {
			color = brandPrimary;
		}

		if (symbol == 'bold-line') {
			weight = globalBoldLineStrokeWeight;
		} else if (symbol == 'thin-line') {
			weight = globalThinLineStrokeWeight;
		} else {
			weight = globalLineStrokeWeight;
		}
		
		if (symbol == 'dash-line' || symbol == 'dash-line-white') {
			dashArray = globalDashArrayDashed;
		} else {
			dashArray = globalDashArraySolid;
		}

		return {
	        weight: weight,
	        opacity: 1,
	        fill: false,
	        color: color,
	        dashArray: dashArray
	    }	
	}

	// Classify data to create color ramp
	function classifyData(value, values, invert) {
		var c0 = new Color(gradientStart);
		var c1 = new Color(gradientMid);

		var min = Math.min.apply(null, values);
		var max = Math.max.apply(null, values);

		
		var percentage = ((value - min) / (max - min)) * 100;
		var fillColor;

		if (invert == 'false') {
			fillColor = LinearColorInterpolator.findColorBetween(c0, c1, percentage).asRgbCss(); 			
		} else if (invert == 'true') {
			fillColor = LinearColorInterpolator.findColorBetween(c1, c0, percentage).asRgbCss(); 			
		}

		return fillColor;
	}

// Helper functions
	
	// Calculate width of overlay controls container
	function overlayControlsWidth(layersControlContainer) {
		var layersControlContainerPaddingLeft = parseInt(layersControlContainer.css("padding-left"));

		var firstControl = layersControlContainer.find(".leaflet-control-layers").first();
		var lastControl =  layersControlContainer.find(".leaflet-control-layers").last();
		
		var firstControlPos = firstControl.offset().left;
		var lastControlPos = lastControl.offset().left;

		var firstControlWidth = firstControl.outerWidth(true);
		var lastControlWidth = lastControl.outerWidth(true);

		var maxWidth = layersControlContainer.parent(".leaflet-control-container").width() / 2;
		var newWidth; 


		if (firstControlPos != lastControlPos) {
			newWidth = lastControlWidth - lastControlPos + firstControlPos + layersControlContainerPaddingLeft + "px";

		} else {
			newWidth = lastControlWidth + layersControlContainerPaddingLeft + "px";
		}

		layersControlContainer.css("width", newWidth);

		if (parseInt(newWidth) > maxWidth) {
			layersControlContainer.css('opacity', 0);
		} else {
			layersControlContainer.css('opacity', 1);
		}

		if (layersControlContainer.css('right') != '0px') {
			layersControlContainer.animate({
				right: layersControlContainer.width() * -1
			});
		} 

	}

	// Show/hide loading indicator 
	function spinner(featureLayer, lMap) {
	  	featureLayer.on('loading', function() {
			console.log('started loading layer');
			lMap.spin(true);
	  	});

	  	featureLayer.on('load', function() {
			console.log('finished loading layer');
			lMap.spin(false);
	  	});
	}

	// Check if element in array is unique, remove duplicates
	Array.prototype.unique = function() {
	    var a = [];
	    for ( i = 0; i < this.length; i++ ) {
	        var current = this[i];
	        if (a.indexOf(current) < 0) a.push(current);
	    }

	    this.length = 0;
	    for ( i = 0; i < a.length; i++ ) {
	        this.push( a[i] );
	    }

	    return this;
	}

	// Search for a key in an array of key/value pairs
	function search(nameKey, myArray){
	    for (var i=0; i < myArray.length; i++) {
	        if (myArray[i].name === nameKey) {
	            return myArray[i];
	        }
	    }
	}

	// Remap numbers
	function map_range(value, low1, high1, low2, high2) {
	    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	}

	Color = function(hexOrObject) {
	    var obj;
	    if (hexOrObject instanceof Object) {
	        obj = hexOrObject;
	    } else {
	        obj = LinearColorInterpolator.convertHexToRgb(hexOrObject);
	    }
	    this.r = obj.r;
	    this.g = obj.g;
	    this.b = obj.b;
	}
	
	// Convert color to RGB
	Color.prototype.asRgbCss = function() {
	    return "rgb("+this.r+", "+this.g+", "+this.b+")";
	}
	

	var LinearColorInterpolator = {
	    // convert 6-digit hex to rgb components;
	    // accepts with or without hash ("335577" or "#335577")
	    convertHexToRgb: function(hex) {
	        match = hex.replace(/#/,'').match(/.{1,2}/g);
	        return new Color({
	            r: parseInt(match[0], 16),
	            g: parseInt(match[1], 16),
	            b: parseInt(match[2], 16)
	        });
	    },
	    // left and right are colors that you're aiming to find
	    // a color between. Percentage (0-100) indicates the ratio
	    // of right to left. Higher percentage means more right,
	    // lower means more left.
	    findColorBetween: function(left, right, percentage) {
	        newColor = {};
	        components = ["r", "g", "b"];
	        for (var i = 0; i < components.length; i++) {
	            c = components[i];
	            newColor[c] = Math.round(left[c] + (right[c] - left[c]) * percentage / 100);
	        }
	        return new Color(newColor);
	    }
	}
})(jQuery);

}
