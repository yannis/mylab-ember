import Ember from 'ember';
import config from '../config/environment';
import { request as icAjaxRequest } from 'ic-ajax';
import ic from 'ic-ajax';

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
            function(invit){
              invitation.reload();
              _this.get('flashMessages').success('Invitation declined');
            },
            function(error){
              invitation.reload();
              _this.get('flashMessages').danger('Invitation not declined: '+error);
            }
          )
          // inv.set('token', params.token);
          // inv.set('state', 'declined');
          // inv.set('stateAt', new Date);
          // inv.save().then(
          //   function(){
          //     _this.get('flashMessages').success('Invitation declined!');
          //   },
          //   function(error) {
          //     _this.get('flashMessages').danger(error);
          //   }
          // );
          // return inv;
        };
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
