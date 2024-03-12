'use strict';
const $list = document.querySelector('.search-results');
if (!$list) throw new Error('$list query has failed');
const $dataView = document.querySelectorAll('div[data-view]');
const $landingSearch = document.querySelector('.landing-search');
if (!$landingSearch) throw new Error('$landingSearch query has failed');
const $navSearch = document.querySelector('.nav-search');
if (!$navSearch) throw new Error('$navSearch query has failed');
const $noResults = document.querySelector('.no-results');
const $results = document.querySelector('.results');
if (!$results) throw new Error('$results query has failed');
const $magnifyingGlass = document.querySelector('.fa-magnifying-glass');
// landing page search
$landingSearch.addEventListener('keydown', async (event) => {
  const key = event.key;
  const searchInput = $landingSearch.value;
  if (key === 'Enter') {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?sfw&q=${searchInput}&type=tv`,
      );
      if (!response.ok) throw new Error('Network response was not OK');
      const anime = await response.json();
      for (let i = 0; i < anime.data.length; i++) {
        if (anime.data[i].images.jpg.image_url !== undefined) {
          const search = {
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
$navSearch.addEventListener('keydown', async (event) => {
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
          const search = {
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
function renderSearch(search) {
  const $listItem = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row search-row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half search-column image-column');
  const $image = document.createElement('img');
  $image.setAttribute('class', 'list-image');
  $image.setAttribute('src', search.imageURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half search-column text-column');
  const $title = document.createElement('h2');
  $title.setAttribute('class', 'title');
  $title.textContent = search.title;
  const $episodes = document.createElement('h3');
  $episodes.setAttribute('class', 'episodes');
  $episodes.textContent = search.episodes;
  const $moreDetails = document.createElement('a');
  $moreDetails.setAttribute('href', '#');
  $moreDetails.setAttribute('class', 'details');
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
function viewSwap(view) {
  if (view === 'landing') {
    $dataView[0].setAttribute('class', 'active');
    $dataView[1].setAttribute('class', 'hidden');
    $navSearch?.setAttribute('class', 'nav-search hidden');
    $magnifyingGlass?.setAttribute('class', 'hidden');
  } else if (view === 'search') {
    $dataView[0].setAttribute('class', 'hidden');
    $dataView[1].setAttribute('class', 'active');
    $navSearch?.setAttribute('class', 'nav-search');
    $magnifyingGlass?.setAttribute('class', 'fa-solid fa-magnifying-glass');
  }
}
