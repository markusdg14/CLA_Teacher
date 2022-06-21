// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCWw3vmyZeFN3JUY7rC8sp8kT3-zqdspe4",
  authDomain: "christian-life-academy-bd8e3.firebaseapp.com",
  projectId: "christian-life-academy-bd8e3",
  storageBucket: "christian-life-academy-bd8e3.appspot.com",
  messagingSenderId: "323699281462",
  appId: "1:323699281462:web:775b4b076afafa5f4b1297"
};

if(firebase.messaging.isSupported()){
  
  firebase.initializeApp(firebaseConfig);

  // Retrieve firebase messaging
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

}