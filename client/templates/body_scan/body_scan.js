

var side = "front";
Template.bodyScan.helpers({
    logs: function() {
        return Logs.find();
    }
});

Template.bodyScan.events({
    'click #flip': function(event) {
        if(side == "front") {
            document.getElementById("bodyMap").style.backgroundImage = "url(human-back.png)";
            side = "back";

        } else {
            document.getElementById("bodyMap").style.backgroundImage = "url(human-front.png)";
            side = "front";
        }


    }
});