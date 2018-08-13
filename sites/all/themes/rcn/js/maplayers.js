{
	"title":"RCN MainStreet 21 Map Layers",
	"attribution":"UVA Library ArcGIS Online, RCN Mainstreet 21",
	"url":"https://uvalibrary.maps.arcgis.com/home/group.html?id=ec46795ecb684278b1fc4270e78710da",
	"layers": [

		{  
			"name":"Historic Population by Town",
			"category":"Population",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_BaseLayers/FeatureServer/0",
			"type":"circle",
			"symbol":"white-stripes-diagonal",
			"property":"Pop_1960",
			"popupTitle":"NAME",
			"popupBody":{
				"Population (2000)":"Pop_2000",
				"Population (1990)":"Pop_1990",
				"Population (1980)":"Pop_1980",
				"Population (1970)":"Pop_1970",
				"Population (1960)":"Pop_1960"
			}
		},
		{  
			"name":"Current Population by Town",
			"category":"Population",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_BaseLayers/FeatureServer/0",
			"type":"circle",
			"symbol":"blue-stripes-diagonal",
			"property":"Pop_2000",
			"popupTitle":"NAME",
			"popupBody":{
				"Population":"POPULATION",
				"Number of Housing Units":"HOUSEUNITS",
				"Population per Square Mile":"POP_SQMI",
				"Square Mileage":"SQMI"
			}
		},
		
		{  
			"name":"Population Density",
			"category":"Population",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_BaseLayers/FeatureServer/3",
			"type":"heatmap",
			"popupTitle":"NAME",
			"popupBody":{}
		},
		{  
			"name":"Municipal Boundaries",
			"category":"Population",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_BaseLayers/FeatureServer/4",
			"type":"line",
			"symbology":"single",
			"symbol":"dash-line-blue",
			"popupTitle":"NAME",
			"popupBody":{
				"Class":"CLASS",
				"Population":"POPULATION"
			}
		},
		{  
			"name":"Urban Areas (US Census 2017)",
			"category":"Population",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_BaseLayers/FeatureServer/5",
			"type":"polygon",
			"symbology":"single",
			"symbol":"white-nostroke",
			"popupTitle":"NAME10",
			"popupBody":{}
		},	   
		{  
			"name":"Virginia Libraries",
			"category":"Cultural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/5",
			"type":"point",
			"iconUrl":"library.png",
			"popupTitle":"NAME",
			"popupBody":{}
		},
		{  
			"name":"Virginia Museums",
			"category":"Cultural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/6",
			"type":"point",
			"iconUrl":"museum.png",
			"popupTitle":"NAME",
			"popupBody":{}
		},
		{  
			"name":"Virginia Wineries",
			"category":"Cultural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/0",
			"type":"point",
			"iconUrl":"wine.png",
			"popupTitle":"Name",
			"popupBody":{
				"Address":"Address",
				"City":"City",
				"State":"State",
				"Zip":"Zip",
				"Phone":"Phone",
				"Website":"Website"
			}
		},
		{  
			"name":"Virginia Breweries",
			"category":"Cultural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/1",
			"type":"point",
			"iconUrl":"beer.png",
			"popupTitle":"Trade_Name",
			"popupBody":{
				"Address":"Address",
				"Phone":"Trade_Phon",
				"Website":"Website"
			}
		},

		{  
			"name":"Mountain Peaks",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Natrual_Resources/FeatureServer/1",
			"type":"point",
			"iconUrl":"triangle.png",
			"popupTitle":"NAME",
			"popupBody":{
				"Elevation":"ELEV_METER"
			}
		},		
		{  
			"name":"Birding and Wildlife Trail Sites",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/3",
			"type":"point",
			"iconUrl":"hiker.png",
			"popupTitle":null,
			"popupBody":{
				"Trail Loop":"LOOP_NAME",
				"Directions":"site_direc",
				"Contact Info":"site_conta",
				"Website":"site_web",
				"Description":"site_descr"
			}
		},
		{  
			"name":"Birding and Wildlife Trail Loops",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/4",
			"type":"line",
			"symbology":"single",
			"symbol":"thin-line",
			"popupTitle":"Loop_Name",
			"popupBody":{
				"Phase":"Phase"
			}
		},			
		{  
			"name":"Tier 1 and 2 Wildlife Habitats",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Natrual_Resources/FeatureServer/3",
			"type":"polygon",
			"symbology":"single",
			"symbol":"white-stripes-diagonal"
		},
		{  
			"name":"Ecoregions",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Natrual_Resources/FeatureServer/0",
			"type":"line",
			"symbology":"single",
			"symbol":"dash-line-white",
			"popupTitle":"CWCS_eco",
			"popupBody":{}
		},					
		{  
			"name":"Parks",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Natrual_Resources/FeatureServer/2",
			"type":"polygon",
			"symbology":"single",
			"symbol":"blue-stripes-diagonal",
			"popupTitle":"NAME",
			"popupBody":{
				"Type of Park":"FEATTYPE",
				"Square Miles":"SQMI"
			}
		},		
		{  
			"name":"Public Fishing Lakes",
			"category":"Natural_Resources",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Culture/FeatureServer/2",
			"type":"polygon",
			"symbology":"single",
			"symbol": "blue-nostroke",
			"popupTitle":"NAME",
			"popupBody":{}

		},	
		{  
			"name":"Higher Education Institutions",
			"category":"Education",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/3",
			"type":"point",
			"iconUrl":"cross.png",
			"popupTitle":"NAME",
			"popupBody":{
				"Campus Name":"Campus_Nam",
				"Website":"URI",
				"Zip":"ZIP"
			}
		},
		{  
			"name":"Schools",
			"category":"Education",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/0",
			"type":"point",
			"iconUrl":"dot.png",
			"popupTitle":"NAME",
			"popupBody":{}
		},
		{  
			"name":"Virginia K-12 Enrollment Changes (2012-2017)",
			"category":"Education",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Education/FeatureServer/5",
			"type":"polygon",
			"symbology":"classify",
			"invert":"false",			
			"property":"Change_1",
			"popupTitle":"NAMELSAD10",
			"popupBody":{
				"2012":"F2",
				"2017":"F3",
				"Change":"Change__",
				"Percent Change":"Change_1"
			}
		},
		{  
			"name":"Business Patterns",
			"category":"Economy",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Economy/FeatureServer/0",
			"type":"polygon",
			"symbology":"classify",
			"invert":"false",			
			"property":"EstChg",
			"popupTitle":"COUNTY",
			"popupBody":{
				"Percent Change in total number of establishments, 2005-2015":"EstChg"
			},
			"attrib":"County Business Patterns datasets for Virginia for 2005 and 2015, Census Bureau"
		},
		{  
			"name":"Hospitals",
			"category":"Health",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/RCN_Health/FeatureServer/0",
			"type":"point",
			"iconUrl":"hospital.png",
			"popupTitle":"FacilityNa",
			"popupBody":{
				"Facility Type":"FacilityTy",
				"Address":"Address",
				"City":"City",
				"State":"State",
				"Zip":"Zip",
				"Bed Count":"BedCount_T"
			}
		},
		{  
			"name":"Telehealth Partners",
			"category":"Health",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/RCN_Health/FeatureServer/2",
			"type":"point",
			"iconUrl":"telehealth.png",
			"popupTitle":"Name",
			"popupBody":{
				"Facility Type":"Type_of_Fa",
				"Service Type":"Type_of_Se",
				"Address":"Street_Add",
				"City":"City",
				"State":"State",
				"Zip":"Zip",
				"Bed Count":"BedCount_T"
			}
		},
		{  
			"name":"Hospital Service Area",
			"category":"Health",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/RCN_Health/FeatureServer/1",
			"type":"polygon",
			"symbology":"classify",
			"invert":"true",
			"property":"ToBreak",
			"popupTitle":"ToBreak",
			"popupBody":{
				"Commute Time (in minutes)":"ToBreak"
			}
		},
		{  
			"name":"Major Highways",
			"category":"Transportation",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Transportation/FeatureServer/3",
			"type":"line",
			"symbology":"single",
			"symbol":"dash-line-white",
			"where":"VDOT_RTYP = 'US' OR VDOT_RTYP = 'IS' OR VDOT_RTYP = 'SR'",
			"popupTitle":"ST_FULL",
			"popupBody":{
				"Type of Highway (Interstate (IS), US Highway (US), State Route (SR))":"VDOT_RTYP",
				"Highway Number": "VDOT_RNUM",
				"Speed Limit (MPH)":"SPEED_MPH"
			}
		},				
		{  
			"name":"Railroads",
			"category":"Transportation",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Transportation/FeatureServer/0",
			"type":"line",
			"symbology":"single",
			"symbol":"bold-line",
			"popupTitle":"OPER_VGIN",
			"popupBody":{
				"Type":"FCC_DESC",
				"Passenger?":"PASSENGER"
			}
		},
		{  
			"name":"Southwest Virginia Transportation Terminals",
			"category":"Transportation",
			"url":"https://services2.arcgis.com/8k2PygHqghVevhzy/arcgis/rest/services/Web_Transportation/FeatureServer/1",
			"type":"point",
			"iconUrl":"cross.png",
			"popupTitle":"FACILITY_N",
			"popupBody":{
				"Website":"DATA_SOURC",
				"Address":"ADDRESS",
				"City":"CITY",
				"State":"STATE",
				"Zip":"ZIPCODE",
				"Notes":"NOTES"
			}
		}
	]
}
