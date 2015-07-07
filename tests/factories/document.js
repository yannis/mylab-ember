import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('document', {
  extend: 'sharable',
  sequences: {
    documentName: function(num) {
      return 'Document' + num;
    }
  },
  default: {
    name: FactoryGuy.generate('documentName'),
    user: FactoryGuy.belongsTo('user'),
    readable: true,
    updatable: true,
    destroyable: true,
  },
  traits: {
    with_sharings: {
      sharings: FactoryGuy.hasMany('sharing', 2)
    },
    with_versions: {
      versions: FactoryGuy.hasMany('version', 2)
    }
  }
});
