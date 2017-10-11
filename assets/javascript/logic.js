// VARIABLES: 
//__________________________________________________________________________________________
// FUNCTIONS: 
//__________________________________________________________________________________________

// MAIN PROCESS:
//__________________________________________________________________________________________


//All the front page shit
var days = {
    day: 5,
    events: [],
    classes: "day",
    date: moment("2015-12-31")
};


template: $('#calendar-template').html()



// there are a lot of options. the rabbit hole is deep.
$('#calendar').clndr({
    template: $('#calendar-template').html(),
    events: [
        { date: '2013-09-09', title: 'CLNDR GitHub Page Finished', url: 'http://github.com/kylestetz/CLNDR' }
    ],
    clickEvents: {
        click: function(target) {
            console.log(target);
        },
        onMonthChange: function(month) {
            console.log('you just went to ' + month.format('MMMM, YYYY'));
            calendarDays();

        }
    },
    doneRendering: function() {
        console.log('this would be a fine place to attach custom event handlers.');
    }
});





//prepend a filled form top the top of the page when a non-active day is clicked. 


$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $(".data-display").animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');

        $(".calendar").animate({

            "opacity": 'toggle'
        }, 'slow');

        $(".location-div").animate({
            width: 'toggle'

        });

    }
});

$('#backCalendar').click(function() {
    if ( this.id === "backCalendar") {
        $(".data-display").animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');

        $(".calendar").animate({

            "opacity": 'toggle'
        }, 'slow');
    }
})

//toggles D3
$('#d3Button, #back').click(function() {

    var d3Storage = $("<div class='container'>");
    d3Storage.addClass("fadeIn d3View text-center");
    d3Storage.attr("data-target", "#d3Button");
    d3Storage.html("Hi my name is bartholomew");
    d3Storage.css({
    "text-align": 'center',
     'font-size': "100px",
     'display': 'none'
    });
    d3Storage.append("<br>");
    var goBack = $("<button id='back'>");
    goBack.addClass("btn btn-primary");
    goBack.html("Go Back Jack");

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

function calendarDays() {
    $("td.day.today").click(function() {

        $("td.day.today").attr('data-toggle', 'modal');
        $("td.day.today").attr('data-target', '#myModal')

    });


$("td.day.past").click(function(e) {
        
     // escape key maps to keycode `27`
        $(".data-display").animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');

        $(".calendar").animate({

            "opacity": 'toggle'
        }, 'slow');

        $(".location-div").animate({
            width: 'toggle'

        });

        $(".currentDay").append();

   
});

    $("td.day").click(function() {

        $('.daySelected').append(JSON.stringify(obj));
    });
};

calendarDays();

