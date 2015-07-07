import VersionsBaseController from './base';

export default VersionsBaseController.extend({
  actions: {
    cancel: function() {
      if (this.get('model.hasDirtyAttributes') || this.get('model.document.hasDirtyAttributes')) {
        var leave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
        if (leave) {
          this.get('model').rollbackAttributes();
          this.get('model.document').rollbackAttributes();
          this.transitionToRoute('documents.show.versions.show', this.get('model'));
        } else {
          return false;
        }
      }
      this.transitionToRoute('documents.show.versions.show', this.get('model'));
    },
  }
});
