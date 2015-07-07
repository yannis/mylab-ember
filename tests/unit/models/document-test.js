import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

var store, doc, version1, version2, version3;
moduleForModel('document', 'Unit | Model | document', {
  needs: ['model:user','model:category','model:picture','model:attachment','model:version','model:sharing'],

  beforeEach: function () {
    store = this.store();
    Ember.run(function() {
      doc = store.createRecord('document', {name: 'document1'});
      version1 = store.createRecord('version',
        {
          name: 'version1',
          document: doc,
          createdAt: new Date('2015-01-01'),
          updatedAt: new Date('2015-01-06')
        }
      );
      version2 = store.createRecord('version',
        {
          name: 'version2',
          document: doc,
          createdAt: new Date('2015-01-02'),
          updatedAt: new Date('2015-01-02')
        }
      );
      version3 = store.createRecord('version',
        {
          name: 'version3',
          document: doc,
          createdAt: new Date('2015-01-03'),
          updatedAt: new Date('2015-01-04')
        }
      );
      // var versions = document.get('versions').pushObjects([version1, version2]);
    });
  }
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('its valid', function(assert) {
  assert.ok(doc);
  assert.ok(doc instanceof DS.Model);
});

test('it has a name and versions', function(assert) {
  assert.equal(doc.get('name'), "document1");
  assert.equal(doc.get('nameForSelectMenu'), "document1");
  assert.equal(doc.get('versions.length'), 3);
  assert.equal(doc.get('lastVersion.name'), 'version3');
  assert.equal(doc.get('previousVersions.firstObject'), version2);
  assert.equal(doc.get('lastUpdatedVersion.name'), 'version1');
});
