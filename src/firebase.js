import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC7SHtTG0OvbpTsHGzX_7pWyndpk62KD2A",
  authDomain: "unusual-suspects-b0a48.firebaseapp.com",
  databaseURL: "https://unusual-suspects-b0a48.firebaseio.com",
  projectId: "unusual-suspects-b0a48",
  storageBucket: "unusual-suspects-b0a48.appspot.com",
  messagingSenderId: "757493371972"
};

const base = firebase.initializeApp(config);
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { base, googleProvider };
