import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('membership');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('groups', this.store.findAll('group'));
    controller.set('users', this.store.findAll('user'));
  }

});
