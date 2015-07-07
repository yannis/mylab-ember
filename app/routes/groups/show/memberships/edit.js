import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    // var group = this.modelFor('groups.show');
    // var memberships = group.get('memberships');
    // return memberships.findBy('id', params.membership_id);
    return this.store.find('membership', params.membership_id);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('groups', this.store.findAll('group'));
    controller.set('users', this.store.findAll('user'));
  }
});
