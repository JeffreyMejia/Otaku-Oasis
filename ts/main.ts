const $list = document.querySelector('.search-results');
if (!$list) throw new Error('$list query has failed');
const $dataView = document.querySelectorAll('div[data-view]');
const $landingSearch = document.querySelector(
  '.landing-search',
) as HTMLInputElement;
if (!$landingSearch) throw new Error('$landingSearch query has failed');
const $navSearch = document.querySelector('.nav-search') as HTMLInputElement;
if (!$navSearch) throw new Error('$navSearch query has failed');
const $noResults = document.querySelector('.no-results');
const $results = document.querySelector('.results');
if (!$results) throw new Error('$results query has failed');
const $magnifyingGlass = document.querySelector('.fa-magnifying-glass');
const $noEntries = document.querySelector('.no-entries');
const $bookmark = document.querySelector('.fa-bookmark');
const $otakuOasis = document.querySelector('.otaku-oasis');
const $watchlist = document.querySelector('.watchlist');
if (!$watchlist) throw new Error('$watchlist query has failed');
const $dialog = document.querySelector('dialog');
const $cancel = document.querySelector('.cancel');
const $confirm = document.querySelector('.confirm');

// LANDING PAGE SEARCH
$landingSearch.addEventListener('keydown', async (event: KeyboardEvent) => {
  const key = event.key;
  const searchInput = $landingSearch.value;
  if (key === 'Enter') {
    try {
      const response1 = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=tv`,
      );
      const response2 = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=movie`,
      );
      if (!response1.ok) throw new Error('Network response was not OK');
      if (!response2.ok) throw new Error('Network response was not OK');
      while ($list.firstChild) {
        $list.removeChild($list.firstChild);
      }
      const tv = await response1.json();
      const movie = await response2.json();
      const anime = [...tv.data, ...movie.data];
      for (let i = 0; i < anime.length; i++) {
        if (anime.length > 0) {
          const search: Search = {
            title: anime[i].title,
            imageURL: anime[i]?.images?.jpg?.image_url,
            episodes: anime[i].episodes,
            animeId: anime[i].mal_id,
          };
          const newSearch = renderSearch(search);
          $list?.appendChild(newSearch);
        } else {
          $results.setAttribute('class', 'hidden');
          $noResults?.setAttribute('class', 'no-results active');
        }
      }
      viewSwap('search');
    } catch (error) {
      console.error('There was a problem with your fetch:', error);
    }
  }
  $results.textContent = `results for '${searchInput}'`;
});

// NAV BAR SEARCH
$navSearch.addEventListener('keydown', async (event: KeyboardEvent) => {
  const key = event.key;
  const searchInput = $navSearch.value;
  if (key === 'Enter') {
    try {
      const response1 = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=tv`,
      );
      const response2 = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=movie`,
      );
      if (!response1.ok) throw new Error('Network response was not OK');
      if (!response2.ok) throw new Error('Network response was not OK');
      while ($list.firstChild) {
        $list.removeChild($list.firstChild);
      }
      const tv = await response1.json();
      const movie = await response2.json();
      const anime = [...tv.data, ...movie.data];
      for (let i = 0; i < anime.length; i++) {
        if (anime.length > 0) {
          const search: Search = {
            title: anime[i].title,
            imageURL: anime[i]?.images?.jpg?.image_url,
            episodes: anime[i].episodes,
            animeId: anime[i].mal_id,
          };
          const newSearch = renderSearch(search);
          $list?.appendChild(newSearch);
        } else {
          $results.setAttribute('class', 'hidden');
          $noResults?.setAttribute('class', 'no-results active');
        }
      }
      viewSwap('search');
    } catch (error) {
      console.error('There was a problem with your fetch:', error);
    }
  }
  $results.textContent = `results for '${searchInput}'`;
});

// *RENDER FUNCTIONS BELOW*
function renderSearch(search: Search): HTMLLIElement {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('data-id', String(search.animeId));
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row search-row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half style-column image-column');
  const $image = document.createElement('img');
  $image.setAttribute('src', search.imageURL);
  const $buttonDiv = document.createElement('div');
  $buttonDiv.setAttribute('class', 'button-div');
  const $add = document.createElement('button');
  $add.setAttribute('class', 'add-button');
  $add.textContent = 'Add to watchlist';
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half style-column text-column');
  const $title = document.createElement('h2');
  $title.setAttribute('class', 'title text');
  $title.textContent = search.title;
  const $episodes = document.createElement('h3');
  $episodes.setAttribute('class', 'episodes text');
  $episodes.textContent = `Eps ${search.episodes}`;
  const $moreDetails = document.createElement('a');
  $moreDetails.setAttribute('href', '#');
  $moreDetails.setAttribute('class', 'details text');
  $moreDetails.textContent = 'More details...';
  $moreDetails.addEventListener('click', details);

  $add.addEventListener('click', addToWatchlist);

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
  $columnHalf1.appendChild($buttonDiv);
  $buttonDiv.appendChild($add);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($title);
  $columnHalf2.appendChild($episodes);
  $columnHalf2.appendChild($moreDetails);

  return $listItem;
}

