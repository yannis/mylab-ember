import Ember from 'ember';

export default Ember.Controller.extend({
  roles: function(){
    return ['admin', 'basic'];
  },
  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function(membership) {
        Ember.get(_this, 'flashMessages').success('Membership saved!', {sticky: true});
        _this.transitionToRoute('memberships.show', membership);
      });
    }
  },
});
