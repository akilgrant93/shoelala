//firebase config key setep
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
  apiKey: "AIzaSyCZz0HlbvboMDvOD-65MzncE6P-hgtnuno",
  authDomain: "shoelala-a2ebf.firebaseapp.com",
  projectId: "shoelala-a2ebf",
  storageBucket: "shoelala-a2ebf.appspot.com",
  messagingSenderId: "1095236202408",
  appId: "1:1095236202408:web:0c65b4392aa0fce68cf79d",
  measurementId: "G-N0ZW9DP0TR"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export { firebase };