function renderDetails(anime: Search): HTMLDivElement {
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $columnThird = document.createElement('div');
  $columnThird.setAttribute('class', 'column-third');
  $columnThird.setAttribute('data-id', String(anime.animeId));
  const $image = document.createElement('img');
  $image.setAttribute('src', anime.imageURL);
  const $buttonDiv = document.createElement('div');
  $buttonDiv.setAttribute('class', 'button-div');
  const $add = document.createElement('button');
  $add.setAttribute('class', 'add-button');
  $add.textContent = 'Add to watchlist';
  const $title = document.createElement('h2');
  $title.setAttribute('class', 'title text');
  $title.textContent = anime.title;
  const $type = document.createElement('p');
  $type.setAttribute('class', 'type text');
  $type.textContent = `Type: ${anime.type}`;
  const $episodes = document.createElement('p');
  $episodes.setAttribute('class', 'episodes text');
  $episodes.textContent = `Episodes: ${anime.episodes} `;
  const $status = document.createElement('p');
  $status.setAttribute('class', 'type text');
  $status.textContent = `Status: ${anime.status}`;
  const $aired = document.createElement('p');
  $aired.setAttribute('class', 'aired text');
  $aired.textContent = `Aired: ${anime.aired}`;
  const $premiered = document.createElement('p');
  $premiered.setAttribute('class', 'premiered text');
  $premiered.textContent = `Premiered: ${anime.premiered}`;
  const $rating = document.createElement('p');
  $rating.setAttribute('class', 'rating text');
  $rating.textContent = `Rating: ${anime.rating}`;
  const $columnTwoThirds = document.createElement('div');
  $columnTwoThirds.setAttribute('class', 'column-two-thirds');
  const $synopsisHeading = document.createElement('h2');
  $synopsisHeading.setAttribute('class', 'synopsis text');
  $synopsisHeading.textContent = 'Synopsis';
  const $synopsis = document.createElement('p');
  $synopsis.setAttribute('class', 'synopsis text');
  $synopsis.textContent = String(anime.synopsis);

  $add.addEventListener('click', addToWatchlist);

  $row.appendChild($columnThird);
  $columnThird.appendChild($image);
  $columnThird.appendChild($buttonDiv);
  $buttonDiv.appendChild($add);
  $columnThird.appendChild($title);
  $columnThird.appendChild($type);
  $columnThird.appendChild($episodes);
  $columnThird.appendChild($status);
  $columnThird.appendChild($aired);
  $columnThird.appendChild($premiered);
  $columnThird.appendChild($rating);
  $row.appendChild($columnTwoThirds);
  $columnTwoThirds.appendChild($synopsisHeading);
  $columnTwoThirds.appendChild($synopsis);

  return $row;
}

function renderWatchlist(entry: Search): HTMLLIElement {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('data-id', String(entry.animeId));
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row search-row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half style-column image-column');
  const $image = document.createElement('img');
  $image.setAttribute('src', entry.imageURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half style-column text-column');
  const $title = document.createElement('h2');
  $title.setAttribute('class', 'title text');
  $title.textContent = entry.title;
  const $episodes = document.createElement('h3');
  $episodes.setAttribute('class', 'episodes text');
  $episodes.textContent = `Eps ${entry.episodes}`;
  const $moreDetails = document.createElement('a');
  $moreDetails.setAttribute('href', '#');
  $moreDetails.setAttribute('class', 'details text');
  $moreDetails.textContent = 'More details...';
  $moreDetails.addEventListener('click', details);
  const $trashDiv = document.createElement('div');
  $trashDiv.setAttribute('class', 'trash-div');
  const $trash = document.createElement('i');
  $trash.setAttribute('class', 'fa-solid fa-trash-can');
  $trash.addEventListener('click', (event: Event) => {
    $dialog?.showModal();
    const $eventTarget = event.target as HTMLElement;
    const $closest = $eventTarget.closest('[data-id]') as HTMLLIElement;
    const animeId = $closest.getAttribute('data-id');
    $dialog?.setAttribute('data-id', String(animeId));
  });

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($title);
  $columnHalf2.appendChild($episodes);
  $columnHalf2.appendChild($moreDetails);
  $columnHalf2.appendChild($trashDiv);
  $trashDiv.appendChild($trash);

  return $listItem;
}

// *ADD TO WATCHLIST FUNCTION*
async function addToWatchlist(event: Event): Promise<void> {
  const $eventTarget = event.target as HTMLElement;
  const $closest = $eventTarget.closest('[data-id]') as HTMLDivElement;
  const animeId = $closest.getAttribute('data-id');
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const individualAnime = await response.json();
    const anime: Search = {
      title: individualAnime.data.title,
      imageURL: individualAnime?.data?.images?.jpg?.image_url,
      episodes: individualAnime.data.episodes,
      animeId: individualAnime.data.mal_id,
    };
    const exists = data.watchlist.find((fav) => anime.animeId === fav.animeId);
    if (!exists) {
      data.watchlist.push(anime);
      const newFavorite = renderWatchlist(anime);
      $watchlist?.prepend(newFavorite);
      viewSwap('watchlist');
      noFavorites();
    }
  } catch (error) {
    console.error('There was a problem with your fetch:', error);
  }
}

