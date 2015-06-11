import Ember from 'ember';
import config from '../config/environment';
// import { raw as icAjaxRaw } from 'ic-ajax';
import { request as icAjaxRequest } from 'ic-ajax';
import ic from 'ic-ajax';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var _this = this;
      var invitation = this.get('model');
      var user = this.get('user');
      user.set("invitation_id", invitation.get("id"));
      user.set("token", invitation.get("token"));
      user.save({invitation_id: invitation.get('id')}).then(
        function(u) {
          _this.get('flashMessages').success('Account created!');
          var data = {identification: u.get("email"), password: u.get("password")};
          _this.get('session').authenticate('simple-auth-authenticator:devise', data).then(
            function(){
              _this.transitionToRoute('users.show', u.get('id'));
              invitation.reload();
            },
            function(arg1) {
              _this.get('flashMessages').error(arg1.errors);
            }
          );
        },
        function(error) {
          _this.get('flashMessages').danger('User not saved! '+error);
        }
      );
    },

    cancel: function() {
      this.model.rollback();
      this.transitionToRoute('login');
    }
  }
});
