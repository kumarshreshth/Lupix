import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getDatabase,
  ref,
  get,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDoZ7333sF0iBNexD4qgaaEgFf0Bk49QTI',
  authDomain: 'lupix-6c24c.firebaseapp.com',
  projectId: 'lupix-6c24c',
  storageBucket: 'lupix-6c24c.firebasestorage.app',
  messagingSenderId: '979299211192',
  appId: '1:979299211192:web:4d0949676e4a7835d6e14d',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function readData(blogId, container) {
  try {
    await get(ref(db, `${container}/${blogId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const blogObject = snapshot.val();
        const data = blogObject.data;

        document.getElementById('coverImage').src = data.coverImage;
        document.getElementById('title').textContent = data.title;
        document.getElementById('content').innerHTML = data.content;

        document.getElementById('blogPage').classList.remove('hidden');
      }
    });
  } catch (error) {
    //console.log('Error', error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
  const blogId = urlParams.get('id');
  const container = urlParams.get('container');
  readData(blogId, container);
}

document.getElementById('logo').addEventListener('click', () => {
  window.location.href = '../../index.html';
});
