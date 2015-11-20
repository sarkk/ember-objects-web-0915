import Ember from 'ember';

export default Ember.Object.extend({
  fullName: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }),
  greet: function(){
    return `Hi, My name is ${this.get("fullName")}. You can call me ${this.nickName}`;
  },
  // isOld: Ember.computed("age", function(){
  //   if(this.get("age") > 30){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
  isOld: Ember.computed.gte("age", 30),
  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),
  // wroteRuby: Ember.computed("nickName", function(){
  //   if(this.get("nickName") === "Matz"){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }),
  addConference(conference){
    this.get("conferences").pushObject(conference);
  },
  // keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
  //   var conferences = this.get("conferences");
  //   var fullName = this.get("fullName");
  //   return conferences.filterBy("keyNote", fullName);
  // }),
  keyNoteConferences: Ember.computed.filter("conferences.@each.keyNote", function(conference){
    return conference.keyNote === this.get("fullName");
  }),

  // conferenceNames: Ember.computed("conferences.@each.name", function(){
  //   var conferences = this.get("conferences");
  //   return conferences.map(function(conference){
  //     return conference.get("name");
  //   });
  // }),
  // conferenceNames: Ember.computed.map("conferences.@each.name", function(conference){
  //     return conference.get("name");
  // }),
  conferenceNames: Ember.computed.mapBy("conferences", "name"),

  // conferenceTotal: Ember.computed("conferences.[]", function(){
  //   var conferences = this.get("conferences");
  //   return conferences.get("length");
  // }),
  conferenceTotal: Ember.computed.alias("conferences.length"),

  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    return `${this.get("nickName")} is speaking at ${this.get("conferenceTotal")} conferences`;
  }),

  hasValidEmail: Ember.computed("email", function(){
    var regex = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    var email = this.get("email");
    return (regex.test(email));
  }),
  hasFirstName: Ember.computed.notEmpty("firstName"),
  haslastName: Ember.computed.notEmpty("lastName"),
  hasAge: Ember.computed.notEmpty("age"),
  isValid: Ember.computed.and("hasFirstName", "haslastName", "hasAge", "hasValidEmail"),
  isInvalid: Ember.computed.not("isValid"),

  // errors: Ember.computed("hasFirstName", "haslastName", "hasAge", "hasValidEmail", function(){
  //   let errorArray = [];
  //   let obj = {
  //     hasFirstName: "firstName cannot be blank",
  //     hasLastName: "lastName cannot be blank",
  //     hasAge: "age cannot be blank",
  //     hasValidEmail: "email must be valid"
  //   };
  //   for (var key in obj){
  //     if (this.get(key)){
  //       errorArray.push(obj[key]);
  //     }
  //   }
  //   return errorArray;
  // })
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
    return this.get("errors").length !== 0;
  })
});
