import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('memberships.show');
  },
  redirect: function () {
    this.transitionTo('versions');
  },
});


