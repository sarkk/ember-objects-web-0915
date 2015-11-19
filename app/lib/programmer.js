import Ember from 'ember';

export default Ember.Object.extend({
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),
  greet: function(){
    return `Hi, My name is ${this.get("firstName")} ${this.get("lastName")}. You can call me ${this.nickName}`;
  },
  isOld: Ember.computed("age", function(){
    if(this.get("age") > 30){
      return true;
    } else {
      return false;
    }
  }),
  wroteRuby: Ember.computed("nickName", function(){
    if(this.get("nickName") === "Matz"){
      return true;
    } else {
      return false;
    }
  }),
  addConference(conference){
    this.conferences.push(conference);
  },
  keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
    var conferences = this.get("conferences");
    var fullName = this.get("fullName");
    return conferences.filterBy("keyNote", fullName);
  }),
  conferenceNames: Ember.computed("conferences.@each.name", function(){
    var conferences = this.get("conferences");
    return conferences.map(function(conference){
      return conference.get("name");
    });
  }),
  conferenceTotal: Ember.computed("keyNoteConferences", function(){
    var conferences = this.get("conferences");
    return conferences.get("length");
  }),
  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    return `${this.get("nickName")} is speaking at ${this.get("conferenceTotal")} conferences`;
  }),
  hasValidEmail: Ember.computed("email", function(){
    var regex = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    var email = this.get("email");
    if (regex.test(email)){
      return true;
    } else {
      return false;
    }
  }),
  errors: Ember.computed("firstName", "lastName", "age", "hasValidEmail", function(){
    var errorArray = [];
    if(!this.get("firstName")){
      errorArray.push("firstName cannot be blank");
    }
    if(!this.get("lastName")){
      errorArray.push("lastName cannot be blank");
    }
    if(!this.get("age")){
      errorArray.push("age cannot be blank");
    }
    if(!this.get("hasValidEmail")){
      errorArray.push("email must be valid");
    }
    return errorArray;
  }),
  hasErrors: Ember.computed("errors", function(){
    if (this.get("errors").length === 0){
      return false;
    } else {
      return true;
    }
  }),
  isInvalid: Ember.computed("errors", function(){
    if (this.get("errors").length === 0){
      return false;
    } else {
      return true;
    }
  }),
  isValid: Ember.computed("isInvalid", function(){
    if (this.get("errors").length === 0){
      return true;
    } else {
      return false;
    }
  })
});
