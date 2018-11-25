//Load search payload JSON with structure - 'dataType':'payload' into a searchPayload variable 
//Load details payload JSON with structure - 'dataType':'payload' into a detailsPayload variable
//Load Endpoint urls JSON into endpointUrls variable
define(["knockout", "jquery","/src/resources/search_payload.js",
	"/src/resources/details_payload.js",
	"/src/resources/endpoint_urls.js",
	"/src/resources/expected.js",
	"/src/js/app/config.js",
	"lodash"], 
	function(ko, $,searchPayload,detailsPayload,endpointUrls,expected,config,lodash){
	function ViewModel(){
		this.searchPayload = ko.observable(searchPayload.data);
		this.detailsPayload = ko.observable(detailsPayload.data);
		this.endpointUrls = ko.observableArray(endpointUrls.data.urls);
		this.successSearchResults = ko.observableArray();
		this.failureSearchResults = ko.observableArray();
		this.succcessDetailsResults = ko.observableArray();
		this.failureDetailsResults = ko.observableArray();	
		this.expected = expected;	
		this.endpoint = config.endpoint;
	}
	ViewModel.prototype.test = function(){
		let obj = this;
		obj.reset();		
		$.each(obj.searchPayload(), function(name, value){			
			$.ajax({
						url: obj.endpoint,
						success: function(response){	
					    let enReponse = {"expected": JSON.stringify(obj.expected[name]),
												"dataType":name, "actual":""};
						var isFound = obj.expected[response.dataType] || false;							
						if(!isFound){
							/*response["expected"]=JSON.stringify(obj.expected[name]);
							response["dataType"]=name;*/
							obj.failureSearchResults.push(enReponse);
						} else if(_.isEqual(response.data, obj.expected[name])){
							/*response["expected"]=JSON.stringify(obj.expected[name]);
							response["dataType"]=name;*/
							_.assignIn(enReponse, {'actual':JSON.stringify(response.data)});
							obj.successSearchResults.push(enReponse);
						} else {
							/*response["expected"]=JSON.stringify(obj.expected[name]);
							response["dataType"]=name;*/
							_.assignIn(enReponse, {'actual':JSON.stringify(response.data)});
							obj.failureSearchResults.push(enReponse);
						}
					},
					error: function(error){
						obj.successSearchResults.push(enReponse);
					}
			})
			/*.then(function(){
					$.ajax({
						url: "http://localhost:3000/test",	
						dataType: "text",														
						success: function(response) {
					        obj.testSearchResults[name] = response.responseText;  
					        if(response !== obj.refSearchResults[name]){
					        	console.log(name +" :Failed");
					        } else {
					        	console.log(name +" :Passed");
					        }
						},
						error: function(error){	
						    obj.testSearchResults[name] = error.responseText;	
						    if(response !== obj.refSearchResults[name]){
					        	console.log(name +" :Failed");
					        } else {
					        	console.log(name +" :Passed");
					        }			
						}
				})
			})*/
		})
		$('#collapse-icon').css('display','block');
		obj.toggleGlobalCollapse(false);
	}
	ViewModel.prototype.reset = function(){
		this.successSearchResults.removeAll();
		this.failureSearchResults.removeAll();
		this.succcessDetailsResults.removeAll();
		this.failureDetailsResults.removeAll();
		this.successSearchResults.length = 0;
		this.failureSearchResults.length = 0;
		this.succcessDetailsResults.length = 0;
		this.failureDetailsResults.length = 0;
	}
	ViewModel.prototype.toggle = function(dataType){
		$('#'+dataType).toggle();	
		this.rotateBug(dataType);	
	}
	ViewModel.prototype.bugID = function(dataType){
		return dataType+'bug';
	}
	ViewModel.prototype.collapseToggle = function(dataType){
		var obj = this;
		var isUnCollapse = $('#collapse-icon').html() === 'arrow_drop_up';
		$.each(this.searchPayload(), function(name, value){	
			$('#'+name).css('display',(isUnCollapse ? 'block':'none'));
			$('#'+name+'bug').css('transform',isUnCollapse ?'rotate(180deg)':'');	
		})		
		obj.toggleGlobalCollapse(isUnCollapse);				
	}
	ViewModel.prototype.toggleGlobalCollapse = function(isUnCollapse){
		if(isUnCollapse){
			$('#collapse-icon').html('arrow_drop_down');
		} else {
            $('#collapse-icon').html('arrow_drop_up');
		}
	}
	ViewModel.prototype.rotateBug = function(dataType){
		if($('#'+dataType).css('display') === 'block'){
			$('#'+dataType+'bug').css('transform','rotate(180deg)');
		} else {
			$('#'+dataType+'bug').css('transform','');
		}
	}
	return ViewModel;
})
//Init refSearchResults object - {}
//Init refDetailsResults object - {}
//Init testSearchResults object - {}
//Init testDetailsResults object - {}

//Attach click event handler to #test button
	//Get reference endpoint from #refEndPointOption
		//Loop through searchPayload
			//call endpoint with payload
			//insert success response on to refSearchResults with dataType as key
			//insert failure response on to refSearchResults with dataType as key
	//Get endpoint to be tested from #endpointToBeTestedOption
		//Loop through detailsPayload
			//call endpoint with payload
			//insert success response in to testSearchResults with dataType as key
				//Create a div row as child to a div with #failedSearch or #successfulSearch
					//Add child div with expected result
					//Add child div with actual result
			//insert failure response in to testSearchResults with dataType as key
				//Create a div row as child to a div with #failedSearch or #successfulSearch
					//Add child div with expected result
					//Add child div with actual result


