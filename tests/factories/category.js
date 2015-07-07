import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('category', {
  sequences: {
    categoryName: function(num) {
      return 'Category' + num;
    }
  },
  default: {
    name: FactoryGuy.generate('categoryName')
  },
});
