window.angular.module('pmd.controllers.vizpick', [])
  .controller('VizPickController', [
    function($scope) {
      $scope.vizs = ["Bubble Diagram", "Line Chart", "Bar Chart", "Scatter Graph"];
  }
]);
