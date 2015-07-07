import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'mylab/tests/helpers/start-app';

var application;

module('Acceptance | versions/update ', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /versions/edit', function(assert) {
  visit('/versions/edit');

  andThen(function() {
    assert.equal(currentURL(), '/versions/edit');
  });
});
