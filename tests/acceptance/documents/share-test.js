import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server, originalAlert, savedText;

module('Acceptance | documents/share', {
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

test('sharing a document', function(assert) {
  var doc1 = make('document', {name: "The first Document!"});
  var doc2 = make('document', 'with_sharings');
  doc2.set('user', doc1.get('user'));
  visit('/documents/'+doc2.id);
  TestHelper.handleFind(doc2);
  andThen(function() {
    assert.equal(currentRouteName(), 'documents.show.versions.index');
    assert.equal(currentPath(), 'documents.show.versions.index');
    assert.equal(currentURL(), '/documents/'+doc2.id+'/versions');
    assert.equal(
      find("h3:contains(Shared with groups)").length, 1, "Displays the sharing panel"
    );
    assert.equal(
      find(".sharings .list-group-item").length, 2, "Displays the 2 sharings"
    );

  });
});
