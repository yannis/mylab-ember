import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from 'mylab/tests/helpers/start-app';

var application;

module('Unit | Model | user', {
  beforeEach: function() {
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
    });
  },
  afterEach: function() {
    Ember.run(function(){
      FactoryGuy.clearStore();
      TestHelper.teardown();
      application.destroy();
    });
  }
});

test('has funny name', function() {
  var user = FactoryGuy.make('user', {name: 'A user'});
  equal(user.get('name'), 'A user');
});

test('has invitations_as_inviter', function() {
  var user = FactoryGuy.make('user', 'with_invitations_as_inviter');
  equal(user.get('invitationsAsInviter.length'), 2);
});

test('has invitations_as_invited', function() {
  var user = FactoryGuy.make('user', 'with_invitations_as_invited');
  equal(user.get('invitationsAsInvited.length'), 2);
});

test('has documents', function() {
  var user = FactoryGuy.make('user', 'with_documents');
  equal(user.get('documents.length'), 2);
});

test('has memberships', function() {
  var user = FactoryGuy.make('user', 'with_memberships');
  equal(user.get('memberships.length'), 2);
});
