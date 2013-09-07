window.angular.module('pmd.controllers.header', [])
  .controller('HeaderController', [ '$scope', 'Global',
    function($scope, Global) {
      $scope.global = Global;
    }
  ]);
