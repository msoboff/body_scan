Meteor.subscribe('logs');


function builtColumn() {

    //returns an array of strings with each field from the mongo collection
    //it is sorted by date, with the first date being the most recent

    var newMuscle = Session.get('muscle');

    var newCursor = Logs.find({muscleSelected: newMuscle},{sort: {date: 1}}).fetch();


    var painArray = [];
    var dateArray = [];
    for(var i = 0; i<newCursor.length; i++) {
        painArray[i] = Number(newCursor[i].pain);
        dateArray[i] = newCursor[i].date;
    }

    console.log(painArray);
    console.log(dateArray);



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
            categories: dateArray,

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
            data: painArray

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