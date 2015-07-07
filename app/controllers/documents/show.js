import Ember from 'ember';
import Mammoth from 'npm:mammoth'; // Using ember-browserify

export default Ember.Controller.extend({
  sortedVersions: function(){
    this.get('model.versions').sortBy('createdAt:desc');
  }.property('model.versions.@each'),


  currentVersionChanged: function(){
    if (this.get('currentVersion')) {
      this.transitionToRoute('documents.show.versions.show', this.get('currentVersion'));
    } else {
      this.transitionToRoute('documents.show.versions');
    }
  }.observes('currentVersion'),

  pdfUrlWithCredentials: function(){
    return this.get('currentVersion.pdfUrl')+"?token="+this.session.get('secure.token')+"&email="+this.session.get('secure.email').htmlSafe();
  }.property('currentVersion.pdfUrl'),

  actions: {

    createVersionFromWordFile: function(file) {
      var _this = this;
      Mammoth.convertToHtml({arrayBuffer: file.data}).then(
        function(result){
          var document = _this.get("model");
          var version = _this.get('store').createRecord('version', {
            contentHtml: result.value,
            document: document
          });
          version.save().then(function(v){
            document.get('versions').pushObject(v);
            _this.get('flashMessages').success('Docx successfully converted!', {sticky: false});
            _this.transitionToRoute('documents.show.versions.show', v);
          });
        },
        function(){}
      );
    },

    fileLoaded: function(file) {
      var self = this;
      // readAs="readAsFile"
      console.log(file.name, file.filename, file.type, file.size);

      if (isImage(file)) {
        savePicture(file);
      } else if (isDocument(file)) {
        saveAttachment(file);
      }

      function savePicture(file){
        var picture = self.get('store').createRecord('picture', {
          picturableId: self.get('model.id'),
          picturableType: self.get("model.constructor.typeKey").classify(),
          image: file
        });
        picture.save().then(reloadDocument).catch(failure);
      }

      function saveAttachment(file){
        var attachment = self.get('store').createRecord('attachment', {
          attachableId: self.get('model.id'),
          attachableType: self.get("model.constructor.typeKey").classify(),
          name: file.filename,
          file: file
        });
        attachment.save().then(reloadDocument).catch(failure);
      }

      function reloadDocument() {
        self.get('model').reload();
        Ember.$(".file-picker__preview").hide();
      }

      function failure(reason) {
        console.log("FAILURE!!!", reason.message);
      }

      function isImage(file) {
        var fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/tiff'];
        return Ember.$.inArray(file.type, fileTypes) >= 0;
      }

      function isDocument(file) {
        var fileTypes = ['application/msword', 'text/plain', 'text/richtext', 'text/richtext', 'application/rtf', 'application/pdf'];
        return Ember.$.inArray(file.type, fileTypes) >= 0;
      }
    },
  }
});
