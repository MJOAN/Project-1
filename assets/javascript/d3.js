  var data = [{

          "date": "10/06/2017",
          "highTemp": '95',
          "lowTemp": '73',
          "respiratory": true,
          "neurological": false,
          "malaise": false,
          "digestive": false,
          "alcohol": false,
          "comment": "Just allergies",
          "dailyAct": "heavy",
          "restingHR": "60"
      },
      {
          "date": "10/07/2017",
          "respiratory": true,
          "neurological": false,
          "malaise": false,
          "digestive": true,
          "alcohol": true,
          "comment": "Upset stomach and allergies",
          "dailyAct": "heavy",
          "restingHR": "59",
          "highTemp": "97",
          "lowTemp": "76"
      },
      {
          "date": "10/08/2017",
          "alcohol": false,
          "comment": "Hot flashes",
          "dailyAct": "heavy",
          "respiratory": false,
          "neurological": false,
          "malaise": true,
          "digestive": false,
          "restingHR": "61",
          "highTemp": "91",
          "lowTemp": "60"
      },
      {
          "date": "10/09/2017",
          "alcohol": true,
          "comment": "Not feeling so great today, bad headache",
          "dailyAct": "moderate",
          "respiratory": false,
          "neurological": true,
          "malaise": false,
          "digestive": false,
          "restingHR": "60",
          "highTemp": "81",
          "lowTemp": "50"
      },
      {
          "date": "10/10/2017",
          "alcohol": false,
          "comment": "Feeling calm and well rested",
          "dailyAct": "light",
          "respiratory": true,
          "neurological": false,
          "malaise": false,
          "digestive": true,
          "restingHR": "61",
          "highTemp": "89",
          "lowTemp": "64"
      }
  ];
  console.log(data);


  $('#d3Button, #back').click(function() {
      var d3Storage = $("<div class='container'>");
      d3Storage.addClass("fadeIn d3View text-center");
      d3Storage.attr("data-target", "#d3Button");
      d3Storage.css({
          'display': 'none'
      });
      //   d3Storage.append("<br>");
      var goBack = $("<button id='back'>");
      goBack.addClass("btn btn-primary");
      goBack.html("Go Back");

      //this is for later purposes. When clicked, displays a load animation.
      var loadAnime1 = $("<div>");
      loadAnime1.addClass("firstAnimation")

      var loadAnime2 = $("<div>")
      $(".data-display").after(d3Storage);


      if (this.id === 'd3Button') {

          $(".data-display").animate({

              width: 'toggle',
              opacity: 'toggle'
          }, 400);



          setTimeout(function() {

              d3Storage.animate({
                  width: 'toggle',
                  opacity: 'toggle'
              }, 400);

              $(".d3View").append(goBack);
          }, 300);

      }

      (goBack).bind({
          click: function() {
              $('.data-display').animate({
                  width: 'toggle',
                  opacity: 'toggle'
              }, 400);
              d3Storage.animate({
                  opacity: 'toggle',
                  width: 'toggle'
              }, 100);

          },

      });




      var parseTime = d3.timeParse("%m/%d/%Y");
      // d3 graphing must happen inside child snapshot to load properly
      data.forEach(function(d) {
          d.date = parseTime(d.date);

          d.highTemp = +d.highTemp;
          d.lowTemp = +d.lowTemp;
          d.restingHR = +d.restingHR;

      });

      var formatTime = d3.timeFormat("%b %d %y");

      // build basic graph
      var margin = { top: 20, right: 20, bottom: 50, left: 70 },
          width = 1000 - margin.left - margin.right,
          height = 700 - margin.top - margin.bottom;
      var svg = d3.select(".d3View").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .style("border", "1px solid")
          .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")")
          .attr("id", "graph");

      // create the x scale
      var minDate = d3.min(data, function(d, i) {
          return d.date;
      });
      console.log(minDate);

      var maxDate = d3.max(data, function(d, i) {
          return d.date;
      });
      var x = d3.scaleBand()
          .domain(data.map(function(d) { return d.date; }))
          .range([0, width]);
      // create the y scale
      var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.highTemp; })])
          .range([height, 0]);
      // create the x axis
      var xAxis = d3.axisBottom(x)

          //   .ticks(5)

          .tickFormat(d3.timeFormat("%m %d %y"));
      svg.append("g")
          .attr("transform", function() {
              return "translate(" + 0 + "," + height + ")"
          })
          .call(xAxis);


      svg.append("text")
          .attr("transform",
              "translate(" + (width / 2) + " ," +
              (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .style("font-family", "Open Sans")
          .text("Date");


      // create the y axis
      var yAxis = d3.axisLeft(y).ticks(5);
      var yAxisGroup = svg.append("g")

          .attr("class", "yaxis")
          .call(yAxis);

      svg.append("text")
          .attr("class", "y-label")
          .attr("transform", "rotate(-90)")
          .attr("y", margin.right - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style("font-family", "Open Sans")
          .text("High Temp");


      var color = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { return d.highTemp; })])
          .range(["#53a7ea", "#ea4c4c"]);

      // element for notes tooltips
      var div = d3.select(".d3View").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("font-family", 'Open Sans');

      svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .transition()
          .duration(3000)
          .attr("x", function(d) { return x(d.date); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.highTemp); })
          .attr("height", function(d) { return height - y(d.highTemp); })
          .attr("fill", function(d) { return color(d.highTemp) });




      svg.selectAll("dot")
          .data(data)
          .enter().append("text")
          .attr("class", "symptom")
          .attr("width", x.bandwidth())
          .attr("height", 30)
          .attr("x", function(d) { return x(d.date) + 4; })
          .attr("y", function(d) { return y(d.highTemp) + 25; })
          .text("breathing")
          .style("fill", "#fff")
          .style("font-family", 'Open Sans')
          .style("font-size", "24px")
          .style("cursor", "pointer")
          .style("visibility", function(d) {
              if (d.respiratory === true) {
                  return "visible"
              } else {
                  return "hidden"
              }
          })
          .on("mouseover", function(d) {
              if (d.respiratory === true) {
                  d3.select(this)
                      .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");
              };
          })
          .on("mouseout", function(d) {
              if (d.respiratory === true) {
                  d3.select(this)
                      .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              }
          });


      svg.selectAll("dot")
          .data(data)
          .enter().append("text")
          .attr("class", "symptom")
          .attr("width", x.bandwidth())
          .attr("height", 30)
          .attr("x", function(d) { return x(d.date) + 4; })
          .attr("y", function(d) { return y(d.highTemp) + 55; })
          .text("digestion")
          .style("fill", "#fff")
          .style("font-family", 'Open Sans')
          .style("font-size", "24px")
          .style("cursor", "pointer")
          .style("visibility", function(d) {
              if (d.digestive === true) {
                  return "visible"
              } else {
                  return "hidden"
              }
          })
          .on("mouseover", function(d) {
              if (d.digestive === true) {
                  d3.select(this)
                      .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");
              };
          })
          .on("mouseout", function(d) {
              if (d.digestive === true) {
                  d3.select(this)
                      .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              }
          })

      svg.selectAll("dot")
          .data(data)
          .enter().append("text")
          .attr("class", "symptom")
          .attr("width", x.bandwidth())
          .attr("height", 30)
          .attr("x", function(d) { return x(d.date) + 4; })
          .attr("y", function(d) { return y(d.highTemp) + 85; })
          .text("unwell")
          .style("fill", "#fff")
          .style("font-family", 'Open Sans')
          .style("font-size", "24px")
          .style("cursor", "pointer")
          .style("visibility", function(d) {
              if (d.malaise === true) {
                  return "visible"
              } else {
                  return "hidden"
              }
          })
          .on("mouseover", function(d) {
              if (d.malaise === true) {
                  d3.select(this)
                      .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");
              };
          })
          .on("mouseout", function(d) {
              if (d.malaise === true) {
                  d3.select(this)
                      .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              }
          })

      svg.selectAll("dot")
          .data(data)
          .enter().append("text")
          .attr("class", "symptom")
          .attr("width", x.bandwidth())
          .attr("height", 30)
          .attr("x", function(d) { return x(d.date) + 4; })
          .attr("y", function(d) { return y(d.highTemp) + 85; })
          .text("neurology")
          .style("fill", "#fff")
          .style("font-family", 'Open Sans')
          .style("font-size", "24px")
          .style("cursor", "pointer")
          .style("visibility", function(d) {
              if (d.neurological === true) {
                  return "visible"
              } else {
                  return "hidden"
              }
          })
          .on("mouseover", function(d) {
              if (d.neurological === true) {
                  d3.select(this)
                      .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");
              };
          })
          .on("mouseout", function(d) {
              if (d.neurological === true) {
                  d3.select(this)
                      .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              }
          })

      var valueline = d3.line()
          .x(function(d) { return x(d.date) + x.bandwidth() / 2; })
          .y(function(d) { return y(d.restingHR); });


      var heartRate = svg.append("path")
          .data([data])
          .attr("class", "line")
          .style("stroke", "#fff")
          .style("stroke-width", "4px")
          .style("fill", "none")
          .attr("d", valueline)
          .on("mouseover", function(d) {
              d3.select(this)
                  .style("stroke", "#53a7ea")
                  .style("stroke-width", "6px")
              div.attr()
              div.transition()
                  .duration(150)
                  .style("opacity", .95);
              div.html("Resting Heart Rate Trends")
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY) + "px");

          })
          .on("mouseout", function(d) {
              d3.select(this)
                  .style("stroke", "#fff")
                  .style("stroke-width", "4px");

              div.transition()
                  .duration(200)
                  .style("opacity", 0);
          });

      d3.select('.d3View')
          .append("div")
          .html('<button class="btn btn-primary" id="changeBack">View High Temp</button> <button class="btn btn-primary" id="tempChange">View Low Temp</button>');