// *DETAILS PAGE FUNCTION*
async function details(event: Event): Promise<void> {
  while ($dataView[2].lastChild) {
    $dataView[2].removeChild($dataView[2].lastChild);
  }
  const $eventTarget = event.target as HTMLElement;
  const $closest = $eventTarget.closest('[data-id]') as HTMLAnchorElement;
  const animeId = $closest.getAttribute('data-id');
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const individualAnime = await response.json();
    const anime = {
      title: individualAnime.data.title,
      imageURL: individualAnime?.data?.images?.jpg?.image_url,
      episodes: individualAnime.data.episodes,
      type: individualAnime.data.type,
      status: individualAnime.data.status,
      aired: individualAnime.data.aired.string,
      premiered: individualAnime.data.season,
      rating: individualAnime.data.rating,
      synopsis: individualAnime.data.synopsis,
      animeId: individualAnime.data.mal_id,
    };
    const details = renderDetails(anime);
    $dataView[2].appendChild(details);
    viewSwap('details');
  } catch (error) {
    console.error('There was a problem with your fetch:', error);
  }
}

// *VIEW SWAPPING*
function viewSwap(view: string): void {
  if (view === 'landing') {
    $dataView[0].setAttribute('class', 'active');
    $dataView[1].setAttribute('class', 'hidden');
    $dataView[2].setAttribute('class', 'hidden');
    $dataView[3].setAttribute('class', 'watchlist-view hidden');
    $navSearch?.setAttribute('class', 'nav-search hidden');
    $magnifyingGlass?.setAttribute('class', 'hidden');
  } else if (view === 'search') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'active');
    $dataView[2].setAttribute('class', 'hidden');
    $navSearch?.setAttribute('class', 'nav-search');
    $dataView[3].setAttribute('class', 'watchlist-view hidden');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  } else if (view === 'details') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'hidden');
    $dataView[2].setAttribute('class', 'active');
    $dataView[3].setAttribute('class', 'watchlist-view hidden');
    $navSearch?.setAttribute('class', 'nav-search');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  } else if (view === 'watchlist') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'hidden');
    $dataView[2].setAttribute('class', 'hidden');
    $dataView[3].setAttribute('class', 'watchlist-view active');
    $navSearch?.setAttribute('class', 'nav-search');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  }
}

// *MODAL LISTENERS*
$cancel?.addEventListener('click', () => {
  $dialog?.close();
});

$confirm?.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLDialogElement;
  const $closest = $eventTarget.closest('[data-id]') as HTMLLIElement;
  const animeId = $closest.getAttribute('data-id');
  data.watchlist = data.watchlist.filter(
    (favorite) => String(favorite.animeId) !== animeId,
  );

  const $li = document.querySelectorAll('li');
  for (let i = 0; i < $li.length; i++) {
    if (animeId === $li[i].getAttribute('data-id')) {
      $li[i].remove();
    }
  }
  noFavorites();
  $dialog?.close();
});

// *CREATES WATCHLIST*
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.watchlist.length; i++) {
    const $newEntry = renderWatchlist(data.watchlist[i]);
    $watchlist.prepend($newEntry);
  }
  noFavorites();
});

function noFavorites(): void {
  if (data.watchlist.length > 0) {
    $noEntries?.setAttribute('class', 'hidden');
  } else {
    $noEntries?.setAttribute('class', 'no-entries text active');
  }
}

$bookmark?.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target;
  if ($eventTarget === $bookmark) {
    viewSwap('watchlist');
    noFavorites();
  }
});

$otakuOasis?.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target;
  if ($eventTarget === $otakuOasis) {
    viewSwap('landing');
  }
});
