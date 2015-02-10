Template.account.helpers({
    username: function() {
        return Meteor.user().emails[0].address;
    },
    joinedAt: function() {
      return Meteor.user().createdAt;
    }
});

Template.account.events({
    'click [data-action=sign-out]': function (event, template) {
        Meteor.logout(function () {
            Router.go('/');
        });
    }
});