// code block to change temperature to display low Temp
      function changeTemp() {
          d3.select(".y-label")
              .remove();

          svg.append("text")
              .attr("class", "y-label")
              .attr("transform", "rotate(-90)")
              .attr("y", margin.right - margin.left)
              .attr("x", 0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .style("font-family", "Open Sans")
              .text("Low Temp");
          var y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.lowTemp; })])
              .range([height, 0]);
          d3.select('.yaxis')
              .remove();
          var yAxis = d3.axisLeft(y).ticks(5);
          var yAxisGroup = svg.append("g")
              .attr("class", "yaxis")
              .call(yAxis);

          var color = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.lowTemp; })])
              .range(["#53a7ea", "#ea4c4c"]);

          svg.selectAll(".bar")
              .remove();

          svg.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .attr("class", "bar")
              .transition()
              .duration(3000)
              .attr("x", function(d) { return x(d.date); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return y(d.lowTemp); })
              .attr("height", function(d) { return height - y(d.lowTemp); })
              .attr("fill", function(d) { return color(d.lowTemp) });

          svg.selectAll(".symptom")
              .remove();

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.lowTemp) + 25; })
              .text("breathing")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.respiratory === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.respiratory === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.respiratory === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              });


          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.lowTemp) + 55; })
              .text("digestion")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.digestive === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.digestive === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.digestive === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.lowTemp) + 85; })
              .text("unwell")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.malaise === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.malaise === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.malaise === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.lowTemp) + 85; })
              .text("neurology")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.neurological === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.neurological === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.neurological === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })
          var valueline = d3.line()
              .x(function(d) { return x(d.date) + x.bandwidth() / 2; })
              .y(function(d) { return y(d.restingHR); });


          var heartRate = svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", "#fff")
              .style("stroke-width", "4px")
              .style("fill", "none")
              .attr("d", valueline)
              .on("mouseover", function(d) {
                  d3.select(this)
                      .style("stroke", "#53a7ea")
                      .style("stroke-width", "6px")
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html("Resting Heart Rate Trends")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");

              })
              .on("mouseout", function(d) {
                  d3.select(this)
                      .style("stroke", "#fff")
                      .style("stroke-width", "4px");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              });
      };

      d3.select('#tempChange').on("click", function() {
          changeTemp();

      })
      // revert graph to high temp display
      d3.select('#changeBack').on("click", function() {
          d3.select(".y-label")
              .remove();

          svg.append("text")
              .attr("class", "y-label")
              .attr("transform", "rotate(-90)")
              .attr("y", margin.right - margin.left)
              .attr("x", 0 - (height / 2))
              .attr("dy", "1em")
              .style("text-anchor", "middle")
              .style("font-family", "Open Sans")
              .text("High Temp");
          var y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.highTemp; })])
              .range([height, 0]);
          d3.select('.yaxis')
              .remove();
          var yAxis = d3.axisLeft(y).ticks(5);
          var yAxisGroup = svg.append("g")
              .attr("class", "yaxis")
              .call(yAxis);
          var color = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return d.highTemp; })])
              .range(["#53a7ea", "#ea4c4c"]);

          svg.selectAll(".bar")
              .remove();

          svg.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .attr("class", "bar")
              .transition()
              .duration(3000)
              .attr("x", function(d) { return x(d.date); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return y(d.highTemp); })
              .attr("height", function(d) { return height - y(d.highTemp); })
              .attr("fill", function(d) { return color(d.highTemp) });

          svg.selectAll(".symptom")
              .remove();

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.highTemp) + 25; })
              .text("breathing")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.respiratory === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.respiratory === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.respiratory === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              });


          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.highTemp) + 55; })
              .text("digestion")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.digestive === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.digestive === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.digestive === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.highTemp) + 85; })
              .text("unwell")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.malaise === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.malaise === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.malaise === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })

          svg.selectAll("dot")
              .data(data)
              .enter().append("text")
              .attr("class", "symptom")
              .attr("width", x.bandwidth())
              .attr("height", 30)
              .attr("x", function(d) { return x(d.date) + 4; })
              .attr("y", function(d) { return y(d.highTemp) + 85; })
              .text("neurology")
              .style("fill", "#fff")
              .style("font-family", 'Open Sans')
              .style("font-size", "24px")
              .style("cursor", "pointer")
              .style("visibility", function(d) {
                  if (d.neurological === true) {
                      return "visible"
                  } else {
                      return "hidden"
                  }
              })
              .on("mouseover", function(d) {
                  if (d.neurological === true) {
                      d3.select(this)
                          .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
                      div.attr()
                      div.transition()
                          .duration(150)
                          .style("opacity", .95);
                      div.html(formatTime(d.date) + ":<br>" + "Notes: " + d.comment)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY) + "px");
                  };
              })
              .on("mouseout", function(d) {
                  if (d.neurological === true) {
                      d3.select(this)
                          .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

                      div.transition()
                          .duration(200)
                          .style("opacity", 0);
                  }
              })

          var valueline = d3.line()
              .x(function(d) { return x(d.date) + x.bandwidth() / 2; })
              .y(function(d) { return y(d.restingHR); });


          var heartRate = svg.append("path")
              .data([data])
              .attr("class", "line")
              .style("stroke", "#fff")
              .style("stroke-width", "4px")
              .style("fill", "none")
              .attr("d", valueline)
              .on("mouseover", function(d) {
                  d3.select(this)
                      .style("stroke", "#53a7ea")
                      .style("stroke-width", "6px")
                  div.attr()
                  div.transition()
                      .duration(150)
                      .style("opacity", .95);
                  div.html("Resting Heart Rate Trends")
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY) + "px");

              })
              .on("mouseout", function(d) {
                  d3.select(this)
                      .style("stroke", "#fff")
                      .style("stroke-width", "4px");

                  div.transition()
                      .duration(200)
                      .style("opacity", 0);
              });
      })



  });

