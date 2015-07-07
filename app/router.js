import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  // rootURL: '/documents/'
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route("reset_password");
  this.route("new_password", {path: 'new_password/:reset_password_token'});
  this.route('accept_invitation', { path: 'accept_invitation/:id/:token' });
  this.route('decline_invitation', { path: 'decline_invitation/:id/:token' });

  this.route('categories', function() {
    this.route('new');
    this.route('show', { path: ':category_id' });
    this.route('edit', { path: ':category_id/edit' });
  });

  this.route('documents', {path: 'documents'}, function() {
    this.route('shared');
    this.route('edit', {
      path: ':document_id/edit'
    });
    this.route('new');
    this.route('show', {path: ':document_id'}, function(){

      this.route('versions', function() {

        this.route('show', {path: ':version_id'});

        this.route('edit', {
          path: ':version_id/edit'
        });

        this.route('duplicate', {
          path: ':version_id/duplicate'
        });

        this.route('pdf', {
          path: ':version_id/pdf'
        });

        this.route('new');

      });
    });
  });
  this.route('memberships', function() {
    this.route('show', {path: ':membership_id'});
    this.route('new');
    this.route('edit', {path: ':membership_id/edit'});
  });

  this.route('users', function() {
    this.route('show', {
      path: ':user_id'
    }, function() {
      this.route('invitations', function() {
        this.route('show', {
          path: ':invitation_id'
        });
        this.route('edit', {path: ':invitation_id/edit'});
      });
    });
    this.route('new');
    this.route('edit', {path: ':user_id/edit'});
  });

  this.route('versions.new', {path: 'versions/new'});

  this.route('groups', function() {
    this.route('show', {path: ':group_id'}, function(){
      this.route('documents', {path: 'documents'});
      this.route('invitations', function() {
        this.route('new');
      });
      this.route('memberships', function() {
        this.route('show', {path: ':membership_id'});
        this.route('new');
        this.route('edit', {path: ':membership_id/edit'});
      });
    });
    this.route('new');
    this.route('edit', {path: ':group_id/edit'});


  });
  this.route("fourOhFour", { path: "*path"});
  this.route('documents:index');
});

export default Router;
