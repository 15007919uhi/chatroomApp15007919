import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import 'firebase/analytics'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCJHZ6Wq9hU-NO2jqO8fVg9ajq-Z2NV3uE",
    authDomain: "chatroomapp15007919-f739f.firebaseapp.com",
    projectId: "chatroomapp15007919-f739f",
    storageBucket: "chatroomapp15007919-f739f.appspot.com",
    messagingSenderId: "354855475233",
    appId: "1:354855475233:web:a80daea26347c56b6bab60",
    measurementId: "G-M4533PEW2N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
