// file tests/factories/user.js
import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  sequences: {
    userName: function(num) {
      return 'User' + num;
    }
  },
  default: {
    name: FactoryGuy.generate('userName'),
    email: function(u){
      return u.name+'@email.com';
    },
    token: function(u){
      return u.name+'token';
    },
    canCreateSharing: true
  },
  // Create a named 'user' with custom attributes
  admin: {
    name: 'Admin'+FactoryGuy.generate('userName'),
    admin: true,
  },
  traits: {
    with_documents: {
      documents: FactoryGuy.hasMany('document', 2)
    },
    with_memberships: {
      memberships: FactoryGuy.hasMany('membership', 2)
    },
    with_invitations_as_inviter: {
      invitationsAsInviter: FactoryGuy.hasMany('invitation', 2)
    },
    with_invitations_as_invited: {
      invitationsAsInvited: FactoryGuy.hasMany('invitation', 2)
    }
  }
});
