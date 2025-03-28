import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

import {
  getDatabase,
  child,
  ref,
  get,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

import { app } from './config.js';

const auth = getAuth();
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});

function extractText(html) {
  const temp = document.createElement('div');
  temp.innerHTML = html;

  const paragraphs = temp.querySelectorAll('p');
  if (paragraphs.length > 0) {
    const text = Array.from(paragraphs)
      .map((p) => p.textContent.trim())
      .join('');
    return text;
  }
}

async function fetchBlogs() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, 'requested'));
    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      const blogDataList = Object.values(dataObject);
      blogDataList.sort((a, b) => b.data.createdAt - a.data.createdAt);

      blogDataList.forEach((blogObject) => {
        const data = blogObject.data;

        const blogComponent = document.createElement('div');
        blogComponent.classList.add(
          'p-4',
          'space-y-4',
          'w-[90%]',
          'h-[350px]',
          'sm:h-[450px]',
          'md:h-[560px]'
        );

        const imageComponent = document.createElement('img');
        imageComponent.classList.add(
          'w-full',
          'h-[150px]',
          'sm:h-[250px]',
          'md:h-[300px]',
          'rounded-md',
          'object-cover'
        );
        imageComponent.src = data.coverImage;
        blogComponent.appendChild(imageComponent);

        const titleComponent = document.createElement('h1');
        titleComponent.classList.add(
          'text-white',
          'md:text-2xl',
          'sm:text-lg',
          'text-center',
          'sm:text-left',
          'text-base',
          'font-bold',
          'line-clamp-1'
        );
        titleComponent.innerText = data.title;
        blogComponent.appendChild(titleComponent);

        const contentComponent = document.createElement('div');
        contentComponent.classList.add(
          'text-gray-400',
          'md:text-lg',
          'text-center',
          'sm:text-left',
          'sm:text-base',
          'text-sm',
          'line-clamp-3'
        );
        const text = extractText(data.content);
        contentComponent.innerText = text;

        blogComponent.appendChild(contentComponent);

        const btns = document.createElement('div');
        btns.classList.add(
          'space-x-2',
          'mt-5',
          'flex',
          'justify-end',
          'items-center'
        );

        const readBtn = document.createElement('button');
        readBtn.classList.add(
          'p-1',
          'bg-blue-400',
          'text-white',
          'md:text-base',
          'text-sm',
          'cursor-pointer',
          'hover:bg-blue-600',
          'rounded-md'
        );
        readBtn.innerText = 'Read';
        readBtn.addEventListener('click', () => {
          window.location.href = `view.html?id=${blogObject.id}&container=requested`;
        });
        btns.appendChild(readBtn);

        const updateBtn = document.createElement('button');
        updateBtn.classList.add(
          'p-1',
          'bg-blue-400',
          'text-white',
          'md:text-base',
          'text-sm',
          'cursor-pointer',
          'hover:bg-blue-600',
          'rounded-md',
          'hidden',
          'md:block'
        );
        updateBtn.innerText = 'Update';
        btns.appendChild(updateBtn);
        updateBtn.addEventListener('click', () => {
          window.location.href = `blog.html?update=true&id=${blogObject.id}&user=admin&container=requested`;
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add(
          'p-1',
          'bg-blue-400',
          'text-white',
          'md:text-base',
          'text-sm',
          'cursor-pointer',
          'hover:bg-blue-600',
          'rounded-md'
        );
        deleteBtn.innerText = 'Delete';
        btns.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', async () => {
          try {
            await remove(ref(db, `requested/${blogObject.id}`));
            //console.log('Deleted');
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } catch (error) {
            //console.log('Error ', error);
          }
        });

        blogComponent.appendChild(btns);

        document.getElementById('blogList').appendChild(blogComponent);
      });
    } else {
      //console.log('no data available');
    }
  } catch (error) {
    //console.log('Error occured', error);
  }
}

document.querySelectorAll('.logoutBtn').forEach((btn) => {
  btn.addEventListener('click', async () => {
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

window.onload = () => {
  fetchBlogs();
};
