import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | versions/update valid', {
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

test('updates version with valid data', function(assert) {
  var doc = make('document', {updatable: true});
  var version = make('version', {document: doc, contentMd: "## old title", updatable: true});
  var newContentMd = "# I'm VERSION #1!!";

  TestHelper.handleFind('version', version);
  visit('/documents/1/versions/1');

  andThen(function() {
    assert.equal(currentPath(), 'documents.show.versions.show', 'currentPath is good', 'currentPath is good');
    assert.equal(currentRouteName(), 'documents.show.versions.show', 'currentPath is good');
    assert.equal(currentURL(), '/documents/1/versions/1', 'currentUrl is good');
    assert.equal(
      find('a.version-edit-link').length, 1, "link to edit exists"
    );
  });

  click('a.version-edit-link');

  andThen(function(){
    assert.equal(currentPath(), 'documents.show.versions.edit');
    assert.equal(currentRouteName(), 'documents.show.versions.edit');
    assert.equal(currentURL(), '/documents/1/versions/1/edit');
    assert.equal(
      find("textarea.version-form-content_md").val(), "## old title", "teaxtearea is shown"
    );
  });

  fillIn('input.document-form-name', "newDocument");
  fillIn('textarea.version-form-content_md', newContentMd);
  TestHelper.handleUpdate(version, {match: {contentMd: newContentMd, document: doc}});
  TestHelper.handleUpdate(doc, {match: {name: "newDocument"}});
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("div.alert:contains(Version saved)").length, 1, "Displays success flash"
    );
    assert.equal(currentPath(), 'documents.show.versions.show');
    assert.equal(currentRouteName(), 'documents.show.versions.show', 'Redirects to documents.show.versions.show after update');
    assert.equal(currentURL(), '/documents/1/versions/1');
    assert.equal(
      find(".document-html h1:contains(I'm VERSION #1!!)").length, 1, "Displays the new document content"
    );
  });
});
