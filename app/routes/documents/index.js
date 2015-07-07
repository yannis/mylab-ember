import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.modelFor('documents');
  },

  afterModel: function(model) {
    if (model.get('length')> 0) {
      var lastUpdatedDocument = model.sortBy('updatedAt:desc').get('firstObject');
      return this.transitionTo('documents.show', lastUpdatedDocument);
    } else {
      this.get('flashMessages').info("You don't have access to any documents yet. Start by creating your first document.", {sticky: true});
      return this.transitionTo('documents.new');
    }
  }
});

