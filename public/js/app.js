window.app =
  angular.module('PimpMyData', [
    'ngCookies',
    'ngResource',
    'ui.bootstrap',
    'ngRoute',
    /*'restangular',*/
    'pmd.controllers',
    'pmd.directives',
    'pmd.services'
  ]);

// bundling dependencies
window.angular.module('pmd.controllers', [
  'pmd.controllers.header',
  'pmd.controllers.index'
]);
window.angular.module('pmd.services', [
  'pmd.services.global'
]);
