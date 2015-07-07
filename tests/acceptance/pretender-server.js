// import Ember from 'ember';
// import DS from 'ember-data';
import Pretender from 'pretender';

var categories = [
  {id: 1, name: 'category1'},
  {id: 2, name: 'category2'},
  {id: 3, name: 'category3'}
];

var documents = [
  // {id: 1, name: 'document1', version_ids: [1,2,3]},
  // {id: 2, name: 'document2', version_ids: [4,5,6], destroyable: true},
  // {id: 3, name: 'document3', version_ids: [7,8,9]}
];

var groups = [
  {id: 1, name: 'group1', membership_ids: [1,2]},
  {id: 2, name: 'group2', membership_ids: [3]},
  {id: 3, name: 'group3'}
];

var memberships = [
  {id: 1, group_id: 1, user_id: 1, role: 'admin'},
  {id: 2, group_id: 2, user_id: 1, role: 'basic'},
  {id: 3, group_id: 1, user_id: 2, role: 'basic'}
];

var sharings = [
  {id: 1, group_id: 1, sharable_id: 1, sharable_type: 'Document'},
  {id: 2, group_id: 2, sharable_id: 1, sharable_type: 'Document'}
];

var versions = [
  {id: 1, name: 'version1', document_id: 1, updatable: true, content_md: "# I'm VERSION #1!!", destroyable: true},
  {id: 2, name: 'version2', document_id: 1},
  {id: 3, name: 'version3', document_id: 1},
  {id: 4, name: 'version4', document_id: 2},
  {id: 5, name: 'version5', document_id: 2},
  {id: 6, name: 'version6', document_id: 2},
  {id: 7, name: 'version7', document_id: 3},
  {id: 8, name: 'version8', document_id: 3},
  {id: 9, name: 'version9', document_id: 3},
];

var users = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@mail.com',
    token: 'token1',
    password: "password1",
    reset_password_token: "aaaaaaaaaaa",
    membership_ids: [1,2]
  },
  {
    id: 2,
    name: 'user2',
    email: 'user2@mail.com',
    token: 'token2',
    password: "password2",
    reset_password_token: "d531c9983a24726257a91",
    membership_ids: [3]
  }
];

