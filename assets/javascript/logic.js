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
            console.log(target.date._i);
            var targetDate=JSON.stringify(target.date._i);
            $(".currentDay").html(moment(targetDate).format("MM-DD-YYYY"));
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




     

     

function calendarDays() {
    $("td.day.today").click(function() {

        $("td.day.today").attr('data-toggle', 'modal');
        $("td.day.today").attr('data-target', '#myModal');

   


    });


$("td.day.past").click(function(e) {
        
     // escape key maps to keycode `27`
        $(".data-display").animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');

        $(".calendar").animate({

            opacity: 'toggle'
        }, 'slow');

        $(".location-div").animate({
            width: 'toggle'

        });

    console.log(JSON.stringify);
});
};

$('#backCalendar').click(function(){
    if (this.id === "backCalendar") {
        $(".data-display").animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
        $(".calendar").animate({

            opacity: 'toggle'
        }, 'slow');

    }
})
calendarDays();

