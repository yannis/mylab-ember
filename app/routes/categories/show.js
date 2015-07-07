import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    delete: function(category){
      var _this = this;
      if (window.confirm("Are you sure you want to delete this category?")) {
        category.destroyRecord().then(function() {
          _this.get('flashMessages').success('Category deleted');
          _this.transitionTo('categories');
        });
      }
    },
  }
});
