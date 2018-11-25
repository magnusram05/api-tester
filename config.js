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
        resources: '/src/resources'
    },

    shim: {
        'mockjax.jQuery': {
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'knockout'],function($, ko){
	requirejs(['mockjax'],
		function   (mockjax) {
		    ko.components.register('apiTestSuite', {
		        viewModel: { require: 'app/app' },
		        template: { require: 'text!app/app.html' }
		    });		    
		    ko.applyBindings();
		});
});