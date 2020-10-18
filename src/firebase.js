import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBtu2d9_li2083RYhq7e0PFlpJQvun40XA",
  authDomain: "what-s-app-clone-fda93.firebaseapp.com",
  databaseURL: "https://what-s-app-clone-fda93.firebaseio.com",
  projectId: "what-s-app-clone-fda93",
  storageBucket: "what-s-app-clone-fda93.appspot.com",
  messagingSenderId: "734502468251",
  appId: "1:734502468251:web:dcb47b24f145f3ea8ea43e",
  measurementId: "G-SJVBVTDMZZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
