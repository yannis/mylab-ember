import Ember from "ember";
import config from '../config/environment';
import { request as icAjaxRequest } from 'ic-ajax';
// import ic from 'ic-ajax';

export default Ember.Controller.extend({
  pageTitle: "Reset your password",
  actions: {
    reset_password: function() {
      var _this = this;
      var data = this.getProperties('email');

      if (Ember.isEmpty(data.email)) {
        this.set('errors', {email: ["can't be blank"]});
        return false;
      }

      var postData = {
        user: {
          email: data.email
        }
      };

      icAjaxRequest(config.apiHost+"/users/password", {method: 'post', data: postData}).then(
        function(){
          _this.transitionToRoute('login');
          _this.get('flashMessages').success('You will receive an email with instructions about how to reset your password within few minutes.', {sticky: true});
        },
        function(e){
          _this.set('errors', JSON.parse(e.jqXHR.responseText).errors);
        }
      );
    },
    cancel: function() {
      this.transitionToRoute('index');
    }
  }
});
