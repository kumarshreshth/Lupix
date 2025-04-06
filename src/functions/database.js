import { db } from './config.js';
import {
  ref,
  set,
  child,
  get,
  update,
  remove,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js';

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export async function updateData(blogId, updatedData, container) {
  try {
    await update(ref(db, `${container}/${blogId}`), {
      data: updatedData,
    });
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 3000);
  } catch (error) {
    throw error;
  }
}

export async function writeData(data, container) {
  const id = uuidv4();
  try {
    await set(ref(db, `${container}/` + id), {
      id: id,
      data: data,
    });
  } catch (error) {
    throw error;
  }
}

export async function readData(blogId, container) {
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
    throw error;
  }
}

export async function removeLog(container, blogId) {
  try {
    await remove(ref(db, `${container}/${blogId}`));
  } catch (error) {
    throw error;
  }
}

export async function readUserData(blogId) {
  const userRef = ref(db, 'users/' + blogId);
  try {
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateUserData(blogId, data) {
  const userRef = ref(db, 'users/' + blogId);
  try {
    await update(userRef, data);
  } catch (error) {
    throw error;
  }
}

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

export async function fetchBlogs(container, page) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, container));
    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      const blogDataList = Object.values(dataObject);
      blogDataList.sort((a, b) => b.data.createdAt - a.data.createdAt);

      if (page) {
        blogDataList.forEach((blogObject) => {
          const data = blogObject.data;

          const blogComponent = document.createElement('div');
          blogComponent.classList.add(
            'p-4',
            'space-y-4',
            'w-[90%]',
            'h-[300px]',
            'sm:h-[400px]',
            'md:h-[500px]',
            'relative'
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
            'space-x-4',
            'justify-center',
            'items-center',
            'inset-0',
            'absolute',
            'w-full',
            'bg-black/90',
            'hidden'
          );

          const readBtn = document.createElement('i');
          readBtn.classList.add(
            'text-[#D45401]',
            'md:text-3xl',
            'text-xl',
            'cursor-pointer',
            'hover:text-white',
            'rounded-md',
            'fa-solid',
            'fa-eye'
          );
          readBtn.addEventListener('click', () => {
            window.location.href = `/src/pages/view.html?id=${blogObject.id}&container=${container}`;
          });
          btns.appendChild(readBtn);

          const shareBtn = document.createElement('i');
          shareBtn.classList.add(
            'text-[#D45401]',
            'md:text-4xl',
            'text-xl',
            'cursor-pointer',
            'hover:text-white',
            'rounded-md',
            'fa-solid',
            'fa-share-nodes'
          );
          shareBtn.addEventListener('click', () => {
            const popup = document.getElementById('sharePopup');
            if (popup.classList.contains('hidden')) {
              popup.classList.remove('hidden');
              popup.classList.add('flex');
            }
            const relativeURL = `/src/pages/view.html?id=${blogObject.id}&container=${container}`;
            const fullURL = new URL(relativeURL, window.location.origin).href;
            const url = encodeURIComponent(fullURL);
            document.getElementById(
              'whatsappShare'
            ).href = `https://api.whatsapp.com/send?text=${url}`;
            document.getElementById(
              'twitterShare'
            ).href = `https://twitter.com/intent/tweet?url=${url}`;
            document.getElementById(
              'facebookShare'
            ).href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            document.getElementById(
              'linkedinShare'
            ).href = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
          });
          btns.appendChild(shareBtn);

          blogComponent.appendChild(btns);

          blogComponent.addEventListener('mouseenter', () => {
            btns.classList.remove('hidden');
            btns.classList.add('flex');
          });

          blogComponent.addEventListener('mouseleave', () => {
            btns.classList.remove('flex');
            btns.classList.add('hidden');
          });

          document.getElementById('blogs').appendChild(blogComponent);
        });
      } else {
        //console.log('entered');
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
            window.location.href = `../pages/view.html?id=${blogObject.id}&container=${container}`;
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
            window.location.href = `../pages/blog.html?update=true&id=${blogObject.id}&user=admin&container=${container}`;
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
            removeLog(container, blogObject.id);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          });

          blogComponent.appendChild(btns);

          document.getElementById('blogList').appendChild(blogComponent);
        });
      }
    } else {
      //console.log('No Data available');
    }
    //console.log('Data fetch');
  } catch (error) {
    throw error;
  }
}

function formatDate(dateData) {
  const dateObject = new Date(dateData);

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };

  return dateObject.toLocaleString('en-US', options);
}

export async function viewData(blogId, container) {
  try {
    await get(ref(db, `${container}/${blogId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const blogObject = snapshot.val();
        const data = blogObject.data;

        document.getElementById('coverImage').src = data.coverImage;
        document.getElementById('title').textContent = data.title;
        document.getElementById('content').innerHTML = data.content;
        document.getElementById('time').textContent = formatDate(
          data.createdAt
        );

        document.getElementById('blogPage').classList.remove('hidden');
      }
    });
  } catch (error) {
    throw error;
  }
}
