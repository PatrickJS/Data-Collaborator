window.angular.module('pmd.controllers.vizpick', [])
  .controller('VizPickController', [
    function($scope) {
      var creatChord = function() {
        var matrix = [
          [11975,  5871, 8916, 2868],
          [ 1951, 10048, 2060, 6171],
          [ 8010, 16145, 8090, 8045],
          [ 1013,   990,  940, 6907]
        ];
        var chord = d3.layout.chord()
              .padding(.05)
              .sortSubgroups(d3.descending)
              .matrix(matrix);
        var width = $('.chord-graph').width(),
            height = 400,
            innerRadius = Math.min(width, height) * .41,
            outerRadius = innerRadius * 1.1;

        var fill = d3.scale.ordinal()
            .domain(d3.range(4))
            .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

        var svg = d3.select(".chord-graph").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        svg.append("g").selectAll("path")
            .data(chord.groups)
          .enter().append("path")
            .style("fill", function(d) { return fill(d.index); })
            .style("stroke", function(d) { return fill(d.index); })
            .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
            .on("mouseover", fade(.1))
            .on("mouseout", fade(1));

        var ticks = svg.append("g").selectAll("g")
            .data(chord.groups)
          .enter().append("g").selectAll("g")
            .data(groupTicks)
          .enter().append("g")
            .attr("transform", function(d) {
              return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                  + "translate(" + outerRadius + ",0)";
            });

        ticks.append("line")
            .attr("x1", 1)
            .attr("y1", 0)
            .attr("x2", 5)
            .attr("y2", 0)
            .style("stroke", "#000");

        ticks.append("text")
            .attr("x", 8)
            .attr("dy", ".35em")
            .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
            .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
            .text(function(d) { return d.label; });

        svg.append("g")
            .attr("class", "chord")
          .selectAll("path")
            .data(chord.chords)
          .enter().append("path")
            .attr("d", d3.svg.chord().radius(innerRadius))
            .style("fill", function(d) { return fill(d.target.index); })
            .style("opacity", 1);

        // Returns an array of tick angles and labels, given a group.
        function groupTicks(d) {
          var k = (d.endAngle - d.startAngle) / d.value;
          return d3.range(0, d.value, 1000).map(function(v, i) {
            return {
              angle: v * k + d.startAngle,
              label: i % 5 ? null : v / 1000 + "k"
            };
          });
        }

        // Returns an event handler for fading a given chord group.
        function fade(opacity) {
          return function(g, i) {
            svg.selectAll(".chord path")
                .filter(function(d) { return d.source.index != i && d.target.index != i; })
              .transition()
                .style("opacity", opacity);
          };
        }
      }
      creatChord();
      var bubbleData = function (){
        var diameter = $('.bubble-graph').width(),
        height = 400,
        format = d3.format(",d");

        var pack = d3.layout.pack()
            .size([diameter - 4, height - 4])
            .value(function(d) { return d.size; });

        var svg = d3.select(".bubble-graph").append("svg")
            .attr("width", diameter)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(2,2)");

        d3.json("/data/BubbleData.json", function(error, root) {
          var node = svg.datum(root).selectAll(".node")
              .data(pack.nodes)
            .enter().append("g")
              .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
              .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

          node.append("circle")
              .attr("r", function(d) { return d.r; });

          node.filter(function(d) { return !d.children; }).append("text")
              .attr("dy", ".3em")
              .style("text-anchor", "middle")
              .text(function(d) { return d.name.substring(0, d.r / 3); });
        });

        d3.select(self.frameElement).style("height", diameter + "px");
      };
      bubbleData();
  }
]);
