//subscribe to the Logs collection publication to get access to database
Meteor.subscribe('logs');

//function to get current date
var today = new Date();

var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = mm+'/'+dd+'/'+yyyy;




function yesterday(currentDate) {
    //slice the currentDate seen by the user and get the first two numbers which represent the month; i.e. 01 = Jan
    var month = currentDate.slice(0,2);

    //get current day, can be between 1-31 depending on month.
    //must take into consideration months with 28 days, 30 days, 31days, and leap year
    var day = currentDate.slice(3,5);

   //if the current day is the first of the month then we are going back to the previous month's last day
    if(day === '01') {
        month -= 1;
        if(month === 0) { // if we get to month 0, then set the month to December (12)
            month = '12';
        }
        if(month < 10) { // if month is less then 10, then we need to add a 0 to it, e.g. 03 for March
            month = '0'+ month;
        }
        if(month === '02') { // if the month is Feb (02) then set the day to be the 28th of Feb.
            day = '28';
        } else if(month === '04' || month === '06' || month === '09' || month === '11'){ //else if the month has 30 days
            day = '30';
        } else { //the month has 31 days
            day = '31';
        }

    } else { // if the current day is not the first of the month (01) then subtract the day and if day < 10 add 0 before
        day -=1;
        if(day < 10) {
            day = '0'+ day;
        }
    }

    var year = currentDate.slice(6,10);
    if(month === '12' && day === '31'){
        year -= 1;
    }
    currentDate = month + '/' + day + '/' + year;
    return currentDate;
}

function tomorrow(currentDate) {
    var month = currentDate.slice(0,2);

    var day = currentDate.slice(3,5);

    if(day === '31' && month === '01') {
        month = '02';
        day = '01';
    } else if(day === '31' && month === '03') {
        month = '04';
        day = '01';
    } else if(day === '31' && month === '05') {
        month = '06';
        day = '01';
    } else if(day === '31' && month === '07') {
        month = '08';
        day = '01';
    } else if(day === '31' && month === '08') {
        month = '09';
        day = '01';
    } else if(day === '31' && month === '10') {
        month = '11';
        day = '01';
    } else if(day === '31' && month === '12') {
        month = '12';
        day = '31';
    } else if(day === '28' && month === '02') {
        month = '03';
        day = '01';
    } else if(day === '30' && month === '05') {
        month = '05';
        day = '01';
    } else if(day === '30' && month === '06') {
        month = '07';
        day = '01';
    } else if(day === '30' && month === '09') {
        month = '10';
        day = '01';
    } else if(day === '30' && month === '11') {
        month = '12';
        day = '01';
    }
    else {
        day++;
        if(day < 10) {
            day = '0'+ day;
        }
    }

    var year = currentDate.slice(6,10);
    if(day === '31' && month === '12') {
        month = '01';
        day = '01';
        year++;
    }
    currentDate = month + '/' + day + '/' + year;
    return currentDate;
}

Session.set('day', today);

//Variable to check which side of body is being displayed; is updated upon click
var side = "front";

Session.set('side', "front");

//helpers for recent.html
Template.recent.helpers({
 //helper to show only the user selected muscle groups that match this particular day

    muscleSet:function() {
        var day = Session.get('day');
        var createdBy = Meteor.user().emails[0].address;
        //if there was no pain recorded for that day then insert arbitrary pain element
        if(Logs.find({date: day, createdBy: createdBy}).count() == 0) {
            Logs.insert(
                {
                    pain: 0,
                    createdBy: Meteor.user().emails[0].address,
                    date: day
                });
        }
        return Logs.find({date: day, createdBy: createdBy});


    },

    isCore:function() {
        return this.muscleGroup === "core" && Session.equals('side', "front");
    },

    isRightLegFront: function() {
        return this.muscleGroup === "rightLegFront" && Session.equals('side', "front");
    },

    isLeftLegFront: function() {
        return this.muscleGroup === "leftLegFront" && Session.equals('side', "front");
    },

    isLeftArmFront: function() {
        return this.muscleGroup === "leftArmFront" && Session.equals('side', "front");
    },
    isLeftLowerLeg: function() {
        return this.muscleGroup === "leftLowerLeg" && Session.equals('side', "front");
    },
    isLeftFoot: function() {
        return this.muscleGroup === "leftFoot" && Session.equals('side', "front");
    },
    isRightLowerLeg: function() {
        return this.muscleGroup === "rightLowerLeg" && Session.equals('side', "front");
    },
    isRightFoot: function() {
        return this.muscleGroup === "rightFoot" && Session.equals('side', "front");
    }


});



Template.recent.events({
   'click #yesterday': function(event) {
       var currentDate = this.date;
       var newDate = yesterday(currentDate);
       Session.set('day', newDate);
      // alert(Session.get('day'));
   },
    'click #tomorrow': function(event) {
        var currentDate = this.date;
        if(currentDate === today) {
            alert("You can't see into the future!");
        } else {
            var newDate = tomorrow(currentDate);
            Session.set('day', newDate);
            alert(Session.get('day'));
        }

    },
    'click #flip': function(event) {
       //first check the session variable and see what it is set to.
        //if it is set to front and users presses flip, then change the session variable and image to back
        if(Session.equals('side', "front")) {
            document.getElementById("bodyMap").style.backgroundImage = "url(human-back.png)";
            Session.set('side', "back");

            //do oppisite of above here
        } else {
            document.getElementById("bodyMap").style.backgroundImage = "url(human-front.png)";
            Session.set('side', "front");
        }


    }

});
