
  Template.task_list.tasks = function () {
    return Tasks.find({}, {sort: {name: 1}});     
  };

  Template.new_task.events({
    'click button' : function () {
      Tasks.insert(
        {
          'creator': Meteor.userId(),
          'name': $('input').val(),
          'created_at': (new Date())
        }
      );
    }
  });
  
  Template.task.creator_email = function (){
    var creator = Meteor.users.findOne(this.creator);
    // if logged in
    if (creator._id === Meteor.userId()) {
      return "me";
    } else {
      return displayName(creator);
    } 
  };

  Template.task.created_at = function() {
    return displayDate(this.created_at);
  };

  Template.task.not_started = function (){
    return !this.is_started;
  };

  Template.task.not_finished = function (){
    return !this.is_finished;
  };

  Template.task.events({
     'click #start' : function () {
      Tasks.update({_id: this._id },
        {$set: {'is_started': true, 'starter':  Meteor.userId() }});
     },
     'click #finish' : function () {
      Tasks.update({_id: this._id },
        {$set: {'is_finished': true,  'finisher':  Meteor.userId() }});
     }
  });

  
  Template.tasks_in_progress.tasks = function () {
    return Tasks.find({$and: [{ 'is_started': true }, {'is_finished': {$ne: true}}]});
  };

  Template.tasks_with_me.tasks = function () {
    return Tasks.find({$and: [{ 'starter': Meteor.userId() }, {'is_finished': {$ne: true}}]});
  };

