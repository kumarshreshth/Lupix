import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDoZ7333sF0iBNexD4qgaaEgFf0Bk49QTI',
  authDomain: 'lupix-6c24c.firebaseapp.com',
  projectId: 'lupix-6c24c',
  storageBucket: 'lupix-6c24c.firebasestorage.app',
  messagingSenderId: '979299211192',
  appId: '1:979299211192:web:4d0949676e4a7835d6e14d',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

function loginUser(username, password) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, username, password);
    })
    .then((userCredential) => {
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      console.log(error);
      const messageBlock = document.createElement('div');
      messageBlock.classList.add(
        'fixed',
        'top-5',
        'right-5',
        'bg-black',
        'z-30',
        'p-3',
        'rounded-xl',
        'border-2',
        'border-white',
        'opacity-80'
      );
      const messageElement = document.createElement('p');
      messageElement.innerText = 'Wrong username or password';
      messageElement.classList.add('text-red-700');
      messageBlock.appendChild(messageElement);
      document.body.appendChild(messageBlock);
      setTimeout(() => {
        messageBlock.remove();
      }, 3000);
    });
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  loginUser(username, password);
});
