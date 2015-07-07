import MembershipsBaseController from './base';

export default MembershipsBaseController.extend({
  actions: {
    cancel: function() {
      this.model.rollback();
      this.transitionToRoute('groups.show', this.get('model.group'));
    }
  }
});
