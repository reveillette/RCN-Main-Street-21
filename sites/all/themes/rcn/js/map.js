// Set Global variables here
var domain = window.location.hostname;
var imgFolder = "/sites/all/themes/rcn/img/"

var rcnLayers = [
	{category: 'Base', name: "Population by Town Places", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Base/FeatureServer/0', type: 'point', iconUrl: 'cross.png'},
	{category: 'Base', name: "Fixed Broadband Providers", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Base/FeatureServer/1', type: 'point', iconUrl: 'cross.png'},
	{category: 'Base', name: "LTE Coverage", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Base/FeatureServer/2', type: 'point', iconUrl: 'cross.png'},

	{category: 'Culture', name: "Virginia Wineries", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/0', type: 'point', iconUrl: 'wine.png'},
	{category: 'Culture', name: "Virginia Breweries", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/1', type: 'point', iconUrl: 'beer.png'},
	{category: 'Culture', name: "Public Fishing Lakes", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/2', type: 'polygon', symbol: 'single', breaks: 1, property: 'ID'},
	{category: 'Culture', name: "Birding and Wildlife Trail Sites", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/3', type: 'point', iconUrl: 'cross.png'},
	{category: 'Culture', name: "Birding and Wildlife Trail Loops", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/4', type: 'line', symbol: 'single', property: 'ID'},
	{category: 'Culture', name: "Virginia Libraries", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/5', type: 'point', iconUrl: 'cross.png'},
	{category: 'Culture', name: "Virginia Museums", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/6', type: 'point', iconUrl: 'cross.png'},

	{category: 'Education', name: "Virginia Schools", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/0', type: 'point', iconUrl: 'cross.png'},
	{category: 'Education', name: "Virginia Higher Education", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/3', type: 'point', iconUrl: 'cross.png'},
	{category: 'Education', name: "Virginia K-12 Enrollment Changes (2012-2017)", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/5', type: 'polygon', symbol: 'classify', breaks: 5, property: 'Change_1'},

	{category: 'Economy', name: "Business Patterns", url: 'https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Economy/FeatureServer/0', type: 'point', iconUrl: 'cross.png'},

];



var categories = rcnLayers.map(function(a) {return a.category;});

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

var overlays = [];
    
(function ($) {

	$(document).ready(function() { 
		if ($("body").hasClass("page-network")) {

			categories = categories.unique();
			
			// Set up categories and layer filter
			for (i=0; i<categories.length; i++) {

				// Create leaflet layer groups by category
				leafletLayerGroups[i] = {name: categories[i], layerGroup: L.layerGroup()};

				// Add categories to overlays
				overlays[i] = {name: categories[i], overlay: {}};

			}

			// Add layers to layer groups, and sub-layers to layer filter
			for (i=0; i<rcnLayers.length; i++) {

				var cat = rcnLayers[i].category;
			    var url = rcnLayers[i].url; 
			    var name = rcnLayers[i].name;
			    var type = rcnLayers[i].type;

			    // Create layers
			    if (type == 'point') {
				    var iconUrl = imgFolder + rcnLayers[i].iconUrl;
			    	leafletLayers[i] = createMarkerLayer(url, iconUrl);
			    } else if (type == 'polygon' || type == 'line') {
				    var symbol = rcnLayers[i].symbol;
				    var property = rcnLayers[i].property;
			    	leafletLayers[i] = createLayer(type, url, symbol, property);
			    } 		    

			    // Create overlays
			    var targetOverlayObj = search(cat, overlays);
			    var targetOverlay = targetOverlayObj.overlay;
			    
			    targetOverlay[name] = leafletLayers[i];
			}
		}
	});
		
	// Leaflet map modifications and additions
	$(document).on('leaflet.map', function(e, map, lMap) {

		$(document).ready(function() { 
			if ($("body").hasClass("page-network")) {

			 	// Move zoom control to a new position
			    lMap.zoomControl.setPosition('bottomright');

			    // Create Layers Control - basemaps
			    var basemapsControl = L.control.layers(baseLayers, null, {
			    	collapsed: false
			    })
			    basemapsControl.addTo(lMap);

			    // Add titles to Layers Control (basemaps)
				$(basemapsControl._container).prepend("<h5><a data-toggle='collapse' href='#Basemaps' aria-expanded='false' aria-controls='Basemaps'>Basemaps</a></h5>")
				$(basemapsControl._form).addClass('collapse').attr('id', 'Basemaps'); // Add Bootstrap Collapse to target

			    // Create Layers Control for each overlay category 
			    var overlayControls = [];
			    
			    for (i=0; i<overlays.length; i++) {
			    	
			    	overlayControls[i] = L.control.layers(null, overlays[i].overlay, {
				    	collapsed: false
				    });

				    overlayControls[i].addTo(lMap);

    				// Add titles and collapse to Layers Control (overlays)
				    $(overlayControls[i]._container).prepend("<h5><a data-toggle='collapse' href='#" + overlays[i].name + "' aria-expanded='false' aria-controls='" + overlays[i].name + "'>" + overlays[i].name + "</a></h5>")
    				$(overlayControls[i]._form).addClass('collapse').attr('id', overlays[i].name); // Add Bootstrap Collapse to target

				}
				  
		  	}

		});
	});


})(jQuery);

// Global functions
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

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

function createMarkerLayer (url, iconUrl, iconSize, iconAnchor, popupAnchor) {
	if (iconSize == null) {
		iconSize = [15,15];
	} 

	if (iconAnchor == null) {
		iconAnchor = [0,0];
	} 

	if (popupAnchor == null) {
		popupAnchor = [0,0];
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
	
	return marker;
}

function createLayer (type, url, symbol, property, breaks) {
	var propVals = [];
	var min;
	var max;
	var color;

	var polygon = L.esri.featureLayer({
		url: url,
		onEachFeature: function(feature) {
			var value = feature.properties[property];
			propVals.push(value);
		}
		
	});

	polygon.on('load', function() {

 	 	polygon.setStyle( function(feature) {

			var value = feature.properties[property];

			if (symbol == 'single') {
				color = "#3399ff";
			} else if (symbol == 'classify') {
				color = classifyData(value, propVals, breaks);
			}
			
			if (type == 'polygon') {
				return polygonStyle(color);
			} else if (type == 'line') {
				return lineStyle(color);
			}
		});
	});

	return polygon;
}

function polygonStyle(fillColor) {
	
	return {
        fillColor: fillColor,
        weight: 0.25,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.5	
    }
		
}

function lineStyle(lineColor) {

	return {
        weight: 1,
        opacity: 0.5,
        color: lineColor,
    }	
}

function classifyData(value, values, breaks) {
	var c0 = new Color("#061320");
	var c1 = new Color("#3399ff");

	var min = Math.min.apply(null, values);
	var max = Math.max.apply(null, values);
	var percentage = ((value-min)/(max-min))*100;
	
	var fillColor = LinearColorInterpolator.findColorBetween( c0, c1, percentage ).asRgbCss();
	return fillColor;
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
