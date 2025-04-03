import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCWGCNoBWMd5yjji6w-BfoxZSKrGqr9cfA',
  authDomain: 'lupix-website-75e67.firebaseapp.com',
  databaseURL: 'https://lupix-website-75e67-default-rtdb.firebaseio.com',
  projectId: 'lupix-website-75e67',
  storageBucket: 'lupix-website-75e67.firebasestorage.app',
  messagingSenderId: '968395931148',
  appId: '1:968395931148:web:76b16427c870e9d31ab829',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { app, db, auth };
