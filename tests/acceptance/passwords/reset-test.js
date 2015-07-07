import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import pretenderServer from './../pretender-server';
import {make, makeList} from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | passwords/reset', {
  beforeEach: function() {
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
      server = pretenderServer;
    });
  },

  afterEach: function() {
    Ember.run(function(){
      invalidateSession();
      server.shutdown();
      TestHelper.teardown();
      application.destroy();
    });
  }
});

test('test passwords/reset with valid email', function(assert) {
  invalidateSession();
  var user = make('user');
  server.post('/api/v1/users/password', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({})];
  });
  visit('/login');

  andThen(function() {
    assert.equal(
      find("a:contains(Did you forget your password?)").length, 1, "password reset link exists"
    );
    click("a:contains(Did you forget your password?)");
  });
  andThen(function(){
    assert.equal(currentURL(), '/reset_password');
    assert.equal(currentRouteName(), 'reset_password');
    assert.equal(currentPath(), 'reset_password');

    fillIn('input#email', 'user@email.com');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.ok(find('.alert.alert-success:contains(You will receive an email with instructions about how to reset your password within few minutes.)'), "Success flash shown");
    assert.equal(currentURL(), '/login');
    assert.equal(currentRouteName(), 'login');
    assert.equal(currentPath(), 'login');
  });
});

test('test passwords/reset with invalid email', function(assert) {
  invalidateSession();
  var user = make('user');
  server.post('/api/v1/users/password', function(request) {
    return [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"email":["not found"]}})];
  });
  visit('/login');

  andThen(function() {
    click("a:contains(Did you forget your password?)");
  });
  andThen(function(){
    assert.equal(currentURL(), '/reset_password');
    assert.equal(currentRouteName(), 'reset_password');
    assert.equal(currentPath(), 'reset_password');
    fillIn('input#email', 'bad@mail.com');
    click('button[type="submit"]');
  });
  andThen(function() {
    assert.equal(
      find('p.text-danger:contains(Email not found)').length, 1, "got error on email"
    );
    assert.equal(currentURL(), '/reset_password');
    assert.equal(currentRouteName(), 'reset_password');
    assert.equal(currentPath(), 'reset_password');
  });
});
