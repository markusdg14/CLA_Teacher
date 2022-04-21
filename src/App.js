import {useState} from 'react';
import logo from './logo.svg';
// import './App.css';
import BaseLayout from './pages/layout/base';

import { getToken, onMessageListener } from './firebaseInit';

import firebase from 'firebase/app';
import 'firebase/messaging';

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title: '', body: ''});
  const [isTokenFound, setTokenFound] = useState(false);

  if(firebase.messaging.isSupported()){
    // getToken(setTokenFound);

    firebase.messaging().requestPermission()
  
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
    }).catch(err => console.log('failed: ', err));
  }
  
  return (
    <div className="app">
      <BaseLayout />
    </div>
  );
}

export default App;
