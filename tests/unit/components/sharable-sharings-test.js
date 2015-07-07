import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy';
import TestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import startApp from '../../helpers/start-app';
import initializeTestHelpers from 'simple-auth-testing/test-helpers';
import { test, moduleForComponent } from 'ember-qunit';

var component, application;
moduleForComponent('sharable-sharings', 'Unit | Component | sharable sharings', {
  unit: true,
  beforeEach: function() {
    // see https://github.com/rwjblue/ember-qunit/issues/52#issuecomment-109611759
    this.registry.register('service:-routing', Ember.Object.extend({
      availableRoutes: function() { return ['index']; },
      hasRoute: function(name) { return name === 'index'; },
      isActiveForRoute: function() { return true; },
      generateURL: function() { return "/"; }
    }));
    Ember.run(function(){
      application = startApp();
      TestHelper.setup();
    });
    component = this.subject();
  },

  afterEach: function() {
    Ember.run(function(){
      TestHelper.teardown();
      application.destroy();
    });
  }
});

test('it renders', function(assert) {
  assert.expect(4);
  assert.equal(component._state, 'preRender');
  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.isEditing, false);
  assert.equal($.trim(this.$().text()), 'Shared with groups ()');
});

test('edit isEditing status', function(assert) {
  var user = FactoryGuy.make('user', 'with_memberships', {canCreateSharing: true});
  var group1 = FactoryGuy.make('group', {name: 'group_1'});
  var group2 = FactoryGuy.make('group', {name: 'group_2'});
  var group3 = FactoryGuy.make('group', {name: 'group_3'});
  var membership1 = FactoryGuy.make('membership', {group: group1, user: user});
  var membership2 = FactoryGuy.make('membership', {group: group2, user: user});
  var membership3 = FactoryGuy.make('membership', {group: group3, user: user});
  var doc = FactoryGuy.make('document', {user: user, updatable: true});
  var sharing1 = FactoryGuy.make('sharing', {group: group1, sharable: doc});
  var sharing2 = FactoryGuy.make('sharing', {group: group2, sharable: doc});

  var groups = Ember.ArrayProxy.extend(Ember.SortableMixin, {
    sortProperties: ['name'],
    sortAscending: true,
    content: [group1, group2, group3]
  });

  var targetObject = {
    model: doc,
    store: application.container.lookup('store:main'),
   };

  authenticateSession();
  currentSession().set('currentUser', user);
  component.set('targetObject', targetObject);
  component.set('groups', groups);

  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.isEditing, false);
  assert.equal(component.get('sharedGroups').length, 2);
  assert.equal(component.get('sharedGroups.lastObject.name'), "group_2");
  assert.equal(component.get('sharedGroups.firstObject.name'), "group_1");
  assert.equal(doc.get('sharings.length'), 2);
  assert.equal(find('.list-group-item').length, 2);
  assert.equal(component.get('model.name'), doc.get('name'));
  Ember.run(function(){
    component.set('isEditing', true);
  });
  assert.equal(find('.list-group-item input').length, 3);
  assert.equal(component.get('availableGroups.firstObject.name'), "group_3");

  invalidateSession();
});

