import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/update valid', {
  beforeEach: function() {
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
      authenticateSession();
    });
  },

  afterEach: function() {
    Ember.run(function(){
      invalidateSession();
      TestHelper.teardown();
      application.destroy();
    });
  }
});

test('edit document with valid data', function(assert) {
  var doc = make('document', 'with_versions');
  visit('/documents/'+doc.get('id')+'/edit');

  andThen(function() {
    assert.equal(currentPath(), 'documents.edit');
    assert.equal(
      find("input.document-form-name").val(), "Document1", "current document name in input"
    );
  });
  fillIn('input.document-form-name', 'a new document name');
  TestHelper.handleUpdate(doc, {match: {contentMd: 'a new document name'}});
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("div.alert:contains(Document saved!)").length, 1, "Displays success flash"
    );
    assert.equal(currentPath(), 'documents.show.versions.show');
    assert.equal(currentRouteName(), 'documents.show.versions.show', 'Redirects to versions.show after create');
    assert.equal(currentURL(), '/documents/'+doc.get('id')+'/versions/1');
    assert.equal(
      find("h1:contains(a new document name)").length, 1, "Displays the new document name"
    );
  });
});
