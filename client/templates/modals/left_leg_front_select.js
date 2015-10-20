
var muscles = [
    {
        muscleName: "Hip Flexor"
    },
    {
        muscleName: "Quadriceps"
    },
    {
        muscleName: "Groin"
    },
    {
        muscleName: "Knee"
    },
    {
        muscleName: "Shin"
    },
    {
        muscleName: "Ankle"
    }
];

Template.leftLegFrontSelect.helpers({
    postMuscles: muscles
});


Template.leftLegFrontSelect.events({
    'click button': function(event) {
        Session.set('targetMuscle', this.muscleName);
        console.log(this.muscleName);
        IonModal.close();
    }

});