export default new Pretender(function() {

  // // session
  // this.post('/api/v1/users/sign_in', function(request) {
  //   var response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors: "Invalid email or password"})];
  //   var user = users.find(function(user) {
  //     if (request.requestBody.match(user.password) && request.requestBody.match(user.password).length > 0){
  //       response = [200, {"Content-Type": "application/json"}, JSON.stringify({token: user.token, email: user.email, id: user.id})];
  //     }
  //   });
  //   return response;
  // });


  // CSRF
  this.get('/api/v1/csrf', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({authenticity_token: "an_authenticity_token"})];
  });

  // Categories
  this.get('/api/v1/categories', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({categories: categories})];
  });
  this.get('/api/v1/categories/:id', function(request) {
    var category = categories.find(function(category) {
      if (category.id === parseInt(request.params.id, 10)) {
        return category;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({category: category})];
  });

  // Documents
  // index
  this.get('/api/v1/documents', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({documents: documents})];
  });
  // show
  this.get('/api/v1/documents/:id', function(request) {
    var document = documents.find(function(document) {
      if (document.id === parseInt(request.params.id, 10)) {
        return document;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({document: document})];
  });
  // update
  this.put('/api/v1/documents/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"name":["can't be blank"]}})];
    var document = documents.find(function(document) {
      if (document.id === parseInt(request.params.id, 10)) {
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({document: document})];
      }
    });
    if (request.requestBody.match(/"name":""/) && request.requestBody.match(/"name":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{name:["can't be blank"]}})];
    }
    return response;
  });
  // create
  this.post('/api/v1/documents', function(request) {
    var response = [200, {"Content-Type": "application/json"}, JSON.stringify({document: {id: 4, name: 'document4'}})];
    if (request.requestBody.match(/"name":""/) && request.requestBody.match(/"name":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{name:["can't be blank"]}})];
    }
    return response;
  });
  // destroy
  this.delete('/api/v1/documents/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({document: document})];
    documents.find(function(document) {
      if (document.id === parseInt(request.params.id, 10)) {
        response = [204, {"Content-Type": "application/json"}, null];
      }
    });
    return response;
  });

  // Groups
  this.get('/api/v1/groups', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({groups: groups})];
  });
  this.get('/api/v1/groups/:id', function(request) {
    var group = groups.find(function(group) {
      if (group.id === parseInt(request.params.id, 10)) {
        return group;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({group: group})];
  });

  // Users
  this.get('/api/v1/users', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({users: users})];
  });
  this.get('/api/v1/users/:id', function(request) {
    var user = users.find(function(user) {
      if (user.id === parseInt(request.params.id, 10)) {
        return user;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
  });

  // Versions
  // index
  this.get('/api/v1/versions', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({versions: versions})];
  });
  // show
  this.get('/api/v1/versions/:id', function(request) {
    var version = versions.find(function(version) {
      if (version.id === parseInt(request.params.id, 10)) {
        return version;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({version: version})];
  });
  // update
  this.put('/api/v1/versions/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"name":["can't be blank"]}})];
    var version = versions.find(function(version) {
      if (version.id === parseInt(request.params.id, 10)) {
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({version: version})];
      }
    });
    if (request.requestBody.match(/"name":""/) && request.requestBody.match(/"name":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{name:["can't be blank"]}})];
    }
    return response;
  });
  // create
  this.post('/api/v1/versions', function(request) {
    var response = [200, {"Content-Type": "application/json"}, JSON.stringify({version: {id: 10, name: 'version10'}})];
    if (request.requestBody.match(/"name":""/) && request.requestBody.match(/"name":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{name:["can't be blank"]}})];
    }
    return response;
  });
  // destroy
  this.delete('/api/v1/versions/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({})];
    versions.find(function(version) {
      if (version.id === parseInt(request.params.id, 10)) {
        response = [204, {"Content-Type": "application/json"}, null];
      }
    });
    return response;
  });

  // password
  // this.post('/api/v1/users/password', function(request) {
  //   var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"email":["not found"]}})];
  //   console.log("Nope", response);
  //   var user = users.find(function(user) {
  //     console.log("requestBody", request.requestBody);
  //     console.log("match", request.requestBody.match(user.name));
  //     if (request.requestBody.match(user.name) && request.requestBody.match(user.name).length > 0){
  //       response = [200, {"Content-Type": "application/json"}, JSON.stringify({})];
  //       console.log("Got it", response);
  //     }
  //   });
  //   return response;
  // });
  // this.put('/api/v1/users/password', function(request) {
  //   var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"reset_password_token":["has expired, please request a new one"]}})];
  //   var user = users.find(function(user) {
  //     if (request.requestBody.match(user.reset_password_token) && request.requestBody.match(user.reset_password_token).length > 0){
  //       response = [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
  //       console.log("Got it", response);
  //     }
  //   });
  //   return response;
  // });


  // memberships
  // index
  this.get('/api/v1/memberships', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({memberships: memberships})];
  });
  // show
  this.get('/api/v1/memberships/:id', function(request) {
    var membership = memberships.find(function(membership) {
      if (membership.id === parseInt(request.params.id, 10)) {
        return membership;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({membership: membership})];
  });
  // update
  this.put('/api/v1/memberships/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"group":["can't be blank"]}})];
    var membership = memberships.find(function(membership) {
      if (membership.id === parseInt(request.params.id, 10)) {
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({membership: membership})];
      }
    });
    if (request.requestBody.match(/"group_id":""/) && request.requestBody.match(/"group_id":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{group:["can't be blank"]}})];
    }
    return response;
  });
  // create
  this.post('/api/v1/memberships', function(request) {
    var response = [200, {"Content-Type": "application/json"}, JSON.stringify({membership: {id: 3, group_id: 1, user_id: 2, role: 'basic'}})];
    if (request.requestBody.match(/"group_id":""/) && request.requestBody.match(/"group_id":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{group:["can't be blank"]}})];
    }
    return response;
  });
  // destroy
  this.delete('/api/v1/memberships/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({membership: membership})];
    var membership = memberships.find(function(membership) {
      if (membership.id === parseInt(request.params.id, 10)) {
        response = [204, {"Content-Type": "application/json"}, null];
      }
    });
    return response;
  });

  // sharings
  // index
  this.get('/api/v1/sharings', function(request) {
    return [200, {"Content-Type": "application/json"}, JSON.stringify({sharings: sharings})];
  });
  // show
  this.get('/api/v1/sharings/:id', function(request) {
    var sharing = sharings.find(function(sharing) {
      if (sharing.id === parseInt(request.params.id, 10)) {
        return sharing;
      }
    });
    return [200, {"Content-Type": "application/json"}, JSON.stringify({sharing: sharing})];
  });
  // update
  this.put('/api/v1/sharings/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"group":["can't be blank"]}})];
    sharings.find(function(sharing) {
      if (sharing.id === parseInt(request.params.id, 10)) {
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({sharing: sharing})];
      }
    });
    if (request.requestBody.match(/"group_id":""/) && request.requestBody.match(/"group_id":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{group:["can't be blank"]}})];
    }
    return response;
  });
  // create
  this.post('/api/v1/sharings', function(request) {
    var response = [200, {"Content-Type": "application/json"}, JSON.stringify({sharing: {id: 3, group_id: 1, user_id: 2, role: 'basic'}})];
    if (request.requestBody.match(/"group_id":""/) && request.requestBody.match(/"group_id":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{group:["can't be blank"]}})];
    }
    return response;
  });
  // destroy
  this.delete('/api/v1/sharings/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({})];
    sharings.find(function(sharing) {
      if (sharing.id === parseInt(request.params.id, 10)) {
        response = [204, {"Content-Type": "application/json"}, null];
      }
    });
    return response;
  });
});
