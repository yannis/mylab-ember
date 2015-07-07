// import Ember from 'ember';
import MarkdownToHtmlComponent from 'ember-cli-showdown/components/markdown-to-html';
import { markdownConverter } from '../utils/markdown-helpers';

export default MarkdownToHtmlComponent.extend({
  afterInit: function() {
    this.converter = markdownConverter({ extensions: ['table', 'github'] });
  }.on('init')
});
