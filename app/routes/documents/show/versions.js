import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor("documents.show").get('versions').sortBy('createdAt:desc');
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('document', this.modelFor("documents.show"));
  },

  actions: {
    optionSelected: function(id) {
      this.transitionTo('documents.show.versions.show', id);
    },
  }
});
