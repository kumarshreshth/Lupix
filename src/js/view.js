import { viewData } from '../functions/database.js';
import { loadingMessage, removeLoading } from '../functions/message.js';

const loading = loadingMessage('Fetching');
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
  const blogId = urlParams.get('id');
  const container = urlParams.get('container');
  try {
    const val = await viewData(blogId, container);
    if (val == true) {
      removeLoading(loading);
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error');
  }
}

document.getElementById('logo').addEventListener('click', () => {
  window.location.href = '../../index.html';
});
