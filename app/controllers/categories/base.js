import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function(category) {
        _this.get('flashMessages').success('Category saved!');
        _this.transitionToRoute('categories.show', category);
      });
    }
  }
});
