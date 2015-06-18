import Ember from "ember";
import config from '../config/environment';
import { request as icAjaxRequest } from 'ic-ajax';
import ic from 'ic-ajax';

export default Ember.Controller.extend({
  pageTitle: "Change your password",
  actions: {
    update_password: function() {
      var _this = this;
      var data = this.getProperties('password', 'password_confirmation');

      if (Ember.isEmpty(data.password)) {
        this.set('errors', {password: ["can't be blank"]});
        return false;
      }
      if (data.password !== data.password_confirmation) {
        this.set('errors', {password: ["doesn't match confirmation"]});
        return false;
      }
      var putData = {
        user: {
          password: data.password,
          password_confirmation: data.password_confirmation,
          reset_password_token: _this.get("model")
        }
      };

      icAjaxRequest(config.apiHost+"/users/password", {method: 'put', data: putData}).then(
        function(response){
          _this.get('flashMessages').success('Password changed successfully.');
          var data = {identification: response.user.email, password: _this.get("password")};
          _this.get('session').authenticate('simple-auth-authenticator:devise', data).then(
            function(u){
              _this.get('flashMessages').success('Signed in successfully');
              _this.transitionToRoute('users.show', u.get('id'));
            },
            function(arg1) {
              _this.get('flashMessages').danger(arg1.errors);
            }
          );
        },
        function(e){
          _this.set('errors', JSON.parse(e.jqXHR.responseText).errors);
          // _this.get('flashMessages').danger(JSON.parse(e.jqXHR.responseText).errors, {sticky: true});
        }
      )
    },
    cancel: function() {
      return this.transitionToRoute('index');
    }
  }
});
