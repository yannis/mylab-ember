import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    // var documents = this.modelFor('documents');
    // return documents.findBy('id', params.document_id);

    return this.store.findRecord('document', params.document_id);
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    var _this = this;
    this.controllerFor('documents').set('currentDocument', model);
    this.controllerFor('documents/show/sharings').set('model', model);
    // this.controllerFor('documents/show/sharings').set('groups', _this.store.findAll('group'));
    controller.set('groups', _this.store.findAll('group'));
  },

  actions: {
    cancel: function() {
      console.log("doc canceled");
      this.model.rollback();
      this.transitionToRoute('documents.show', this.get('model'));
    },

    saveSharing: function() {
      var _this = this;
      this.model.save().then(function(document) {
        _this.get('flashMessages').success('Document saved!', {sticky: true});
        _this.transitionToRoute('documents.show', document);
      });
    },

    cancelSharing: function() {
      this.model.rollback();
      this.render('documents/show/sharings', {   // the template to render
        into: 'documents/show',                // the template to render into
        outlet: 'groups',              // the name of the outlet in that template
        controller: 'documents/show/sharings'        // the controller to use for the template
      });
    },

    deleteVersion: function(version){
      var _this = this;
      if (window.confirm("Are you sure you want to delete this version?")) {
        version.destroyRecord().then(function(v) {
          _this.get('flashMessages').success('Version deleted');
          _this.transitionTo('documents.show', v.get('document'));
        });
      }
    },
  }
});


