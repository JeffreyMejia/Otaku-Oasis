'use strict';
function renderSearch(entry) {
  const $listItem = document.createElement('li');
  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  const $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  const $image = document.createElement('img');
  $image.setAttribute('class', 'list-image');
  $image.setAttribute('src', entry.photoURL);
  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  const $title = document.createElement('h1');
  $title.textContent = entry.title;
  const $episodes = document.createElement('h2');
  $episodes.textContent = entry.episodes;
  const $moreDetails = document.createElement('a');
  $moreDetails.setAttribute('href', '#');
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
renderSearch(entry);
