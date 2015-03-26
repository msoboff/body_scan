Meteor.subscribe('logs');


function builtColumn() {

    //returns an array of strings with each field from the mongo collection
    //it is sorted by date, with the first date being the most recent

    var newMuscle = Session.get('muscle');

    var newCursor = Logs.find({muscleSelected: newMuscle},{sort: {date: -1}}).fetch();

    var pain0 = Number(newCursor[0].pain);
    var date0 = newCursor[0].date;

    var pain1 = Number(newCursor[1].pain);
    var date1 = newCursor[1].date;

    var pain2 = Number(newCursor[2].pain);
    var date2 = newCursor[2].date;

    var pain3 = Number(newCursor[3].pain);
    var date3 = newCursor[3].date;

    var pain4 = Number(newCursor[4].pain);
    var date4 = newCursor[4].date;

    //var pain5 = Number(newCursor[5].pain);
    //var date5 = newCursor[5].date;
    //
    //var pain6 = Number(newCursor[6].pain);
    //var date6 = newCursor[6].date;


    $('#container-column').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: ''
        },

        credits: {
            enabled: false
        },

        xAxis: {
            categories: [
                //date6,
                //date5,
                date4,
                date3,
                date2,
                date1,
                date0
            ],

            title: {
                enabled: true,
                text: "Date"
            }
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Pain'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: [{
            name: "Pain Data",
            color: '#00FF00',
            data: [pain4,pain3, pain2, pain1, pain0]

        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.graph.rendered = function() {
    this.autorun(function () {
        builtColumn();
        console.log(Session.get('muscle'));
    })



}


Template.graph.helpers({

    setMuscle: function() {
        Session.set('muscle', this.muscleSelected);
    },

    muscleName: function() {
        return this.muscleSelected;
    }



});