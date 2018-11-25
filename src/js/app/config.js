define(['jquery'],function($){
	(function () {
		$.mockjax({
				  url: "http://localhost:3000/test",
				  contentType: "application/json",
				  responseText: {
			  			dataType: "Test0",
			  			data: {status: "success",
				    	value: "Test0 success"}			  		
				    }					    				    				   
			});
			$.mockjax({
				  url: "http://localhost:3000/reference",
				  contentType: "application/json",
				  responseText: {
				    status: "success",
				    value: "Are you a mock turtle?"
				  }
			})
	})();
	return {
		'endpoint':'http://localhost:3000/test'
	}
})