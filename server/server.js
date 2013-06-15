 Meteor.startup(function () {
    Accounts.addAutopublishFields({
      'forOtherUsers': ['emails']
    });
  });

