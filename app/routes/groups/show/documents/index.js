import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.modelFor('documents');
  },

  afterModel: function(model) {
    if (model.length) {
      var lastUpdatedDocument = model.sortBy('updatedAt:desc').get('firstObject');
      return this.transitionTo('documents.show', lastUpdatedDocument);
    }
  }
});

