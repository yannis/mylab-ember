import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var document = this.modelFor("documents.show");
    var version = this.store.createRecord('version');
    document.get('versions').pushObject(version);
    return version;
  }
});
