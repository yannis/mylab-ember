// import Ember from 'ember';
// import DS from 'ember-data';
import Pretender from 'pretender';

var categories = [
  {id: 1, name: 'category1'},
  {id: 2, name: 'category2'},
  {id: 3, name: 'category3'}
];

var documents = [
  {id: 1, name: 'document1'},
  {id: 2, name: 'document2'},
  {id: 3, name: 'document3'}
];

var groups = [
  {id: 1, name: 'group1'},
  {id: 2, name: 'group2'},
  {id: 3, name: 'group3'}
];

var users = [
  {id: 1, name: 'user1', email: 'user1@mail.com', token: 'token1', password: "password1", reset_password_token: "aaaaaaaaaaa"},
  {id: 2, name: 'user2', email: 'user2@mail.com', token: 'token2', password: "password2", reset_password_token: "d531c9983a24726257a91"}
];

export default new Pretender(function() {

  // session
  this.post('/api/v1/users/sign_in', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors: "Invalid email or password"})];
    var user = users.find(function(user) {
      if (request.requestBody.match(user.password) && request.requestBody.match(user.password).length > 0){
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({token: user.token, user_email: user.email, user_id: user.id})];
      }
    });
    return response;
  });


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
    };
    return response;
  });
  // create
  this.post('/api/v1/documents', function(request) {
    var response = [200, {"Content-Type": "application/json"}, JSON.stringify({document: {id: 4, name: 'document4'}})];
    if (request.requestBody.match(/"name":""/) && request.requestBody.match(/"name":""/).length > 0) {
      response = [422, {"Content-Type": "application/json"}, JSON.stringify({errors:{name:["can't be blank"]}})];
    };
    return response;
  });
  // destroy
  this.delete('/api/v1/documents/:id', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({document: document})];
    var document = documents.find(function(document) {
      if (document.id === parseInt(request.params.id, 10)) {
        response = [204, {"Content-Type": "application/json"}, null]
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

  // password
  this.post('/api/v1/users/password', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"email":["not found"]}})];
    console.log("Nope", response);
    var user = users.find(function(user) {
      console.log("requestBody", request.requestBody);
      console.log("match", request.requestBody.match(user.name));
      if (request.requestBody.match(user.name) && request.requestBody.match(user.name).length > 0){
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({})];
        console.log("Got it", response);
      }
    });
    return response;
  });
  this.put('/api/v1/users/password', function(request) {
    var response = [422, {"Content-Type": "application/json"}, JSON.stringify({"errors":{"reset_password_token":["has expired, please request a new one"]}})];
    var user = users.find(function(user) {
      if (request.requestBody.match(user.reset_password_token) && request.requestBody.match(user.reset_password_token).length > 0){
        response = [200, {"Content-Type": "application/json"}, JSON.stringify({user: user})];
        console.log("Got it", response);
      }
    });
    return response;
  });
});
