
    $('#d3Button, #back').click(function() {
    var d3Storage = $("<div class='container'>");
    d3Storage.addClass("fadeIn d3View text-center");
    d3Storage.attr("data-target", "#d3Button");
    d3Storage.css({
     'display': 'none'
    });
    d3Storage.append("<br>");
    var goBack = $("<button id='back'>");
    goBack.addClass("btn btn-primary");
    goBack.html("Go Back");
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
var parseTime = d3.timeParse("%m/%d/%y");
// pull data from firebase
dateRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        d3Data.push(childData);

    });
    //push that data into an object that is usable by d3
    for (i = 0; i < d3Data.length; i++) {
        var date = d3Data[i][0].Date;
        var meanTemp = d3Data[i][1]["Mean Temp "];
        var maxHum = d3Data[i][2]["Max Hum "]
        var dateObj = {};
        dateObj['date'] = date;
        dateObj['value'] = meanTemp;
        dateObj['hum'] = maxHum;
        data.push(dateObj);
    };
    // d3 graphing must happen inside child snapshot to load properly
    data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.value =+ d.value;
        d.hum =+ d.hum;
        return d;
    });

    // build basic graph
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
    var svg = d3.select("body").append("svg")
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
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([height, 0]);
    // create the x axis
    var xAxis = d3.axisBottom(x)
        .ticks(7)
        .tickFormat(d3.timeFormat("%m %d %y"));
    svg.append("g")
        .attr("transform", function() {
            return "translate(" + 0 + "," + height + ")"
        })
        .call(xAxis);
    // create the y axis
    var yAxis = d3.axisLeft(y).ticks(5);
    var yAxisGroup = svg.append("g")
        .call(yAxis);

           var color = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.value; })])
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
        .attr("x", function(d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.value) });




});
console.log(d3Data);
console.log(data);
//this is for later purposes. When clicked, displays a load animation.
    var loadAnime1 = $("<div>");
    loadAnime1.addClass("firstAnimation")

    var loadAnime2 = $("<div>")
    $(".data-display").after(d3Storage);

    if (this.id === 'd3Button') {

        $(".data-display").animate({
            width: 'toggle',
            opacity:'toggle'
        }, 400);


          setTimeout( function() {

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
            }, 100 )

        },

    });

});
