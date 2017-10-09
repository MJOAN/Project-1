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
$("#button1").click(function() {

    $(".data-display").animate({
        width: '+=500',
        
    }, 'slow');

    $(".calendar").animate({
        
        "margin-left": '+=500'
    }, 'slow');

    $(".location-div").animate({
        width: 'toggle'


    });

});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $(".data-display").animate({

        'margin-left': '+=500'          
        }, 'slow');

    $(".calendar").animate({
        
        "margin-left": '+=500'
    }, 'slow');

    $(".location-div").animate({
        width: 'toggle'

    });

    }
});



$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});


function calendarDays() {
    $(".day-contents").wrap("<a data-toggle='modal' data-target='#myModal'>");

}

calendarDays();

