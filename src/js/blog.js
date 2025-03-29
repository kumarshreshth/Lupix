import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

import { app } from './config.js';

const db = getDatabase(app);
const auth = getAuth();

async function updateData(blogId, updatedData, container) {
  try {
    await update(ref(db, `${container}/${blogId}`), {
      data: updatedData,
    });
    //console.log('Data updated');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 3000);
  } catch (error) {
    //console.log('Error', error);
  }
}

async function writeData(data, container) {
  const id = uuidv4();
  try {
    await set(ref(db, `${container}/` + id), {
      id: id,
      data: data,
    });
    //console.log('Data added');
  } catch (error) {
    //console.log('Error generated', error);
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
    //console.log('Error', error);
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
      //console.log('Signed out');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
    } catch (error) {
      //console.log('Error occured ', error);
    }
  });
} else {
  if (user == 'guest') {
    //console.log('guest User');
    document.getElementById('navLink').classList.add('hidden');
    document.getElementById('heading').classList.remove('hidden');

    document.getElementById('publish').innerText = 'Submit';

    document.getElementById('logo').addEventListener('click', () => {
      window.location.href = '../../index.html';
    });
  }
}

if (urlParams.has('update')) {
  readData(blogId, container);
}

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = quill.getText().trim();
  if (text.length === 0) {
    const component = document.getElementById('emptyMessage');
    component.classList.replace('hidden', 'flex');
    window.scrollTo(0, 100);
    return;
  }
  const title = document.getElementById('title').value;
  const coverImage = document.getElementById('preview').src;
  const content = quill.root.innerHTML;
  //console.log(content);
  const time = new Date().toLocaleString();
  const data = {
    title: title,
    coverImage: coverImage,
    content: content,
    createdAt: time,
  };
  //console.log(data);
  if (urlParams.has('update')) {
    if (container == 'blogs') {
      updateData(blogId, data, 'blogs');
    } else {
      try {
        await remove(ref(db, `requested/${blogId}`));
        //console.log('Deleted');
      } catch (error) {
        //console.log('Error ', error);
      }
      await writeData(data, 'blogs');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 3000);
    }
  } else {
    document.getElementById('loadingBox').classList.replace('hidden', 'flex');
    if (user == 'guest') {
      let loadingText = document.getElementById('loadingContent');
      loadingText.innerHTML = 'Submitting<span class="dots"></span>';
    } else {
      let loadingText = document.getElementById('loadingContent');
      loadingText.innerHTML = 'Publishing<span class="dots"></span>';
    }
    let dotsSpan = document.querySelector('.dots');
    let dots = '';
    let dotCount = 0;

    setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      dots = '.'.repeat(dotCount);
      dotsSpan.textContent = dots;
    }, 500);
    await writeData(data, container);
    setTimeout(() => {
      if (user == 'admin') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.reload();
      }
    }, 3000);
  }
});

document.getElementById('image').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');
  if (file) {
    const reader = new FileReader();
    //console.log(reader);
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
