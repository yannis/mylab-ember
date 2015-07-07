import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server, originalAlert, savedText;

module('Acceptance | documents/destroy', {
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
      application.destroy();
      window.confirm = originalAlert; // restore original functions
    });
  }
});

test('destroying a document', function(assert) {
  var user = make('user', 'with_documents');
  var doc1 = user.get('documents.firstObject');
  var doc2 = user.get('documents.lastObject');
  doc1.set('destroyable', true);
  doc2.set('destroyable', true);
  // var doc2 = make('document', {name : "The second document", user: doc1.get('user')});
  visit('/documents/'+doc2.get('id'));
  TestHelper.handleFind(doc2);
  andThen(function() {
    assert.equal(currentRouteName(), 'documents.show.versions.index');
    assert.equal(currentPath(), 'documents.show.versions.index');
    assert.equal(
      find("h1:contains("+doc2.get('name')+")").length, 1, "Displays previous document title"
    );
    assert.equal(
      find('a.document-destroy').length, 1, "link to destroy exists"
    );
  });
  TestHelper.handleDelete('document', doc2.get('id'));
  TestHelper.handleFind(doc1);
  click('a.document-destroy');
  andThen(function() {
    assert.equal(savedText, "Are you sure you want to delete this document?", "Confirmation is triggered");
    assert.equal(currentRouteName(), 'documents.show.versions.index');
    assert.equal(currentPath(), 'documents.show.versions.index');
    assert.equal(currentURL(), '/documents/'+doc1.get('id')+'/versions');
    assert.equal(
      find("div.alert:contains(Document destroyed)").length, 1, "Displays success flash"
    );
    // assert.equal(
    //   find("h1:contains(The first Document!)").length, 1, "Displays previous document title"
    // );
  });
});
