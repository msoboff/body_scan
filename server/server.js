

Meteor.methods({
    sendEmail: function (to, from, subject, text, attachment) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text,
            attachment: attachment
        });
    }
});

//Email.send({
//    from: "meteor.email.2014@gmail.com",
//    to: "your-personal-email-here@gmail.com",
//    subject: "Meteor Can Send Emails via Gmail",
//    text: "Its pretty easy to send emails via gmail."
//});