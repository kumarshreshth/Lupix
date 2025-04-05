import { viewData } from '../functions/database.js';
import {
  loadingMessage,
  removeLoading,
  errorMessage,
} from '../functions/message.js';

const loading = loadingMessage('Fetching');
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
  const blogId = urlParams.get('id');
  const container = urlParams.get('container');
  try {
    await viewData(blogId, container);
    removeLoading(loading);
  } catch (error) {
    removeLoading(loading);
    errorMessage(error);
  }
}
