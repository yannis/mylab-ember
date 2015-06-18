import Ember from 'ember';
import pretenderServer from './../pretender-server';
import { module, test } from 'qunit';
import startApp from 'mylab/tests/helpers/start-app';

var application, server;

module('Acceptance | passwords/reset', {
  beforeEach: function() {
    application = startApp();
    server = pretenderServer;
    invalidateSession();
  },

  afterEach: function() {
    invalidateSession();
    server.shutdown();
    Ember.run(application, 'destroy');
  }
});

test('test passwords/reset with valid email', function(assert) {
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

    fillIn('input#email', 'user1@mail.com');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.ok(find('.alert.alert-success:contains(You will receive an email with instructions about how to reset your password within few minutes.)'));
    assert.equal(currentURL(), '/login');
    assert.equal(currentRouteName(), 'login');
    assert.equal(currentPath(), 'login');
  });
});

test('test passwords/reset with invalid email', function(assert) {
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
