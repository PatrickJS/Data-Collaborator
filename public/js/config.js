//Setting up route
window.app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
  .when('/', {
    templateUrl: '/views/index.html'
  })
  .when('/settings', {
    templateUrl: '/views/index.html'
  })
  .when('/visualslist', {
    templateUrl: '/views/visuals_list.html',
    controller: 'VisualsListController'
  })
  .when('/vizpick',{
    templateUrl: '/views/vizpick.html',
    controller: 'VizPickController'
  })
  .when('/collaborationPage', {
    templateUrl: '/views/collaborationPage.html',
    controller: 'collaborationPageController'
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
