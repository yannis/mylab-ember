import Ember from 'ember';
import { markdownConverter } from '../../../../utils/markdown-helpers';

// import ajax from 'ic-ajax';

export default Ember.Controller.extend({
  needs: ['documents/show'],
  actions: {
    save: function() {
      var _this = this;
      var model = this.get('model');
      var doc = this.get("controllers.documents/show.model");
      var converter = markdownConverter({ extensions: ['table', 'github'] });
      var md = this.get('model.contentMd');
      model.set('contentHtml', converter.makeHtml(md)).save().then(function(version) {
        doc.save();
        _this.transitionToRoute('documents.show.versions.show', version);
        _this.get('flashMessages').success('Version saved', {sticky: false});
      });
    }
  }
});
