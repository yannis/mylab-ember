import Ember from 'ember';
import DS from 'ember-data';
import pretenderServer from './../pretender-server';
import {
  module,
  test
} from 'qunit';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/edit valid', {
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

test('edit document with valid data', function(assert) {
  visit('/documents/1/edit');

  andThen(function() {
    assert.equal(currentPath(), 'documents.edit');
    assert.equal(
      find("input.document-form-name").val(), "document1", "current document name in input"
    );
  });

  fillIn('input.document-form-name', 'a new document name');
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("div.alert:contains(Document saved!)").length, 1, "Displays success flash"
    );
    assert.equal(currentPath(), 'documents.show.versions.index');
    assert.equal(currentRouteName(), 'documents.show.versions.index', 'Redirects to versions.index after create');
    assert.equal(currentURL(), '/documents/1/versions');
    assert.equal(
      find("h1:contains(a new document name)").length, 1, "Displays the new document name"
    );
  });
});
