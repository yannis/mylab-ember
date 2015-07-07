import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.modelFor('documents.show.versions');
  },

  redirect: function(model) {
    var lastCreatedVersion = model.sortBy('createdAt:desc').get('firstObject');
    if (lastCreatedVersion) {
      return this.transitionTo('documents.show.versions.show', lastCreatedVersion);
    }
  }
});

