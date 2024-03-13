'use strict';
/* exported data */
let data = {
  searchResults: [],
  watchlist: [],
};
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('watchlist-local-storage', dataJSON);
});
const watchlist = localStorage.getItem('watchlist-local-storage');
if (watchlist !== null) {
  data = JSON.parse(watchlist);
}
