import Ember from 'ember';
import config from '../../config/environment';
import { request as icAjaxRequest } from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    acceptInvitation: function(invitation){
      var _this = this;
      var invitationId = invitation.get('id');
      icAjaxRequest(config.apiHost+'/invitations/'+invitationId+"/accept", {method: 'put'}).then(
        function(){
          invitation.reload();
          _this.get('flashMessages').success('Invitation accepted');
        },
        function(data){
          invitation.reload();
          _this.get('flashMessages').danger('Invitation not declined: '+data);
        }
      );
    },
    declineInvitation: function(invitation){
      console.log("declineInvitation");
      var _this = this;
      var invitationId = invitation.get('id');
      icAjaxRequest(config.apiHost+'/invitations/'+invitationId+"/decline", {method: 'put'}).then(
        function(){
          invitation.reload();
          _this.get('flashMessages').success('Invitation declined');
        },
        function(data){
          invitation.reload();
          _this.get('flashMessages').danger('Invitation not declined: '+data);
        }
      );
    },
    deleteInvitation: function(invitation){
      var _this = this;
      if (window.confirm("Are you sure you want to delete this invitation?")) {
        invitation.destroyRecord().then(function() {
          _this.get('flashMessages').success('Invitation canceled');
        });
      }
    }
  }
});
