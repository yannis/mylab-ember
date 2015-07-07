import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ["documents/show"],
  sortProperties: ['createdAt'],
  sortAscending: false,

  document: function(){
    return this.get("controllers.documents/show.model");
  }.property("controllers.documents/show")

});
