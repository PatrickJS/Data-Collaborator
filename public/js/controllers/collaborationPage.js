window.angular.module('pmd.controllers.collaborationPage', [])
  .controller('collaborationPageController', ['$scope', '$http',
    function($scope, $http) {

        $scope.bubbleD3 = $http.get('data/BubbleData.json');
        $scope.caloriesD3 = $http.get('data/Calories.csv');
        $scope.stepsD3 = $http.get('data/Steps.csv');

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

        var caloriesD3 = function (){
            var margin = {top: 20, right: 20, bottom: 50, left: 40},
                width = 650 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var formatPercent = d3.format();

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);

            var svg = d3.select("#d3-calories-chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("/data/Calories.csv", type, function(error, data) {
              x.domain(data.map(function(d) { return d.Hour; }));
              y.domain([0, d3.max(data, function(d) { return d.Calories; })]);

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Frequency");

              svg.selectAll(".bar")
                  .data(data)
                .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.Hour); })
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) { return y(d.Calories); })
                  .attr("height", function(d) { return height - y(d.Calories); });

            });

            function type(d) {
              d.Calories = +d.Calories;
              return d;
            }
        };


        var stepsD3 = function (){
            var margin = {top: 20, right: 20, bottom: 50, left: 40},
                width = 650 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;

            var formatPercent = d3.format();

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(formatPercent);

            var svg = d3.select("#d3-steps-chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv("/data/Steps.csv", type, function(error, data) {
              x.domain(data.map(function(d) { return d.Hour; }));
              y.domain([0, d3.max(data, function(d) { return d.Steps; })]);

              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Frequency");

              svg.selectAll(".bar")
                  .data(data)
                .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", function(d) { return x(d.Hour); })
                  .attr("width", x.rangeBand())
                  .attr("y", function(d) { return y(d.Steps); })
                  .attr("height", function(d) { return height - y(d.Steps); });

            });

            function type(d) {
              d.Steps = +d.Steps;
              return d;
            }
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
        caloriesD3();
        stepsD3();
    }
 ]);
