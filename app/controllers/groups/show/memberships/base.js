import Ember from 'ember';

export default Ember.Controller.extend({
  roles: ['admin', 'basic'],
  actions: {
    save: function() {
      var _this = this;
      this.get('model').save().then(function(membership) {
        Ember.get(_this, 'flashMessages').success('Membership saved!', {sticky: false});
        _this.transitionToRoute('groups.show', membership.get('group'));
      });
    }
  },
});
