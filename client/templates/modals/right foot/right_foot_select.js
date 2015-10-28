
var muscles = [
    {
        muscleName: "Big Toe"
    },
    {
        muscleName: "Plantar Fascia/Bottom of Foot"
    },
    {
        muscleName: "Heel"
    },
    {
        muscleName: "Top of Foot"
    },
    {
        muscleName: "Outside of Foot"
    }
];

Template.rightFootSelect.helpers({
    postMuscles: muscles
});


Template.rightFootSelect.events({
    'click button': function(event) {
        Session.set('targetMuscle', this.muscleName);
        console.log(this.muscleName);
        IonModal.close();
    }

});