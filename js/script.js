const global = {
  currentPage: window.location.pathname,
};

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
  console.log(results);
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
      break;
    case '/movie-details.html':
      console.log('movie-details');
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
