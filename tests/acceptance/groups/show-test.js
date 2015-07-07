import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var App;

module('Acceptance | groups/show', {
  beforeEach: function () {
    Ember.run(function () {
      App = startApp();
      TestHelper.setup();
      authenticateSession();
    });
  },
  afterEach: function () {
    Ember.run(function () {
      invalidateSession();
      TestHelper.teardown();
      FactoryGuy.clearStore();
      App.destroy();
    });
  }
});

test('visiting /groups', function(assert) {
  var group = FactoryGuy.make('group', 'with_documents');
  visit('/groups');

  andThen(function() {
    assert.equal(currentURL(), '/groups/1/documents');
  });
});

test('visiting /groups/show', function(assert) {
  var group = FactoryGuy.make('group', 'with_sharings', 'with_memberships');
  TestHelper.handleFind(group);
  visit('/groups/'+group.get('id'));

  andThen(function() {
    assert.equal(currentURL(), '/groups/'+group.get('id')+'/documents');
    assert.equal(find("h1:contains(Groups)").length, 1);
    assert.equal(find("h2:contains(Group '"+group.get('name')+"')").length, 1);
    assert.equal(find("h3:contains(Documents)").length, 1);
    assert.equal(find("ul.sharables .list-group-item").length, 2);
  });
});

test('visiting /groups/edit', function(assert) {
  var group = FactoryGuy.make('group', 'with_sharings', 'with_memberships', {updatable: true});
  TestHelper.handleFind(group);
  visit('/groups/'+group.get('id'));
  andThen(function() {
    assert.equal(find("a[title='Edit this group']").length, 1);
  });
});
