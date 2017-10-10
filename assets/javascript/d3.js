
  //'use strict';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBiyVBjB1W3u7HfGNwDsZL5LahLTZUu5zM",
    authDomain: "test-database-837bf.firebaseapp.com",
    databaseURL: "https://test-database-837bf.firebaseio.com",
    projectId: "test-database-837bf",
    storageBucket: "test-database-837bf.appspot.com",
    messagingSenderId: "1088590406759"
  };

  firebase.initializeApp(config);
  var testDatabase = firebase.database();
  var dateRef = testDatabase.ref().child("/dates");

var data = [];
var d3Data = [];
var parseTime = d3.timeParse("%m/%d/%Y");
dateRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    d3Data.push(childData);

           

  });
for (i = 0; i < d3Data.length; i++) {
      var date = d3Data[i][0].Date;
       var meanTemp = d3Data[i][1]["Mean Temp "];
       var dateObj = {};
       dateObj['date'] = date;
       var tempObj = {};
       tempObj['value'] = meanTemp;
       data.push([dateObj, tempObj]);
    };
});
    console.log(data);




    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
    var svg = d3.select(".d3View").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "graph");

         data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.value = +d.value;
  });

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    x.domain(d3.extent(data, function(d) { return d.date; }));
    x.ticks(7);
    x.tickFormat(d3.timeFormat("%Y-%m-%d"));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

        svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.right - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-family", "Open Sans")
      .text("Mean Temp");  


    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .style("font-family", "Open Sans")
      .text("Date");

    var color = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range(["#53a7ea", "#ea4c4c"]); 

// element for notes tooltips
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("font-family", 'Open Sans'); 

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.date)})
        .attr("y", function(d) { return y(d.value); })
        .attr("width", width/data.length)
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.value) });

          // Add the X Axis
  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // Add the Y Axis
  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

/**
    svg.selectAll("dot")
      .data(data)
        .enter().append("rect")
      .attr("width", x.bandwidth())
      .attr("height", 50)
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.meanTemp); })
      .style("opacity", ".25")
            .style("visibility", function(d) {
        if (d.dizziness === true) {
            return "visible"
        }
        else {
            return "hidden"
        }
      })
      ;

        svg.selectAll("dot")
      .data(data)
        .enter().append("text")
      .attr("width", x.bandwidth())
      .attr("height", 30)
      .attr("x", function(d) { return x(d.x) + 4; })
      .attr("y", function(d) { return y(d.meanTemp) + 25; })
      .text("M")
      .style("fill", "#fff")
      .style("font-family", 'Open Sans')
      .style("font-size", "24px")
      .style("cursor", "pointer")
            .style("visibility", function(d) {
        if (d.dizziness === true) {
            return "visible"
        }
        else {
            return "hidden"
        }
      })
            .on("mouseover", function(d) {
      if (d.dizziness === true) {
      d3.select(this)
      .style("text-shadow", "-1px 0 #53a7ea, 0 1px #53a7ea, 1px 0 #53a7ea, 0 -1px #53a7ea");
      div.attr() 
       div.transition()
         .duration(150)
         .style("opacity", .95);
       div.html("August " + d.x + ":<br/>" + d.notes)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY) + "px");
         };
       })
     .on("mouseout", function(d) {
        if (d.dizziness === true) {
            d3.select(this)
            .style("text-shadow", "0px 0, 0px 0, 0px 0, 0px 0");

       div.transition()
         .duration(200)
         .style("opacity", 0);
     }
       }) **/
