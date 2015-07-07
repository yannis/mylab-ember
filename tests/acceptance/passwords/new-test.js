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

module('Acceptance | passwords/new', {
  beforeEach: function() {
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
      invalidateSession();
      server = pretenderServer;
    });
  },

  afterEach: function() {
    Ember.run(function(){
      server.shutdown();
      invalidateSession();
      TestHelper.teardown();
      application.destroy();
    });
  }
});

test('visiting /new_password/:token with valid params', function(assert) {
  var user = make('user', {token: "tokentokentokentoken"});
  server.put('/api/v1/users/password', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
  });

  visit('/new_password/tokentokentokentoken');

  andThen(function() {
    assert.equal(
      find("h1:contains(Change your password)").length, 1, "new password form exists"
    );
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
    // assert.equal(currentURL(), '/new_password/d531c9983a24726257a91');
    fillIn("input[name=password]", 'new_password');
    fillIn('input[name=password_confirmation]', 'new_password');
    click('button[type="submit"]');
  });
  andThen(function() {
    assert.ok(find('.alert.alert-success:contains(Password changed successfully.)'), "successfull password change flash shown");
    assert.ok(find('.alert.alert-success:contains(Signed in successfully)'), "successfull signed in flash shown");
  });
});

test('visiting /new_password/:token with empty password', function(assert) {
  visit('/new_password/tokentokentokentoken');

  andThen(function() {
    assert.equal(
      find("h1:contains(Change your password)").length, 1, "new password form exists"
    );
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
    // assert.equal(currentURL(), '/new_password/d531c9983a24726257a91');
    fillIn("input[name=password]", '');
    fillIn('input[name=password_confirmation]', 'bad_new_password');
    click('button[type="submit"]');
  });
  andThen(function() {
    assert.ok(find("p.text-danger:contains(Password can't be blank)").length, "get error on password");
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
  });
});

test('visiting /new_password/:token with non matching password', function(assert) {
  visit('/new_password/tokentokentokentoken');

  andThen(function() {
    assert.equal(
      find("h1:contains(Change your password)").length, 1, "new password form exists"
    );
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
    // assert.equal(currentURL(), '/new_password/d531c9983a24726257a91');
    fillIn("input[name=password]", 'new_password');
    fillIn('input[name=password_confirmation]', 'bad_new_password');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.ok(find("p.text-danger:contains(Password doesn't match confirmation)").length, "got error on password");
    // assert.equal(currentURL(), '/new_password');
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
  });
});

test('visiting /new_password/:token with invalid token', function(assert) {
  var user = make('user', {token: "tokentokentokentoken"});
  server.put('/api/v1/users/password', function(request) {
    return [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"reset_password_token":["has expired, please request a new one"]}})];
  });

  visit('/new_password/invalidtoken');

  andThen(function() {
    assert.equal(
      find("h1:contains(Change your password)").length, 1, "new password form exists"
    );
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
    // assert.equal(currentURL(), '/new_password/invalidtoken');
    fillIn("input[name=password]", 'new_password');
    fillIn('input[name=password_confirmation]', 'new_password');
    click('button[type="submit"]');
  });
  andThen(function() {
    assert.ok(find('p.text-danger:contains(Reset password token has paf, please request a new one)'), "got error on token");
    // assert.equal(currentURL(), '/new_password');
    assert.equal(currentRouteName(), 'new_password');
    assert.equal(currentPath(), 'new_password');
  });
});
