/* exported data */

interface Search {
  title: string;
  imageURL: string;
  episodes: string;
  animeId?: number;
  type?: string;
  status?: string;
  aired?: string;
  premiered?: string;
  rating?: string;
  synopsis?: string;
}

interface Data {
  watchlist: Search[];
}

let data: Data = {
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
