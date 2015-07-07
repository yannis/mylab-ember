import Ember from 'ember';
import config from '../config/environment';
import { request as icAjaxRequest } from 'ic-ajax';

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
        var invitation = invitations.get('firstObject');
        if (!invitation) {
          _this.get('flashMessages').danger('Invitation not valid!');
        } else {
          var invitationId = invitation.get('id');
          icAjaxRequest(
            config.apiHost+'/invitations/'+invitationId+"/decline",
            {
              method: 'put',
              data: {
                token: params.token
              }
            }
          ).then(
            function(){
              invitation.reload();
              _this.get('flashMessages').success('Invitation declined');
            },
            function(error){
              invitation.reload();
              _this.get('flashMessages').danger('Invitation not declined: '+error);
            }
          );
        }
      },
      function(error) {
        _this.get('flashMessages').danger(error);
      }
    );
  },
  afterModel: function(){
    this.transitionTo('login');
  }
});
