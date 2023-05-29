import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzqOF55nkPTMB7uQqTbaTQPN8vt_qC1U8",
  authDomain: "final-project-ble.firebaseapp.com",
  projectId: "final-project-ble",
  storageBucket: "final-project-ble.appspot.com",
  messagingSenderId: "504084069647",
  appId: "1:504084069647:web:41bfe8d9fd12714869527a"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, user => {
            unsub()
            resolve(user)
        }, reject)
    })
}

export { app, db, auth, getCurrentUser }