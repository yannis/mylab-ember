import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('invitation', {
  default: {
    inviter: FactoryGuy.belongsTo('user'),
    invited: FactoryGuy.belongsTo('user'),
    group: FactoryGuy.belongsTo('group'),
    state: 'accepted',
    stateAt: new Date(),
    inviterName: function(i){
      return i.inviter.name;
    },
    groupName: function(i){
      return i.group.name;
    },
  }
});
