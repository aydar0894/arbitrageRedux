var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyDBZkOc1diVqfq9BaCxv-6QPVPlFZp9FG8",
  authDomain: "cryptoa-40d38.firebaseapp.com",
  databaseURL: "https://cryptoa-40d38.firebaseio.com",
  projectId: "cryptoa-40d38",
  storageBucket: "cryptoa-40d38.appspot.com",
  messagingSenderId: "608655189725"
};
firebase.initializeApp(config);
module.exports = function(){
    return firebase;
}
