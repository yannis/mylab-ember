import Ember from 'ember';

// import ajax from 'ic-ajax';

export default Ember.Controller.extend({

  actions: {
    save: function() {
      var _this = this;
      var model = this.get('model');
      var converter = new Showdown.converter({ extensions: ['table', 'github'] });
      var md = this.get('model.contentMd');
      model.set('contentHtml', converter.makeHtml(md)).save().then(function(document) {
        _this.transitionToRoute('documents.show.versions.show', document);
        _this.get('flashMessages').success('Version saved', {sticky: false});
      });
    }
  }
});
