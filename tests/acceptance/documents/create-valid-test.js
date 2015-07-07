import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/create valid', {
  beforeEach: function() {
    application = startApp();
    TestHelper.setup();
    authenticateSession();
  },

  afterEach: function() {
    invalidateSession();
    TestHelper.teardown();
    application.destroy();
  }
});

test('creates document with valid data', function(assert) {
  // var doc = make('document');
  var newDocName = "new doc name";

  visit('/documents/new');

  andThen(function() {
    assert.equal(currentPath(), 'documents.new');
  });

  fillIn('input.document-form-name', newDocName);
  fillIn('textarea.version-form-content_md', "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  TestHelper.handleCreate('document', {match: {name: newDocName}});
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("div.alert:contains(Document saved!)").length, 1, "Displays success flash"
    );
    assert.equal(currentPath(), 'documents.show.versions.show');
    assert.equal(currentRouteName(), 'documents.show.versions.show', 'Redirects to versions.show after create');
    assert.equal(currentURL(), '/documents/1/versions/10');
    assert.equal(
      find("h1:contains('"+newDocName+"')").length, 1, "Displays document title"
    );
  });
});
