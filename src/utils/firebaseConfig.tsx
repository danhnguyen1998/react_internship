import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyB5Xfhr9C9G1FLpRhXvoGJ0NFHC5DqE6BQ',
  authDomain: 'reactinternship.firebaseapp.com',
  databaseURL: 'https://reactinternship.firebaseio.com',
  projectId: 'reactinternship',
  storageBucket: 'reactinternship.appspot.com',
  messagingSenderId: '691436024323',
  appId: '1:691436024323:web:cce53aa9213e995b275436',
  measurementId: 'G-MP0PQ7HWK0',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
