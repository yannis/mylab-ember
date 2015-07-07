import Ember from 'ember';

export default Ember.Component.extend({

  isEditing: false,
  groups: null,

  model: function(){
    return this.get("targetObject.model");
  }.property("targetObject"),

  store: function() {
    return this.get("targetObject.store");
  }.property("targetObject.store"),



  sharedGroups: function() {
    if (this.get("model.sharings")){
      return this.get("model.sharings").mapBy("group.content");
    }
  }.property("model.sharings.@each.group"),

  // groups: function(){
  //   var currentGroupsName = this.get("model.sharings").mapBy('group.content');
  //   return this.get("store").find('group');
  // }.property("store"),

  availableGroups: function(){
    var currentGroupsName = this.get("model.sharings").mapBy('group.content');
    return this.get("groups").filter(function(group) {
      return !currentGroupsName.contains(group);
    });
  }.property("groups", "model.sharings.@each.group"),

  actions: {
    editSharings: function(){
      this.set('isEditing', true);
    },
    doneEditingSharings: function(){
      this.set('isEditing', false);
    },
    addSharing: function(group){
      var _this = this;
      var model = this.get('model');
      // debugger
      // this.sendAction('addSharing', group);
      var store = this.get('store');
      var sharing = store.createRecord('sharing', {sharable: model, group: group});
      sharing.save().then( function(sharing) {
        model.get('sharings').addObject(sharing);
        _this.get('flashMessages').success("Shared with group '"+group.get('name')+"'!");
      });
    },
    destroySharing: function(group){
      var _this = this;
      var sharing = this.get("model.sharings.firstObject", {group: group});
      if (window.confirm("Are you sure you want to unshare this document?")) {
        sharing.destroyRecord().then( function() {
          // model.get('sharings').removeObject(sharing);
          _this.get('flashMessages').success("Unshared from group '"+group.get('name')+"'!");
        });
      }
    },
  }
});
