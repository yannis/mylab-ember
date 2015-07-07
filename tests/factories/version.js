import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('version', {
  sequences: {
    versionName: function(num) {
      return 'Version' + num;
    }
  },
  default: {
    name: FactoryGuy.generate('versionName'),
    document: FactoryGuy.belongsTo('document'),
    contentMd: "some content",
    contentHtml: "<p>some content</p>",
    // readable: true,
    updatable: true,
    destroyable: true,
  },
});
