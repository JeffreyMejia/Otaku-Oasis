'use strict';
// const $list = document.querySelector('.search-results');
// if (!$list) throw new Error('$list query has failed');
// const $dataView = document.querySelectorAll('div[data-view]');
// const $landingSearch = document.querySelector('.landing-search') as HTMLInputElement;
// if (!$landingSearch) throw new Error('$landingSearch query has failed');
// const $navSearch = document.querySelector('.nav-search')
// $landingSearch.addEventListener('keydown', async (event:KeyboardEvent) => {
//   const $key = event.key
//   const $searchInput = $landingSearch.value
//   console.log($key)
//   if ($key === 'Enter') {
//     console.log('hello')
//   try {
//    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${$searchInput}`);
//     if (!response.ok)  throw new Error('Network response was not OK');
//     const anime = await response.json();
//     console.log(anime)
//       //  const search: Search = {
//       //     title: anime.data.title,
//       //     photoURL: anime.data.images?.jpg?.image_url,
//       //     episodes: anime.data.episodes
//       //  }
//     for (let i=0 ; i < anime.data.length; i++) {
//             let newSearch =  renderSearch(anime.data[i])
//       $list?.appendChild(newSearch)
//     }
//     viewSwap('search')
//   } catch (error) {
//     console.error('There was a problem with your fetch:', error);
//   }
//   }
//   $landingSearch.textContent = `results for '${$searchInput}'`;
// })
//     async function test(): Promise<void> {
//   try {
//    const response = await fetch('https://api.jikan.moe/v4/anime');
//     if (!response.ok)  throw new Error('Network response was not OK');
//     const anime = await response.json();
//     console.log(anime)
//        const search: Search = {
//           title: anime.data.title,
//           photoURL: anime.data.images.jpg.image_url,
//           episodes: anime.data.episodes
//        }
//     for (let i=0 ; i < anime.data.length; i++) {
//             const newSearch =  renderSearch(search)
//       $list?.appendChild(newSearch)
//     }
//           viewSwap('search')
//   } catch (error) {
//     console.error('There was a problem with your fetch:', error);
//   }
// }
// test()
// function renderSearch(search: Search): HTMLLIElement {
//   const $listItem = document.createElement('li');
//   const $row = document.createElement('div');
//   $row.setAttribute('class', 'row');
//   const $columnHalf1 = document.createElement('div');
//   $columnHalf1.setAttribute('class', 'column-half');
//   const $image = document.createElement('img');
//   $image.setAttribute('class', 'list-image');
//   $image.setAttribute('src', search.photoURL);
//   const $columnHalf2 = document.createElement('div');
//   $columnHalf2.setAttribute('class', 'column-half');
//   const $title = document.createElement('h1');
//   $title.textContent = search.title;
//   const $episodes = document.createElement('h2');
//   $episodes.textContent = search.episodes;
//   const $moreDetails = document.createElement('a');
//   $moreDetails.setAttribute('href', '#');
//   $moreDetails.textContent = 'More details...';
//   $listItem.appendChild($row);
//   $row.appendChild($columnHalf1);
//   $columnHalf1.appendChild($image);
//   $row.appendChild($columnHalf2);
//   $columnHalf2.appendChild($title);
//   $columnHalf2.appendChild($episodes);
//   $columnHalf2.appendChild($moreDetails);
//   return $listItem;
// };
// function viewSwap(view:string):void {
//   if (view === 'landing') {
//     $dataView[0].setAttribute('class', 'active');
//     $dataView[1].setAttribute('class', 'hidden');
//   } else if (view === 'search') {
//     $dataView[0].setAttribute('class', 'hidden');
//     $dataView[1].setAttribute('class', 'active')
//     $navSearch?.setAttribute('class', 'nav-search')
//   }
// };
