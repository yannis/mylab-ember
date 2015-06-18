import Ember from 'ember';

export default Ember.Controller.extend({

  pdfUrlWithCredentials: function(){
    return this.get('model.pdfUrl')+"?token="+this.session.get('secure.token')+"&email="+this.session.get('secure.email').htmlSafe();
  }.property('model.pdfUrl'),

})
