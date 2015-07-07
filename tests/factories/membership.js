import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('membership', {
  default: {
    role: 'basic',
    group: FactoryGuy.belongsTo('group'),
    user: FactoryGuy.belongsTo('user'),
  }
});
