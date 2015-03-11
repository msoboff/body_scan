
Template.sendEmail.events({
    'click .sendMail': function(){
        Meteor.call('sendEmail',
                'michaelsoboff@gmail.com',
                'michaelsoboff@gmail.com',
                'Hello from Michael!',
                'This is a test.',
                'test.txt');

    }
});