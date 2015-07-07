import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import pretenderServer from './pretender-server';
import {make} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | login', {
  beforeEach: function() {
    Ember.run(function(){
      server = pretenderServer;
      application = startApp();
      TestHelper.setup();
    });
  },

  afterEach: function() {
    Ember.run(function(){
      TestHelper.teardown();
      application.destroy();
      server.shutdown();
    });
  }
});

test('visiting /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentRouteName(), 'login');
    assert.equal(currentPath(), 'login');
  });
});

test('successfull login', function(assert) {
  invalidateSession();
  var user = make('user');
  var doc = make('document', 'with_versions', {user: user});
  server.post('/api/v1/users/sign_in', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({token: user.get('token'), email: user.get('email'), id: user.get('id')})];
  });

  assert.expect(4);
  visit('/login');
  andThen(function() {
    fillIn('input#identification', user.get('email'));
    fillIn('input#password', user.get('email'));
  });
  click('button[type="submit"]');
  andThen(function() {
    assert.ok(find('.alert.alert-success:contains(Successfully signed in!)'));
    assert.equal(currentRouteName(), 'documents.show.versions.index');
    assert.equal(currentPath(), 'documents.show.versions.index');
    assert.equal(currentURL(), '/documents/1/versions');
  });
});

// test('failed login', function(assert) {
//   invalidateSession();
//   var user = make('user');
//   var doc = make('document', 'with_versions', {user: user});
//   server.post('/api/v1/users/sign_in', function(request) {
//     return [422, {"Content-Type": "application/json"}, JSON.stringify({errors: "Invalid email or password"})];
//   });

//   assert.expect(4);
//   visit('/login').fillIn('input#identification', user.get('email')).fillIn('input#password', 'badpassword').click('button[type="submit"]'); // returns an assertion, I don't know why

//   andThen(function() {
//     assert.equal(
//       find('.alert:contains(Invalid email or password)').length, 1, "Error flash shown"
//     );
//     assert.equal(currentRouteName(), 'login');
//     assert.equal(currentPath(), 'login');
//   });
// });
