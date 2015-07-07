import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var group = this.modelFor('groups.show');
    return this.store.createRecord('invitation', {group: group});
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('users', this.store.findAll('user'));
  }
});
