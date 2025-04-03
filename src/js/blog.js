import {
  updateData,
  readData,
  writeData,
  removeLog,
  readUserData,
  updateUserData,
} from '../functions/database.js';
import {
  loadingMessage,
  removeLoading,
  showMessage,
} from '../functions/message.js';
import { logOut, newAuthUser } from '../functions/auth.js';
import { auth } from '../functions/config.js';

import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');
const blogId = urlParams.get('id');
const container = urlParams.get('container');

if (user == 'admin') {
  onAuthStateChanged(auth, (user) => {
    if (!user || user.isAnonymous) {
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
      await logOut();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 3000);
    } catch (error) {
      console.log(error);
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
  try {
    await readData(blogId, container);
  } catch (error) {
    console.log(error);
    throw new Error('Error');
  }
}

function checkLength() {
  const text = quill.getText().trim();
  if (text.length === 0) {
    const component = document.getElementById('emptyMessage');
    component.classList.replace('hidden', 'flex');
    window.scrollTo(0, 100);
    return false;
  } else {
    return true;
  }
}

function collectBlogData() {
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
  return data;
}

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const contentLength = checkLength();
  if (!contentLength) {
    return;
  }

  const data = collectBlogData();

  if (urlParams.has('update')) {
    const loaded = loadingMessage('Updating');
    if (container == 'blogs') {
      // Update data if the container is 'blogs'
      try {
        await updateData(blogId, data, 'blogs');
        setTimeout(() => {
          removeLoading(loaded);
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1000);
        }, 3000);
      } catch (error) {
        console.log(error);
        throw new Error('Error');
      }
    } else {
      // If the container is not 'blogs', remove log and write data
      try {
        await removeLog('requested', blogId);
      } catch (error) {
        console.log(error);
        throw new Error('Error');
      }
      try {
        await writeData(data, 'blogs');
        setTimeout(() => {
          removeLoading(loaded);
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 1000);
        }, 3000);
      } catch (error) {
        console.log(error);
        throw new Error('Error');
      }
    }
  } else {
    let loading;
    if (user == 'guest') {
      loading = loadingMessage('Submitting');
    } else {
      loading = loadingMessage('Publishing');
    }

    if (user == 'guest') {
      onAuthStateChanged(auth, async (authUser) => {
        console.log(authUser);
        if (!authUser) {
          try {
            await newAuthUser();
          } catch (error) {
            console.log(error);
            throw new Error('Error');
          }
        } else {
          console.log('Existing user', authUser.uid);

          const currentTime = Date.now();
          try {
            const userData = await readUserData(authUser.uid);

            if (userData == null) {
              try {
                await newAuthUser();
              } catch (error) {
                console.log(error);
                throw new Error('Error');
              }
            } else {
              const remainingCount = userData.writeCount;

              if (remainingCount > 0) {
                console.log('Remaining Count', remainingCount);

                try {
                  await updateUserData(authUser.uid, {
                    writeCount: remainingCount - 1,
                    lastUpdated: Date.now(),
                  });
                } catch (error) {
                  console.log(error);
                  throw new Error('Error');
                }

                try {
                  await writeData(data, container);
                  setTimeout(() => {
                    removeLoading(loading);
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }, 3000);
                } catch (error) {
                  console.log(error);
                  throw new Error('Error');
                }
              } else {
                console.log('No remaining count');
                const lastUpdated = userData.lastUpdated;
                console.log(lastUpdated, currentTime);
                const timePassed = currentTime - lastUpdated;
                console.log(timePassed);

                if (timePassed >= 120000) {
                  try {
                    await updateUserData(authUser.uid, {
                      writeCount: 2,
                      lastUpdated: currentTime,
                    });
                  } catch (error) {
                    console.log(error);
                    throw new Error('Error');
                  }

                  try {
                    await writeData(data, container);
                    setTimeout(() => {
                      removeLoading(loading);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }, 3000);
                  } catch (error) {
                    console.log(error);
                    throw new Error('Error');
                  }
                } else {
                  removeLoading(loading);
                  console.log('message');
                  showMessage('Exceeded Limit', 'error');
                  return;
                }
              }
            }
          } catch (error) {
            console.log(error);
            throw new Error('Error');
          }
        }
      });
    } else {
      try {
        await writeData(data, container);
        setTimeout(() => {
          removeLoading(loading);
          window.location.href = 'dashboard.html';
        }, 3000);
      } catch (error) {
        console.log(error);
        throw new Error('Error');
      }
    }
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
