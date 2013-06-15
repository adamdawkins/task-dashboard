Tasks = new Meteor.Collection("tasks");
Tasks.allow({
  insert: function (userId, task) {
    return userId && task.creator === userId;
  },
  update: function (userId, task) {
    return userId;
  }
});


displayDate = function (date) {
  return humaneDate(date);
};

displayName = function (user) {
  return user.emails[0].address;
};
