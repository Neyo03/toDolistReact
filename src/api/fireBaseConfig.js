// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAepcaf7kyEIwemze_kYIPRGB0ID3dTi7M",
  authDomain: "to-do-list-fa6dd.firebaseapp.com",
  databaseURL: "https://to-do-list-fa6dd-default-rtdb.firebaseio.com",
  projectId: "to-do-list-fa6dd",
  storageBucket: "to-do-list-fa6dd.appspot.com",
  messagingSenderId: "429660514976",
  appId: "1:429660514976:web:a1cf370e9f04f72c0737c5"
};
firebase.initializeApp(firebaseConfig);

export default firebase;