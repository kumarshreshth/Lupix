import { fetchBlogs } from './functions/database.js';
import {
  errorMessage,
  loadingMessage,
  removeLoading,
} from '../src/functions/message.js';

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
    //console.log(response.text);
    return response.text;
  } catch (error) {
    //console.log(error);
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

    const loading = loadingMessage('Sending');
    const name = document.getElementById('name').value;
    const number = document.getElementById('phoneNumber').value;
    const emailId = document.getElementById('emailId').value;
    const description = document.getElementById('description').value;

    try {
      const response = await sendMail(name, number, emailId, description);

      if (response == 'OK') {
        removeLoading(loading);
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
        messageElement.innerText = 'Booking Mail Sent';
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
      removeLoading(loading);
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
    const loading = loadingMessage('Sending');
    const query = document.getElementById('query').value;
    const emailId = document.getElementById('queryEmail').value;
    try {
      const response = await sendDoubt(query, emailId);
      removeLoading(loading);
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
      removeLoading(loading);
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
      'lg:bg-[#D45401]/50'
    );
    block.classList.add('lg:scale-105');
    block.children[1].classList.remove('lg:hidden');
    block.children[0].classList.remove('lg:text-4xl', 'lg:flex-col');
  });
  block.addEventListener('mouseleave', () => {
    block.classList.remove('lg:scale-105');
    block.classList.add(
      'lg:flex',
      'lg:justify-center',
      'lg:items-center',
      'lg:bg-[#D45401]/50'
    );
    block.children[1].classList.add('lg:hidden');
    block.children[0].classList.add('lg:text-4xl', 'lg:flex-col');
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

window.addEventListener('load', () => {
  window.history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
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

window.onload = async function () {
  try {
    await fetchBlogs('blogs', true);
    setTimeout(() => {
      document.getElementById('loading').classList.add('hidden');
      document.getElementById('blogs').classList.replace('hidden', 'grid');
      document
        .getElementById('blogBox')
        .classList.replace('opacity-50', 'opacity-100');
    }, 3000);
  } catch (error) {
    console.log(error);
    errorMessage(error);
  }
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

document.querySelectorAll('.showContact').forEach((component) => {
  component.addEventListener('click', () => {
    document.getElementById('meetingForm').classList.remove('hidden');
    document.getElementById('meetingForm').classList.add('flex');
  });

  let content;

  component.addEventListener('mouseenter', () => {
    if (!content) {
      content = document.createElement('div');
      content.classList.add(
        'bg-gray-800',
        'hidden',
        'text-white',
        'p-2',
        'rounded-md',
        'absolute',
        'pointer-events-none',
        'overflow-hidden',
        'w-[200px]'
      );
      const scrollText = document.createElement('div');
      scrollText.classList.add('scrolling-text');
      scrollText.innerText =
        'Contact us • Contact us • Contact us • Contact us • Contact us • Contact us • Contact us • Contact us • Contact us •';

      content.appendChild(scrollText);
      document.body.appendChild(content);

      window.addEventListener('scroll', () => {
        if (content && content.classList.contains('lg:block')) {
          content.classList.remove('lg:block');
        }
      });
    }
  });

  component.addEventListener('mousemove', (event) => {
    if (!content.classList.contains('lg:block')) {
      content.classList.add('lg:block');
    }
    if (content) {
      const offsetX = -30;
      const offsetY = 50;
      content.style.left = `${event.pageX + offsetX}px`;
      content.style.top = `${event.pageY - offsetY}px`;
      content.style.position = 'absolute';
    }
  });

  component.addEventListener('mouseleave', () => {
    if (content) {
      content.remove();
      content = null;
    }
  });
});
