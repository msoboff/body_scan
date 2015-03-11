Router.configure({
    layoutTemplate: 'layout'

});

Router.route('/', {name: 'bodyScan'});

Router.route('/account', {name: 'account'});

Router.route('/recent', {name: 'recent'});

Router.route('/recent/:_id', {
    name: 'review',
    data: function() {
        return Logs.findOne(this.params._id);
    }
});

Router.route('/notifications', {name: 'notifications'});

var genLogin = function() {
    if(! Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
}



Router.onBeforeAction(genLogin, {only: ['bodyScan', 'account', 'recent']});
