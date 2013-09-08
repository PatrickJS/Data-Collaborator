window.angular.module('pmd.directives', [])
// .directive('bubbleChart', function() {
//   return {
//     restrict: 'A',
//     scope: {
//       ngModel: '='
//     },
//     link: function(scope, ele, attrs, ctrl) {
//       var width = attrs.width || 200,
//           height = attrs.height || 200;

//       var svg =
//         d3.select(ele[0])
//           .append('svg')
//           .attr('width', width)
//           .attr('height', height);

//       scope.$watch(attrs.ngModel, function(newData) {
//         // remove all of the current data from the d3
//         // object
//         svg.selectAll('*').remove();
//         // and then draw the bubble chart
//         if (newData) {
//           // draw in here
//         }
//       });
//     }
//   }
// });

// <div bubble-chart ng-model="data"></div>
