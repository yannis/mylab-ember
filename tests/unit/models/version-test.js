import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

var store, version, doc, doc2;
moduleForModel('version', 'Unit | Model | version', {
  // Specify the other units that are required for this test.
  needs: ['model:document', 'model:user', 'model:category', 'model:sharing', 'model:picture', 'model:attachment', 'model:thumbnail'],
  beforeEach: function () {
    store = this.store();
    Ember.run(function() {
      doc = store.createRecord('document', {name: "document_name"});
      doc2 = store.createRecord('document', {name: "document_name2"});
      version = store.createRecord('version', {
        id: 74576484,
        name: 'version_name',
        createdAt: "2015-02-01",
        pdfUrl: "http://mylab.dev/api/v1/versions/74576484.pdf",
        document: doc
      });
    });
  },
});

test('its valid', function(assert) {
  ok(version);
  ok(version instanceof DS.Model);
  equal(version.get('name'), "version_name");
  equal(version.get('pdfUrl'), "http://mylab.dev/api/v1/versions/74576484.pdf", "pdfUrl is ok");
  equal(version.get('nameForSelectMenu'), "Version 'version_name' (created February 1, 2015)");
});

test('it belongs to a document', function(assert) {
  version.get('document').then(function(d){
    ok(d instanceof DS.Model, "version document is a DS.model instance");
    equal(d, doc, "Version document is the right instance");
  });
});
