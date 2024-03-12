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

function renderSearch(search: Search): HTMLLIElement {
  const $listItem = document.createElement('li');
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
  $episodes.textContent = search.episodes;
  const $moreDetails = document.createElement('a');
  $moreDetails.setAttribute('href', '#');
  $moreDetails.setAttribute('class', 'details text');
  $moreDetails.textContent = 'More details...';

  $listItem.appendChild($row);
  $row.appendChild($columnHalf1);
  $columnHalf1.appendChild($image);
  $row.appendChild($columnHalf2);
  $columnHalf2.appendChild($title);
  $columnHalf2.appendChild($episodes);
  $columnHalf2.appendChild($moreDetails);

  return $listItem;
}

// function renderDetails(anime) {
// const $row = document.createElement('div');
// $row.setAttribute('class', 'row');
// const $columnThird = document.createElement('div');
// $columnThird.setAttribute('class', 'column-third');
// const $image = document.createElement('img');
// $image.setAttribute('src', );
// const $title = document.createElement('h2');
// $title.setAttribute('class', 'title text');
// $title.textContent = ;
// const $type = document.createElement('p')
// $type.setAttribute('class', 'type text');
// $type.textContent = ;
// const $episodes = document.createElement('p');
// $episodes.setAttribute('class', 'episodes text');
// $episodes.textContent = ;
// const $status = document.createElement('p');
// $status.setAttribute('class', 'type text');
// $status.textContent = ;
// const $aired = document.createElement('p');
// $aired.setAttribute('class', 'aired text');
// $aired.textContent = ;
// const $premiered = document.createElement('p');
// $premiered.setAttribute('class', 'premiered text');
// $premiered.textContent = ;
// const $columnTwoThirds = document.createElement('div');
// $columnTwoThirds.setAttribute('class', 'column-two-thirds');
// const $synopsisHeading = document.createElement('h2');
// $synopsisHeading.setAttribute('class', 'synopsis text');
// $synopsisHeading.textContent = 'Synopsis'
// const $synopsis = document.createElement('p');
// $synopsis.setAttribute('class', 'synopsis text');
// $synopsis.textContent = ;

// $row.appendChild($columnThird);
// $columnThird.appendChild($image);
// $columnThird.appendChild($title);
// $columnThird.appendChild($type);
// $columnThird.appendChild($episodes);
// $columnThird.appendChild($status);
// $columnThird.appendChild($aired);
// $columnThird.appendChild($premiered);
// $row.appendChild($columnTwoThirds)
// $columnTwoThirds.appendChild($synopsisHeading);
// $columnTwoThirds.appendChild($synopsis);

// return $row
// }

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
