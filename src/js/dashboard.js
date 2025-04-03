import { auth } from '../functions/config.js';
import { fetchBlogs } from '../functions/database.js';
import { logOut } from '../functions/auth.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import {
  errorMessage,
  loadingMessage,
  removeLoading,
} from '../functions/message.js';

onAuthStateChanged(auth, (user) => {
  if (!user || user.isAnonymous) {
    window.location.href = 'login.html';
  }
});

document.querySelectorAll('.logoutBtn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await logOut();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
    } catch (error) {
      errorMessage(error);
    }
  });
});

document.querySelectorAll('.latestBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });
});

document.querySelectorAll('.addBtn').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = 'blog.html?user=admin&container=blogs';
  });
});

document.getElementById('requested').addEventListener('click', () => {
  window.location.href = 'requested.html';
});

document.getElementById('mobNav-button').addEventListener('click', () => {
  document.getElementById('mobNav-list').classList.toggle('hidden');
});

window.addEventListener('scroll', () => {
  const logo = document.getElementById('logo');
  const element = document.getElementById('mobNav-list');
  if (window.scrollY > 0) {
    logo.classList.add('hidden');
    element.classList.remove('top-18');
    element.classList.add('top-14');
  } else {
    if (logo.classList.contains('hidden')) {
      logo.classList.remove('hidden');
      element.classList.remove('top-14');
      element.classList.add('top-18');
    }
  }
});

window.onload = async () => {
  const loading = loadingMessage('Fetching');
  console.log('entered');
  try {
    const val = await fetchBlogs('blogs', false);
    if (val == true) {
      removeLoading(loading);
    }
  } catch (error) {
    console.log(error);
    errorMessage(error);
  }
};
