import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import {FactoryGuy, make, makeList} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | memberships/show', {
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
  var user = make('user');
  // currentSession().set('currentUser', user);
  // currentSession().set('secure.id', user.get('id'));
  var memberships = makeList('membership', 2, {user: user, readable: true, updatable: true, destroyable: true});
  var memberships2 = makeList('membership', 2, {user: user, readable: true, updatable: false, destroyable: false});
  var totalMemberships = memberships.concat(memberships2);
  TestHelper.handleFindQuery('memberships', [user.get('id')], totalMemberships);
  visit('/memberships');
  andThen(function() {
    assert.ok(find("a:contains(My memberships)"));
  });
  click("a:contains(My memberships)");
  andThen(function() {
    assert.equal(
      find(".memberships .memberships-membership").length, 4
    );
    assert.equal(
      find(".memberships .memberships-membership a.membership-edit").length, 2
    );
    assert.equal(
      find(".memberships .memberships-membership a.membership-destroy").length, 2
    );
    assert.equal(currentRouteName(), 'memberships.index');
    assert.equal(currentPath(), 'memberships.index');
    assert.equal(currentURL(), '/memberships');
  });
});
