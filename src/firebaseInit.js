import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/messaging';
import {isSafari, isMobileSafari} from 'react-device-detect'

var firebaseConfig = {
  apiKey: "AIzaSyCWw3vmyZeFN3JUY7rC8sp8kT3-zqdspe4",
  authDomain: "christian-life-academy-bd8e3.firebaseapp.com",
  projectId: "christian-life-academy-bd8e3",
  storageBucket: "christian-life-academy-bd8e3.appspot.com",
  messagingSenderId: "323699281462",
  appId: "1:323699281462:web:775b4b076afafa5f4b1297"
};

var flag = 1
var messaging = ''

if(getOS() === 'Mac'){
  flag = 0
}
else{
  firebase.initializeApp(firebaseConfig);
  messaging = firebase.messaging();
}

function getOS(){
  const os = ['Windows', 'Linux', 'Mac'];
  return os.find(v=>navigator.appVersion.indexOf(v) >= 0)
}

export const getToken = async (setToken) => {

  if(flag){
    flag = 0      
    if(firebase.messaging.isSupported()){
      return messaging.getToken({vapidKey: 'BDl3FLzWvhhb94kII8Uq1Zk398QVofk9vTcnM-pkI3Y1kTtrmukff0FvV_6Q1zFphhOTpF991yWpiI3GwKOzCVM'}).then(async (currentToken) => {
        if (currentToken) {
          // console.log('current token for client: ', currentToken);
          
          // setTokenFound(true);
          setToken(currentToken)
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
        } else {
          console.log('No registration token available. Request permission to generate one.');
          // setTokenFound(false);
          setToken('')
          // shows on the UI that permission is required 
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
      });
    }
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});