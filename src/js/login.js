import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

import { auth } from '../functions/config.js';

import { showMessage } from '../functions/message.js';

function loginUser(username, password) {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, username, password);
    })
    .then((userCredential) => {
      window.location.href = 'dashboard.html';
    })
    .catch((error) => {
      showMessage('Wrong username or password');
    });
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  loginUser(username, password);
});

document.getElementById('logo').addEventListener('click', () => {
  window.location.href = '../../index.html';
});
