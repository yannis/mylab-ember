import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('sharing', {
  default: {
    group: FactoryGuy.belongsTo('group'),
    // sharable: FactoryGuy.belongsTo('document'),
  }
});
