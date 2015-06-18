import Ember from 'ember';
import DS from 'ember-data';
import pretenderServer from './../pretender-server';
import {
  module,
  test
} from 'qunit';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/new invalid', {
  beforeEach: function() {
    application = startApp();
    server = pretenderServer;
    authenticateSession();
  },

  afterEach: function() {
    invalidateSession();
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

test('creates document with invalid data', function(assert) {
  visit('/documents/new');

  andThen(function() {
    assert.equal(currentPath(), 'documents.new');
  });

  fillIn('input.document-form-name', '');
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("p.text-danger:contains(name can't be blank)").length, 1, "got error on name"
    );
    // assert.equal(currentURL(), '/reset_password');
    assert.equal(currentRouteName(), 'documents.new');
    assert.equal(currentPath(), 'documents.new');
  });
});

