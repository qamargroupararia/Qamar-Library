
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyDXl60NQHJV2J1iEV6-SjF61197FWVtdNk",

authDomain: "qamar-library.firebaseapp.com",

projectId: "qamar-library",

storageBucket: "qamar-library.appspot.com",

messagingSenderId: "256574977198",

appId: "1:256574977198:web:0241dcc68ac5de4bea293f"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
