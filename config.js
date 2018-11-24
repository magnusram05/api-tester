requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './src/js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        resources: 'src/resources'
    },

    shim: {
        'mockjax.jQuery': {
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'knockout','jasmine'],function($, ko){
	requirejs(['mockjax'],
		function   (mockjax) {
		    ko.components.register('apiTestSuite', {
		        viewModel: { require: 'app/app' },
		        template: { require: 'text!app/app.html' }
		    });
		    $.mockjax({
				  url: "http://localhost:3000/reference",
				  contentType: "application/json",
				  responseText: {
				  			dataType: "ClientAccount",
				  			data: {status: "success",
					    	value: "ClientAccount success"}
					  		
					    }					    				    				   
			});
			$.mockjax({
				  url: "http://localhost:3000/test",
				  contentType: "application/json",
				  responseText: {
				    status: "success",
				    value: "Are you a mock turtle?"
				  }
			});
		    ko.applyBindings();
		});
});