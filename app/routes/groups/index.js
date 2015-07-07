import Ember from 'ember';

export default Ember.Route.extend({

  model: function(){
    return this.modelFor('groups');
  },

  afterModel: function(model) {
    if (model.get('length')> 0) {
      var firstGroup = model.sortBy('name:asc').get('firstObject');
      return this.transitionTo('groups.show', firstGroup);
    }
  }
});
