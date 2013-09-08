window.angular.module('pmd.controllers.collaborationPage', [])
  .controller('collaborationPageController', ['$scope', '$http',
    function($scope, $http) {

        $scope.bubbleD3 = $http.get('data/BubbleData.json');

        var bubbleD3 = function (){
            var diameter = 490,
                format = d3.format(",d");

            var pack = d3.layout.pack()
                .size([diameter - 4, diameter - 4])
                .value(function(d) { return d.size; });

            var svg = d3.select("#d3-bubble-chart").append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
              .append("g")
                .attr("transform", "translate(2,2)");

            d3.json("data/BubbleData.json", function(error, root) {
              var node = svg.datum(root).selectAll(".node")
                  .data(pack.nodes)
                .enter().append("g")
                  .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                  .attr("id", function(d) { return d.name})
                  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

              node.append("title")
                  .text(function(d) { return d.name + (d.children ? "" : ": " + d.size); });

              node.append("circle")
                  .attr("r", function(d) { return d.r; });

              node.filter(function(d) { return !d.children; }).append("text")
                  .attr("dy", ".3em")
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.name.substring(0, d.r / 3); });
            });

            d3.select(self.frameElement).style("height", diameter + "px");
        };

        var turnOnAnnotator = function(){
            $('body').annotator();
        }

        $scope.users = [
            'Alex',
            'Bill',
            'CJ',
            'Elle',
            'Patrick',
            'Rohan'
        ];

        $scope.addFriend = function() {
            $scope.users.push( $scope.newPersonName );
            $scope.newPersonName = "";
        };

        turnOnAnnotator();
        bubbleD3();
    }
 ]);
