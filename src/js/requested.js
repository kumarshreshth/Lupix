import { logOut } from '../functions/auth.js';
import { auth } from '../functions/config.js';
import { fetchBlogs } from '../functions/database.js';

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
    window.location.href = 'blog.html?user=admin';
  });
});

document.querySelectorAll('.requested').forEach((btn) => {
  btn.addEventListener('click', () => {
    window.location.href = 'requested.html';
  });
});

window.onload = async () => {
  const loading = loadingMessage('Fetching');
  try {
    const val = await fetchBlogs('requested', false);
    if (val == true) {
      removeLoading(loading);
    }
  } catch (error) {
    errorMessage(error);
  }
};
