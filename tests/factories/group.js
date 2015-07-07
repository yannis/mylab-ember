import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('group', {
  sequences: {
    groupName: function(num) {
      return 'Group' + num;
    }
  },
  default: {
    name: FactoryGuy.generate('groupName'),
    readable: true,
    updatable: true,
    destroyable: true
  },
  traits: {
    with_memberships: {
      memberships: FactoryGuy.hasMany('membership', 2)
    },
    with_sharings: {
      sharings: FactoryGuy.hasMany('sharing', 2)
    },
  }
});
