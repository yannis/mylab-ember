import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('groups.show');
  },
  redirect: function (model) {
    if (model) {
      this.transitionTo('groups.show.documents');
    }
  },
});


