import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/show', {
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

test('visiting /documents/show', function(assert) {
  var doc = make('document', 'with_versions');
  visit('/documents/'+doc.get('id'));
  andThen(function() {
    assert.equal(currentRouteName(), 'documents.show.versions.show');
    assert.equal(currentPath(), 'documents.show.versions.show');
    assert.equal(currentURL(), '/documents/'+doc.get('id')+'/versions/1');
  });
  // click('a[href="/documents"]');
});
