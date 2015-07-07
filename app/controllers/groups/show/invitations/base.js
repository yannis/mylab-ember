import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      var invitation = this.get('model');
      var inviter = this.get("session.currentUser");
      invitation.set('inviter', inviter);
      invitation.save().then(
        function() {
          _this.get('flashMessages').success('Invitation sent!');
          _this.transitionToRoute('groups.show', invitation.get('group'));
        },
        function(error){
          _this.get('flashMessages').danger(error);
        }
      );
    },
    cancel: function() {
      var group = this.model.get('group');
      this.model.rollback();
      this.transitionToRoute('groups.show', group);
    }
  }
});
