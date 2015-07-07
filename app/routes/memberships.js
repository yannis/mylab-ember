import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function() {
    return this.store.query('membership', {user_id: this.get('session.secure.id')});
  },

  actions: {
    // delete: function(membership){
    //   var _this = this;
    //   if (window.confirm("Are you sure you want to delete this membership?")) {
    //     membership.destroyRecord().then(function() {
    //       _this.transitionTo('memberships.index');
    //     });
    //   }
    // },
    deleteMembership: function(membership){
      var _this = this;
      if (window.confirm("Are you sure you want to delete this membership?")) {
        membership.destroyRecord().then(
          function() {
            _this.get('flashMessages').success('Membership deleted');
            _this.transitionTo('memberships.index');
          },
          function(response) {
            _this.get('flashMessages').danger(response.errors[0]);
            membership.rollbackAttributes();
            membership.reload();
          }
        );
      }
    },
  }
});

