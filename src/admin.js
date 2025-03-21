import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

import {
  getDatabase,
  set,
  ref,
  get,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

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
const database = getDatabase(app);

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     window.location.href = 'login.html';
//   }
// });

async function getLatestBlog() {
  try {
    const blogRef = ref(database, 'blog');
    const snapshot = await get(blogRef);
    const data = snapshot.val();

    const blogs = Object.entries(data).sort(
      (a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt)
    );

    blogs.forEach((blog) => {
      console.log(blog);
      const blogComponent = document.createElement('div');
      blogComponent.classList.add('space-y-4', 'p-2', 'rounded-lg', 'border');

      const titleBlock = document.createElement('h1');
      titleBlock.classList.add('text-white');
      titleBlock.textContent = blog[1].title;
      blogComponent.appendChild(titleBlock);

      const contentBlock = document.createElement('p');
      contentBlock.classList.add('text-white');
      contentBlock.textContent = blog[1].content;
      blogComponent.appendChild(contentBlock);

      const btns = document.createElement('div');
      btns.classList.add('text-right', 'space-x-4');

      const openBtn = document.createElement('button');
      openBtn.classList.add(
        'bg-[#D45401]',
        'p-2',
        'rounded-md',
        'text-black',
        'cursor-pointer'
      );
      openBtn.textContent = 'Open';
      openBtn.addEventListener('click', () => {
        window.location.href = `blog.html?id=${blog[0]}&update=false`;
      });
      btns.appendChild(openBtn);

      const updateBtn = document.createElement('button');
      updateBtn.classList.add(
        'bg-[#D45401]',
        'p-2',
        'rounded-md',
        'text-black',
        'cursor-pointer'
      );
      updateBtn.textContent = 'Update';
      updateBtn.addEventListener('click', () => {
        window.location.href = `blog.html?id=${blog[0]}&update=true`;
      });
      btns.appendChild(updateBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add(
        'bg-[#D45401]',
        'p-2',
        'rounded-md',
        'text-black',
        'cursor-pointer'
      );
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', async () => {
        const blogRef = ref(database, `blog/${blog[0]}`);

        try {
          await remove(blogRef);
          console.log('Data removed!');
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      });
      btns.appendChild(deleteBtn);

      blogComponent.appendChild(btns);

      document.getElementById('blogList').appendChild(blogComponent);
    });
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('logoutButton').addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('Logout successful');
      window.location.href = 'login.html';
    })
    .catch((error) => {
      console.log('Cannnot logout ', error);
    });
});

document.getElementById('latestBtn').addEventListener('click', () => {
  const latestBlock = document.getElementById('latestBlog');
  const addBlock = document.getElementById('addBlog');
  if (latestBlock.classList.contains('hidden')) {
    latestBlock.classList.remove('hidden');
    if (addBlock.classList.contains('flex')) {
      addBlock.classList.remove('flex');
      addBlock.classList.add('hidden');
    }
  }
});

document.getElementById('addBtn').addEventListener('click', () => {
  const latestBlock = document.getElementById('latestBlog');
  const addBlock = document.getElementById('addBlog');
  if (addBlog.classList.contains('hidden')) {
    latestBlock.classList.add('hidden');
    addBlog.classList.remove('hidden');
    addBlock.classList.add('flex');
  }
});

document
  .getElementById('blogForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const blogId = uuidv4();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('imageUpload').value;
    const time = new Date().toLocaleString();

    try {
      await set(ref(database, 'blog/' + blogId), {
        title: title,
        content: content,
        imageUrl: imageInput,
        createdAt: time,
      });

      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      document.getElementById('imageUpload').value = '';
      getLatestBlog();
    } catch (error) {
      console.log(error);
    }
  });

window.onload = () => {
  getLatestBlog();
};
