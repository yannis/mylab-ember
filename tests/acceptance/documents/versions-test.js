import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server, originalAlert, savedText;

module('Acceptance | documents/versions', {
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

test('visiting /documents/versions', function(assert) {
  var select2;
  var doc = make('document', 'with_versions');
  visit('/documents/'+doc.get('id'));
  assert.expect(7);
  andThen(function() {
    assert.equal(currentRouteName(), 'documents.show.versions.show');
    assert.equal(currentPath(), 'documents.show.versions.show');
    assert.equal(currentURL(), '/documents/'+doc.get('id')+'/versions/'+doc.get('versions.firstObject.id'));
    assert.equal(
      find("div.select2-container:contains(Version 'Version1')").length, 1, "Select2 menu contains a Version1 option"
    );
    select2 = find("div.select2-container:contains(Version1)");
  });
  click("div.select2-container:contains(Version1) .select2-choice");
  andThen(function() {
    assert.equal($('.select2-results li').length, 2, "has correct options length");
    assert.equal($('.select2-results li:contains(Version \'Version1\' (created )').length, 1, "display version1");
    assert.equal($('.select2-results li:contains(Version \'Version2\' (created )').length, 1, "display version2");
    // click('.select2-results li:contains(Version \'version3\' (created )');
  });
  // andThen(function() {
  //   assert.equal(currentRouteName(), 'documents.show.versions.show');
  //   assert.equal(currentPath(), 'documents.show.versions.show');
  //   assert.equal(currentURL(), '/documents/1/versions/1');
  //   assert.equal(
  //     find("div.select2-container:contains(version1)").length, 1
  //   );
  //   select2 = find("div.select2-container:contains(version1)");
  // });
});
