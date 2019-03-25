import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyClSQsgLiOOXlqw9s7zdZEQSAgOwbdOb_w",
  authDomain: "just-testing-112b7.firebaseapp.com",
  databaseURL: "https://just-testing-112b7.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;