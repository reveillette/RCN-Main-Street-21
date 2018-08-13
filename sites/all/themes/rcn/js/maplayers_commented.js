// RCN MainStreet 21 GIS Layers 
// From UVA Library ArcGIS Online account:https://uvalibrary.maps.arcgis.com/home/group.html?id=ec46795ecb684278b1fc4270e78710da#overview 

var mapLayers =[  

   // Population Statistics Layers   
   {  
   	"name":"Population 1960-2000",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population Statistics/FeatureServer/0",
   	"type":"circle",
   	"classifyBy":"Pop_2000",
   	"popupLabels":{
   		"Name":"NAME",
   		"Population (2000)":"Pop_2000",
   		"Population (1990)":"Pop_1990",
   		"Population (1980)":"Pop_1980",
   		"Population (1970)":"Pop_1970",
   		"Population (1960)":"Pop_1960",
   	},
   },
   {  
   	"name":"Populated Places",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population StatisticsLayers/FeatureServer/3",
   	"type":"point_heatmap",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia Towns and Places",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population StatisticsLayers/FeatureServer/4",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Urban Areas (US Census 2017)",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population StatisticsLayers/FeatureServer/5",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Fixed Broadband Providers",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population StatisticsLayers/FeatureServer/7",
   	"type":"polygon",
   	"symbol":"single",
   	"breaks":1,
   	"property":"ID",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"LTE Coverage",
   	"category":"Population Statistics",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Population StatisticsLayers/FeatureServer/6",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },	   


   
   // Culture Layers   
   {  
   	"name":"Virginia Wineries",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/0",
   	"type":"point",
   	"iconUrl":"wine.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia Breweries",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/1",
   	"type":"point",
   	"iconUrl":"beer.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Public Fishing Lakes",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/2",
   	"type":"polygon",
   	"symbol":"single",
   	"breaks":1,
   	"property":"ID",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Birding and Wildlife Trail Sites",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/3",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Birding and Wildlife Trail Loops",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/4",
   	"type":"line",
   	"symbol":"single",
   	"property":"ID",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia Libraries",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/5",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia Museums",
   	"category":"Culture",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/6",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   

   // Education Layers   
   {  
   	"name":"Virginia Schools",
   	"category":"Education",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/0",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia Higher Education",
   	"category":"Education",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/3",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":{

   	},
   },
   {  
   	"name":"Virginia K-12 Enrollment Changes (2012-2017)",
   	"category":"Education",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/5",
   	"type":"polygon",
   	"symbol":"classify",
   	"breaks":5,
   	"property":"Change_1",
   	"popupLabels":{

   	},
   },
   

   // Economy Layers   
   {  
   	"name":"Business Patterns",
   	"category":"Economy",
   	"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Economy/FeatureServer/0",
   	"type":"point",
   	"iconUrl":"cross.png",
   	"popupLabels":"",
   },


	// Health Layers 
	

	// Transportation Layers 
	

	// Hospital Services Layers
	]
