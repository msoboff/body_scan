
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


Template.rightLegFront.events({
    //handle form submission when user is entering pain and tightness data
    'submit form': function(event) {
        event.preventDefault();
        var x = document.getElementById("rangeInput").value;
        var muscleSelected = "rightLeg";
        Logs.insert({
            pain: x,
            createdBy: Meteor.user().emails[0].address,
            date: today,
            muscleSelected: muscleSelected
        })
        //should check for errors here then close modal
        IonModal.close();
    },

    //update numbers for the range slider when user scrolls right or left
    "change #rangeInput": function(evt) {
        evt.preventDefault();
        var newPain = document.getElementById("rangeInput").value;
        document.getElementById("amount").value = newPain;
    }


});