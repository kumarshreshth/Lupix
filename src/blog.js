import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
  getDatabase,
  ref,
  get,
  set,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDoZ7333sF0iBNexD4qgaaEgFf0Bk49QTI',
  authDomain: 'lupix-6c24c.firebaseapp.com',
  projectId: 'lupix-6c24c',
  storageBucket: 'lupix-6c24c.firebasestorage.app',
  messagingSenderId: '979299211192',
  appId: '1:979299211192:web:4d0949676e4a7835d6e14d',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function getData(id) {
  const blogref = ref(database, `blog/${id}`);
  const data = await get(blogref);
  const blog = data.val();
  console.log(blog);
  return blog;
}

async function updateData(id, newData) {
  const blogRef = ref(database, `blog/${id}`);

  try {
    await set(blogRef, newData);
    console.log('Blog updated successfully!');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 5000);
  } catch (error) {
    console.error('Error updating blog:', error);
  }
}

const formElement = document.getElementById('updateForm');
const viewElement = document.getElementById('view');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const upt = urlParams.get('update');

getData(id).then((blogData) => {
  if (upt == 'false') {
    if (viewElement.classList.contains('hidden')) {
      formElement.classList.add('hidden');
      viewElement.classList.remove('hidden');
    }
    document.getElementById('heading').textContent = blogData.title;
    document.getElementById('para').textContent = blogData.content;
  } else if (upt == 'true') {
    if (formElement.classList.contains('hidden')) {
      viewElement.classList.add('hidden');
      formElement.classList.remove('hidden');
    }
    document.getElementById('title').value = blogData.title;
    document.getElementById('content').value = blogData.content;
    document.getElementById('imageUpload').value = blogData.imageUrl;

    document
      .getElementById('updateForm')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const newTitle = document.getElementById('title').value;
        const newContent = document.getElementById('content').value;
        const newUrl = document.getElementById('imageUpload').value;
        const newTime = new Date().toLocaleString();

        updateData(id, {
          title: newTitle,
          content: newContent,
          imageUrl: newUrl,
          createdAt: newTime,
        });
      });
  }
});
