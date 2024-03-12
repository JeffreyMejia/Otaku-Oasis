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

// ^queries above^

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

// landing page search
$landingSearch.addEventListener('keydown', async (event: KeyboardEvent) => {
  const key = event.key;
  const searchInput = $landingSearch.value;
  if (key === 'Enter') {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=tv`,
      );
      if (!response.ok) throw new Error('Network response was not OK');
      const anime = await response.json();
      console.log(anime);
      for (let i = 0; i < anime.data.length; i++) {
        if (anime.data[i].images.jpg.image_url !== undefined) {
          const search: Search = {
            title: anime.data[i].title,
            imageURL: anime?.data[i]?.images?.jpg?.image_url,
            episodes: anime.data[i].episodes,
            animeId: anime.data[i].mal_id,
          };
          const newSearch = renderSearch(search);
          $list?.appendChild(newSearch);
        } else {
          $noResults?.setAttribute('class', 'no-results');
        }
      }
      viewSwap('search');
    } catch (error) {
      console.error('There was a problem with your fetch:', error);
    }
  }
  $results.textContent = `results for '${searchInput}'`;
});

// nav bar search
$navSearch.addEventListener('keydown', async (event: KeyboardEvent) => {
  const key = event.key;
  const searchInput = $navSearch.value;
  if (key === 'Enter') {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=tv`,
      );
      if (!response.ok) throw new Error('Network response was not OK');
      while ($list.firstChild) {
        $list.removeChild($list.firstChild);
      }
      const anime = await response.json();
      for (let i = 0; i < anime.data.length; i++) {
        if (anime.data[i].images.jpg.image_url !== undefined) {
          const search: Search = {
            title: anime.data[i].title,
            imageURL: anime?.data[i]?.images?.jpg?.image_url,
            episodes: anime.data[i].episodes,
            animeId: anime.data[i].mal_id,
          };
          const newSearch = renderSearch(search);
          $list?.appendChild(newSearch);
        } else {
          $noResults?.setAttribute('class', 'no-results');
        }
      }
      viewSwap('search');
    } catch (error) {
      console.error('There was a problem with your fetch:', error);
    }
  }
  $results.textContent = `results for '${searchInput}'`;
  while ($dataView[2].lastChild) {
    $dataView[2].removeChild($dataView[2].lastChild);
  }
});

// *render functions below*
function renderSearch(search: Search): HTMLLIElement {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('data-id', String(search.animeId));
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row search-row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half search-column image-column');
  const $image = document.createElement('img');
  $image.setAttribute('src', search.imageURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half search-column text-column');
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
  $moreDetails.addEventListener('click', async (event: Event) => {
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
      };
      const details = renderDetails(anime);
      $dataView[2].appendChild(details);
      viewSwap('details');
    } catch (error) {
      console.error('There was a problem with your fetch:', error);
    }
  });

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
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
  const $image = document.createElement('img');
  $image.setAttribute('src', anime.imageURL);
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

  $row.appendChild($columnThird);
  $columnThird.appendChild($image);
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

function viewSwap(view: string): void {
  if (view === 'landing') {
    $dataView[0].setAttribute('class', 'active');
    $dataView[1].setAttribute('class', 'hidden');
    $dataView[2].setAttribute('class', 'hidden');
    $navSearch?.setAttribute('class', 'nav-search hidden');
    $magnifyingGlass?.setAttribute('class', 'hidden');
  } else if (view === 'search') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'active');
    $dataView[2].setAttribute('class', 'hidden');
    $navSearch?.setAttribute('class', 'nav-search');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  } else if (view === 'details') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'hidden');
    $dataView[2].setAttribute('class', 'active');
    $navSearch?.setAttribute('class', 'nav-search');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  }
}
