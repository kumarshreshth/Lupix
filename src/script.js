import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';

import {
  getDatabase,
  child,
  ref,
  get,
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
const db = getDatabase(app);

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
    const snapshot = await get(child(dbRef, 'blogs'));
    if (snapshot.exists()) {
      const dataObject = snapshot.val();
      const blogDataList = Object.values(dataObject);
      if (blogDataList.length > 1)
        blogDataList.sort(
          (a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)
        );

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
        btns.classList.add('space-x-4', 'mt-5', 'text-right');

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
          window.location.href = `/src/pages/view.html?id=${blogObject.id}&container=blogs`;
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
          const relativeURL = `/src/pages/view.html?id=${blogObject.id}&container=blogs`;
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

        document.getElementById('blogs').appendChild(blogComponent);
      });
    } else {
      console.log('no data available');
    }

    return true;
  } catch (error) {
    console.log('Error occured', error);
    return false;
  }
}

async function sendDoubt(query, emailId) {
  const templateParam = {
    message: query,
    email: emailId,
  };
  try {
    const response = await emailjs.send(
      'service_q4z3ljp',
      'template_58l1r8w',
      templateParam,
      'UmrVycIAFM8ftSJBm'
    );
    return response.text;
  } catch (error) {
    throw error;
  }
}

async function sendMail(name, phoneNumber, emailId, description) {
  try {
    const templateParam = {
      name: name,
      email: emailId,
      phoneNumber: phoneNumber,
      description: description,
    };

    const response = await emailjs.send(
      'service_q4z3ljp',
      'template_l14wzz8',
      templateParam,
      'UmrVycIAFM8ftSJBm'
    );
    console.log(response.text);
    return response.text;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

document.querySelectorAll('.booking').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById('meetingForm').classList.remove('hidden');
    document.getElementById('meetingForm').classList.add('flex');
  });
});

document
  .getElementById('meetingForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('phoneNumber').value;
    const emailId = document.getElementById('emailId').value;
    const description = document.getElementById('description').value;

    try {
      const response = await sendMail(name, number, emailId, description);
      if (response == 'OK') {
        const messageBlock = document.createElement('div');
        messageBlock.classList.add(
          'fixed',
          'top-5',
          'right-5',
          'bg-black',
          'z-30',
          'p-3',
          'rounded-xl',
          'border-2',
          'border-white',
          'opacity-80'
        );
        const messageElement = document.createElement('p');
        messageElement.innerText = 'Booking Mail Send';
        messageElement.classList.add('text-green-400');
        messageBlock.appendChild(messageElement);
        document.body.appendChild(messageBlock);
        document.getElementById('name').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('emailId').value = '';
        document.getElementById('description').value = '';
        setTimeout(() => {
          messageBlock.remove();
        }, 3000);
      }
    } catch (error) {
      const messageBlock = document.createElement('div');
      messageBlock.classList.add(
        'fixed',
        'top-5',
        'right-5',
        'bg-black',
        'z-30',
        'p-3',
        'rounded-xl',
        'border-2',
        'border-white',
        'opacity-80'
      );
      const messageElement = document.createElement('p');
      messageElement.innerText = 'Error occured';
      messageElement.classList.add('text-red-700');
      messageBlock.appendChild(messageElement);
      document.body.appendChild(messageBlock);
      setTimeout(() => {
        messageBlock.remove();
      }, 3000);
    }
  });

document
  .getElementById('queryForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const emailId = document.getElementById('queryEmail').value;
    try {
      const response = await sendDoubt(query, emailId);
      if (response === 'OK') {
        const messageBlock = document.createElement('div');
        messageBlock.classList.add(
          'fixed',
          'top-5',
          'right-5',
          'bg-black',
          'z-30',
          'p-3',
          'rounded-xl',
          'border-2',
          'border-white',
          'opacity-80'
        );
        const messageElement = document.createElement('p');
        messageElement.innerText = 'Query Send';
        messageElement.classList.add('text-green-400');
        messageBlock.appendChild(messageElement);
        document.body.appendChild(messageBlock);
        document.getElementById('query').value = '';
        document.getElementById('queryEmail').value = '';
        setTimeout(() => {
          messageBlock.remove();
        }, 3000);
      }
    } catch (error) {
      const messageBlock = document.createElement('div');
      messageBlock.classList.add(
        'fixed',
        'top-5',
        'right-5',
        'bg-black',
        'z-30',
        'p-3',
        'rounded-xl',
        'border-2',
        'border-white',
        'opacity-80'
      );
      const messageElement = document.createElement('p');
      messageElement.innerText = 'Error occured';
      messageElement.classList.add('text-red-700');
      messageBlock.appendChild(messageElement);
      document.body.appendChild(messageBlock);
      setTimeout(() => {
        messageBlock.remove();
      }, 3000);
    }
  });

document.querySelectorAll('.capabilites').forEach((block) => {
  block.addEventListener('mouseenter', () => {
    block.classList.remove(
      'lg:flex',
      'lg:justify-center',
      'lg:items-center',
      'bg-[#D45401]',
      'lg:bg-[#D45401]/50'
    );
    block.classList.add('lg:bg-[#D45401]', 'lg:scale-105');
    block.children[1].classList.remove('lg:hidden');
  });
  block.addEventListener('mouseleave', () => {
    block.classList.remove('lg:bg-[#D45401]', 'lg:scale-105');
    block.classList.add(
      'lg:flex',
      'lg:justify-center',
      'lg:items-center',
      'bg-[#D45401]',
      'lg:bg-[#D45401]/50'
    );
    block.children[1].classList.add('lg:hidden');
  });
});

document.querySelectorAll('.question').forEach((block) => {
  block.addEventListener('click', () => {
    block.children[0].children[1].classList.toggle('fa-angle-down');
    block.children[0].children[1].classList.toggle('fa-angle-up');
    block.children[1].classList.toggle('hidden');
  });
});

document.getElementById('closeButton').addEventListener('click', () => {
  document.getElementById('meetingForm').classList.remove('flex');
  document.getElementById('meetingForm').classList.add('hidden');
});

document.getElementById('mobNav-button').addEventListener('click', () => {
  const element = document.getElementById('mobNav-list');
  if (element.classList.contains('hidden')) {
    element.classList.remove('hidden');
    element.classList.add('flex');
    element.classList.add('flex-col');
  } else {
    document.getElementById('mobNav-list').classList.add('hidden');
    document.getElementById('mobNav-list').classList.remove('flex');
    document.getElementById('mobNav-list').classList.remove('flex-col');
  }
});

document.querySelectorAll('.mailLink').forEach((link) => {
  link.addEventListener('click', () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&to=lupix.marketing@gmail.com`
    );
  });
});

document.getElementById('loginBtn').addEventListener('click', () => {
  window.location.href = '/src/pages/login.html';
});

// window.addEventListener('load', () => {
//   window.history.scrollRestoration = 'manual';
//   window.scrollTo(0, 0);
// });

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

window.onload = async function () {
  const value = await fetchBlogs();
  setTimeout(() => {
    if (value === true) {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('blogs').classList.replace('hidden', 'grid');
      document
        .getElementById('blogBox')
        .classList.replace('opacity-50', 'opacity-100');
    }
  }, 3000);
};

document.getElementById('closePopupBtn').addEventListener('click', () => {
  const popup = document.getElementById('sharePopup');
  if (popup.classList.contains('flex')) {
    popup.classList.remove('flex');
    popup.classList.add('hidden');
  }
});

document.getElementById('addBlog').addEventListener('click', () => {
  window.location.href = 'src/pages/blog.html?user=guest&container=requested';
});
