/* exported data */

interface Search {
  title: string;
  imageURL: string;
  episodes: string;
  mal_id?: number;
  type?: string;
  status?: string;
  aired?: string;
  premiered?: string;
  rating?: string;
  synopsis?: string;
}

interface Data {
  searchResults: Search[];
  watchlist: Search[];
}

let data: Data = {
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
