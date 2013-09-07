//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
	.when('/', {
    templateUrl: '/views/index.html'
  })
  .when('/visualpicker', {
    templateUrl: '/views/visual_picker.html'
  })
  .when('/vizpick/',{
    templateUrl: '/views/vizpick.html',
    controller: 'VizPickController'
  })
	.otherwise({
    redirectTo: '/'
  });
}]);

//Removing tomcat unspported headers
window.app.config(['$httpProvider', function($httpProvider, Configuration) {
    //delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider', function($locationProvider) {
    //$locationProvider.html5Mode(true);
    $locationProvider.hashPrefix("!");
}]);
