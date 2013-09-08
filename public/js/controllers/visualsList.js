window.angular.module('pmd.controllers.visualsList', [])
  .controller('VisualsListController', [ '$scope', 'Global', 'createDialog', '$http',
    function($scope, Global, createDialog, $http) {
      var state
      // $scope.file
      // if ($scope.file.url) {
      //     $scope.file.$state = function () {
      //         return state;
      //     };
      //     $scope.file.$destroy = function () {
      //         state = 'pending';
      //         return $http({
      //             url: $scope.file.deleteUrl,
      //             method: $scope.file.deleteType
      //         }).then(
      //             function () {
      //                 state = 'resolved';
      //                 $scope.clear(file);
      //             },
      //             function () {
      //                 state = 'rejected';
      //             }
      //         );
      //     };
      // } else if (!$scope.file.$cancel && !$scope.file._index) {
      //     $scope.file.$cancel = function () {
      //         $scope.clear(file);
      //     };
      // }
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
