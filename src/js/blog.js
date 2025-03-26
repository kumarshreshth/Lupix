import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

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
const auth = getAuth();

async function updateData(blogId, updatedData, container) {
  try {
    await update(ref(db, `${container}/${blogId}`), {
      data: updatedData,
    });
    console.log('Data updated');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 3000);
  } catch (error) {
    console.log('Error', error);
  }
}

async function writeData(data, container) {
  const id = uuidv4();
  try {
    await set(ref(db, `${container}/` + id), {
      id: id,
      data: data,
    });
    console.log('Data added');
  } catch (error) {
    console.log('Error generated', error);
  }
}

async function readData(blogId, container) {
  try {
    await get(ref(db, `${container}/${blogId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const blogObject = snapshot.val();
        const data = blogObject.data;

        document.getElementById('title').value = data.title;
        quill.root.innerHTML = data.content;
        const previewImage = document.getElementById('preview');
        previewImage.src = data.coverImage;
        if (previewImage.classList.contains('hidden')) {
          preview.classList.remove('hidden');
        }
      }
    });
  } catch (error) {
    console.log('Error', error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
const blogId = urlParams.get('id');
const container = urlParams.get('container');

if (user == 'admin') {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = 'login.html';
    }
  });

  document.getElementById('latestBtn').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });

  document.getElementById('addBtn').addEventListener('click', () => {
    window.location.href = 'blog.html?user=admin';
  });

  document.getElementById('requested').addEventListener('click', () => {
    window.location.href = 'requested.html';
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      await signOut(auth);
      console.log('Signed out');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
    } catch (error) {
      console.log('Error occured ', error);
    }
  });
} else {
  if (user == 'guest') {
    console.log('guest User');
    document.getElementById('navLink').classList.add('hidden');
    document.getElementById('heading').classList.remove('hidden');

    document.getElementById('publish').innerText = 'Submit';
  }
}

if (urlParams.has('update')) {
  readData(blogId, container);
}

document.getElementById('publish').addEventListener('click', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const coverImage = document.getElementById('preview').src;
  const content = quill.root.innerHTML;
  const time = new Date().toLocaleString();
  const data = {
    title: title,
    coverImage: coverImage,
    content: content,
    createdAt: time,
  };
  console.log(data);
  if (urlParams.has('update')) {
    if (container == 'blogs') {
      updateData(blogId, data, 'blogs');
    } else {
      try {
        await remove(ref(db, `requested/${blogId}`));
        console.log('Deleted');
      } catch (error) {
        console.log('Error ', error);
      }
      await writeData(data, 'blogs');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 3000);
    }
  } else {
    await writeData(data, container);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');
  if (file) {
    const reader = new FileReader();
    console.log(reader);
    reader.onload = function (event) {
      preview.src = event.target.result;
      if (preview.classList.contains('hidden')) {
        preview.classList.remove('hidden');
      }
    };
    reader.readAsDataURL(file);
  }
});

window.addEventListener('scroll', () => {
  const logo = document.getElementById('logo');
  if (window.scrollY > 0) {
    logo.classList.add('hidden');
  } else {
    if (logo.classList.contains('hidden')) {
      logo.classList.remove('hidden');
    }
  }
});
