window.angular.module('pmd.controllers.visualsList', [])
  .controller('VisualsListController', [ '$scope', 'Global', 'createDialog',
    function($scope, Global, createDialog) {
      $scope.launchModal = function(url) {
        createDialog(url,{
          id: 'newType',
          title: 'Vizualization Type',
          backdrop: true,
          success: function(){console.log("type picked")},
          modalClass : ['modal']
        });
      };
        $scope.vizs = ["Bubble Diagram", "Line Chart", "Bar Chart", "Scatter Graph"];

    }
  ]);
