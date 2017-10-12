var days = {
        day: 5,
        events: [],
        classes: "day",
        date: moment("2015-12-31")
    };

    // this will use clndr's default template, which you probably don't want.
    //$('#calendar').clndr();

    // so instead, pass in your template as a string!
    //$('#calendar').clndr({
        template: $('#calendar-template').html()
   // });

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
            }
        },
        doneRendering: function() {
            console.log('this would be a fine place to attach custom event handlers.');
        }
    });