import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server, originalAlert, savedText;

module('Acceptance | versions/destroy', {
  beforeEach: function() {
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
      authenticateSession();
      originalAlert = window.confirm; // store a reference to the window.confirm
      window.confirm = function(text) {
        savedText = text;
        return true;
      };
    });
  },

  afterEach: function() {
    Ember.run(function(){
      invalidateSession();
      TestHelper.teardown();
      application.destroy();
      window.confirm = originalAlert; // restore original functions
    });
  }
});

test('destroying a version', function(assert) {
  assert.expect(9);
  var doc = make('document', "with_versions");
  var version1 = doc.get('versions.firstObject');
  var version2 = doc.get('versions.lastObject');
  visit('/documents/'+doc.get('id')+'/versions/'+version1.get('id'));
  // TestHelper.handleFind(version1);
  andThen(function() {
    assert.equal(currentRouteName(), 'documents.show.versions.show', "Access the correct route");
    assert.equal(currentPath(), 'documents.show.versions.show', "Correct path");
    assert.equal(currentURL(), '/documents/'+doc.get('id')+'/versions/'+version1.get('id'), "Correct URL");
    assert.equal(
      find('a[title="Destroy this version"]').length, 1, "link to destroy exists"
    );
  });
  TestHelper.handleDelete('version', version1.get('id'));
  click('a[title="Destroy this version"]');
  andThen(function() {
    assert.equal(savedText, "Are you sure you want to delete this version?", "Confirmation is triggered");
    assert.equal(currentRouteName(), 'documents.show.versions.show');
    assert.equal(currentPath(), 'documents.show.versions.show', "Correct path");
    assert.equal(currentURL(), '/documents/'+doc.get('id')+'/versions/'+version2.get('id'), "Correct URL");
    // assert.equal(
    //   find("h3:contains(Version '"+version2.get('name')+"')").length, 1, "Displays previous version title"
    // );
    assert.equal(
      find("div.alert:contains(Version deleted)").length, 1, "Displays success flash"
    );
  });
});
