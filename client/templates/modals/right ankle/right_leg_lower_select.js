
var muscles = [
    {
        muscleName: "Shin"
    },
    {
        muscleName: "Front of Ankle"
    },
    {
        muscleName: "Outer Ankle"
    },
    {
        muscleName: "Inner Ankle"
    },
    {
        muscleName: "Back of Ankle"
    }
];

Template.rightLowerLegSelect.helpers({
    postMuscles: muscles
});


Template.rightLowerLegSelect.events({
    'click button': function(event) {
        Session.set('targetMuscle', this.muscleName);
        console.log(this.muscleName);
        IonModal.close();
    }

});