Router.configure({
    layoutTemplate: 'layout'

});

Router.route('/', {name: 'bodyScan'});

Router.route('/account', {name: 'account'});

Router.route('/recent', {name: 'recent'});

var genLogin = function() {
    if(! Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
}

Router.onBeforeAction(genLogin, {only: 'bodyScan'});