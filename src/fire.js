import firebase from 'firebase';
// Initialize Firebase
  var config = {
      apiKey: "AIzaSyBKs6rq7O9TkZTZ2Fvw_UIHZ8R0AA2VCxM",
      authDomain: "abzagencytest.firebaseapp.com",
      databaseURL: "https://abzagencytest.firebaseio.com",
      projectId: "abzagencytest",
      storageBucket: "abzagencytest.appspot.com",
      messagingSenderId: "550895301700",
      appId: "1:550895301700:web:450ff03198863f437a3811",
      measurementId: "G-7CE0LB3GV6"
  };


  

  const fire=firebase.initializeApp(config);
  export default fire;