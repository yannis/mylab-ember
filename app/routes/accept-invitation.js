import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    var session = this.get('session');
    if (session.isAuthenticated) {
      session.invalidate();
    }
  },

  model: function(params){
    var _this = this;
    return this.store.find('invitation', {id: params.id, token: params.token}).then(
      function(invitations){
        var inv = invitations.get('firstObject');
        if (!inv) {
          _this.get('flashMessages').danger('Invitation not valid!');
          _this.transitionTo('login');
        } else {
          inv.set('token', params.token);
          return inv;
        };
      },
      function(error) {
        _this.get('flashMessages').danger(error);
        _this.transitionTo('login');
      }
    );
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('user', this.store.createRecord('user', {email: model.get('email')}));
  },
});
