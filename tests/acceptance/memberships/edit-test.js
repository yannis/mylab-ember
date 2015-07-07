import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {FactoryGuy, make, makeList} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | memberships/edit', {
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

test('visiting /memberships', function(assert) {
  var user1 = make('user');
  var user2 = make('user');
  var group = make('group');
  var adminMembership = make('membership', {user: user1, group: group, role: 'admin', readable: true, updatable: false, destroyable: false});
  var basicMembership = make('membership', {user: user2, group: group, role: 'basic', readable: true, updatable: true, destroyable: true});
  basicMembership.set('group', group);
  // currentSession().set('currentUser', user1);
  // currentSession().set('secure.id', user1.get('id'));

  TestHelper.handleFind(group);
  visit('/groups/'+group.get('id'));
  andThen(function() {
    assert.equal(find("h2:contains(Group members (2))").length, 1);
    assert.equal(find(".group-memberships a.membership-update").length, 1);
    assert.equal(find(".group-memberships .list-group-item:contains(User2 (basic))").length, 1);
  });
  TestHelper.handleFind(basicMembership);
  click(".group-memberships a.membership-update");
  andThen(function() {
    assert.equal(currentRouteName(), 'memberships.edit');
    assert.equal(currentPath(), 'memberships.edit');
    assert.equal(currentURL(), '/memberships/'+basicMembership.get('id')+'/edit');
    assert.equal(find("select#form-membership-role").length, 1);
  });
  fillIn("select#form-membership-role", 'admin');
  TestHelper.handleUpdate(basicMembership);
  click('input[type="submit"]');
  andThen(function() {
    assert.equal(currentRouteName(), 'groups.show.documents');
    assert.equal(currentPath(), 'groups.show.documents');
    assert.ok(find('.alert.alert-success:contains(Membership saved!)'));
    assert.equal(basicMembership.get('role'), 'admin');
  });
});
