import { signInAnonymously } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import { auth, db } from './config.js';
import {
  ref,
  set,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

export async function newAuthUser() {
  try {
    const userCredential = await signInAnonymously(auth);
    const userObject = userCredential.user;

    const userRef = ref(db, 'users/' + userObject.uid);
    await set(userRef, {
      writeCount: 2,
      lastUpdated: Date.now(),
    });

    console.log('New User ', userObject.uid);
  } catch (error) {
    console.log(error);
  }
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log('Error occured ', error);
  }
}
