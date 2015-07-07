import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | documents/create invalid', {
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

test('creates document with invalid data', function(assert) {
  visit('/documents/new');

  andThen(function() {
    assert.equal(currentRouteName(), 'documents.new');
    assert.equal(currentPath(), 'documents.new');
  });

  fillIn('input.document-form-name', '');
  click('input[value="Save"]');

  andThen(function() {
    assert.equal(
      find("p.text-danger:contains(name can't be blank)").length, 1, "got error on name"
    );
    assert.equal(currentRouteName(), 'documents.new');
    assert.equal(currentPath(), 'documents.new');
  });
});

