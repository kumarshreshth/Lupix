export function LoginMessage(message, status) {
  const messageBlock = document.createElement('div');
  messageBlock.classList.add(
    'fixed',
    'top-10',
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
  messageElement.innerText = message;
  if (status == 'success') {
    messageBlock.classList.add('text-green-400');
  } else {
    messageElement.classList.add('text-red-700');
  }
  messageBlock.appendChild(messageElement);
  document.body.appendChild(messageBlock);
  setTimeout(() => {
    messageBlock.remove();
  }, 3000);
}

export function loadingMessage(message) {
  const loadingComponent = document.createElement('div');
  loadingComponent.classList.add(
    'fixed',
    'inset-0',
    'flex',
    'justify-center',
    'items-center',
    'z-30',
    'min-h-screen',
    'bg-black/90',
    'w-full'
  );

  const loadingContent = document.createElement('div');
  loadingContent.classList.add('text-xl', 'text-white');
  loadingContent.innerText = message;

  const dotsSpan = document.createElement('span');
  dotsSpan.classList.add('dots');
  loadingContent.appendChild(dotsSpan);

  loadingComponent.appendChild(loadingContent);

  document.body.appendChild(loadingComponent);

  let dotCount = 0;
  const interval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsSpan.textContent = '.'.repeat(dotCount);
  }, 500);

  return {
    loadingComponent,
    interval,
  };
}

export function removeLoading({ loadingComponent, interval }) {
  clearInterval(interval);
  document.body.removeChild(loadingComponent);
}

export function errorMessage(error) {
  document.body.innerHTML = '';
  document.body.className = '';
  const errorBlock = document.createElement('div');
  errorBlock.classList.add('m-4', 'p-4', 'space-y-8');
  const errorHeading = document.createElement('h1');
  errorHeading.classList.add('text-4xl', 'text-red-500');
  errorHeading.innerText = 'An error has occured!! Try again!';
  errorBlock.appendChild(errorHeading);
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('text-2xl', 'p-4');
  errorMessage.innerText = error;
  errorBlock.appendChild(errorMessage);
  document.body.appendChild(errorBlock);
  throw new Error();
}
