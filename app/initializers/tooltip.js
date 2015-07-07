import Ember from 'ember';
export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  name: 'tooltip',
  initialize: function(){
    Ember.$(document).ready(function () {
      Ember.$('body').tooltip({
        selector: '[data-toggle="tooltip"]'
      });
    });
  },
};
