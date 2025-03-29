import {
  getDatabase,
  ref,
  get,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

import { app } from './config.js';

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
