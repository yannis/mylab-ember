import Ember from 'ember';

export default Ember.Controller.extend({

  // needs: ["documents/show/versions"],

  categories: function(){
    return this.get('model.store').findAll('document');
  },
  actions: {
    save: function() {
      var _this = this;
      _this.get('flashMessages').clearMessages();
      this.get('model').save().then(
        function(document) {
          _this.get('flashMessages').success('Document saved!', {sticky: false});
          if (_this.get('version')) {
            _this.get('version').save().then(
              function(version){
                _this.transitionToRoute('documents.show.versions.show', document, version);
              },
              function(){}
            );
          } else {
            _this.transitionToRoute('documents.show', document);
          }
        },
        function(){}
      );
    },
  },
});
