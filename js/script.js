const global = {
  currentPage: window.location.pathname,
};

const base_url = 'https://image.tmdb.org/t/p/';
const file_size = 'w500';
const posterURL = `${base_url}${file_size}`;

// High Light Active Link
function highLightActiveLink() {
  const pathLocation = window.location.pathname;
  const pagesLinks = document.querySelectorAll('.nav-link');

  pagesLinks.forEach((link) => {
    if (link.getAttribute('href') === pathLocation) {
      link.classList.add('active');
    }
  });
}

// Get Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  const popularMoviesContainer = document.getElementById('popular-movies');
  results.forEach((movie) => {
    const movieCard = document.querySelector('.card');
    movieCard.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img
      src="${posterURL}${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
    `;
    popularMoviesContainer.appendChild(movieCard);
  });
}

// Display Movie Details
async function displayMovieDetails() {
  const currentUrl = window.location.href;
  // Create URL object
  const urlObject = new URL(currentUrl);
  // Use URLSearchParams to get query parameters
  const queryParams = new URLSearchParams(urlObject.search);
  // Access the 'id' parameter
  const movieId = queryParams.get('id');

  console.log(movieId);
}

// Get Popular TV Shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log(results);
  const popularShowsContainer = document.getElementById('popular-shows');
  results.forEach((show) => {
    const showCard = document.querySelector('.card');
    showCard.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
    <img
      src="${posterURL}${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />
    </a>
    <div class="card-body">
      <h5 class="card-title">${show.name}</h5>
      <p class="card-text">
         <small class="text-muted">Aired: ${show.first_air_date}</small>
      </p>
    </div>
    `;
    popularShowsContainer.appendChild(showCard);
  });
}

// Fetch Data From TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = 'fef2ac7c1769d429ea4ad1f57473cf4f';
  const API_URl = 'https://api.themoviedb.org/3/';

  const response = await fetch(`${API_URl}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  return data;
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('shows');
      displayPopularShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('tv-details');
      break;
    case '/search.html':
      console.log('search.html');
      break;
  }
  highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
