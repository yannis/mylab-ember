import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.modelFor('documents.show');
  },
  redirect: function (model) {
    if (model) {
      this.transitionTo('documents.show.versions');
    }
  },
});


