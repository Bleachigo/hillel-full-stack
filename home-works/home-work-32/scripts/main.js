// Загальні вимоги до завдання:

// Використання зовнішнього API:Інтегрувати API для отримання даних, що відповідають тематиці проєкту (наприклад, OMDb API для пошуку фільмів).

// Функціонал "LiveSearch":Реалізувати можливість відображення результатів пошуку в реальному часі, як тільки користувач починає вводити запит у пошукове поле.

// Забезпечити оновлення результатів без потреби натискати на кнопку "Пошук".

// Відображення результатів пошуку:Кожен результат пошуку повинен включати ключову інформацію,
// залежно від тематики проєкту (наприклад, для фільмів: назву, рік випуску, тип та постер).

// Користувацький інтерфейс:Розробити користувацький інтерфейс, який буде інтуїтивно зрозумілим, легким у використанні та візуально привабливим.

// Інтерфейс має адаптуватися під різні розміри екранів та пристрої.
// Робота з помилками та винятками:Імплементувати належне управління помилками та винятковими ситуаціями, які можуть виникати під час запитів до API або в процесі роботи програми.

// Ці загальні вимоги можуть бути адаптовані під різні типи проєктів, в залежності від задачі та обраної тематики.
// Важливо, щоб кожен студент зміг демонструвати розуміння основних концепцій розробки веб-додатків, а також вміння працювати з зовнішніми API та обробляти дані в реальному часі.

const OMDb_BASE_URL = 'https://www.omdbapi.com/';
const OMDb_API_KEY = 'dcd4a3a2';
const movieForm = document.forms['movie-form'];
const searchInput = document.getElementById('movie-title');
const container = document.getElementById('movie-info');
const suggestionsContainer = document.getElementById('search-suggestions');
const DEFAULT_POSTER =
  'https://images.unsplash.com/photo-1560109947-543149eceb16?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

async function movieApiRequest(searchParam, isIdSearch = false) {
  const queryType = isIdSearch ? 'i' : 's';
  const plotParam = isIdSearch ? '&plot=full' : '';
  const url = `${OMDb_BASE_URL}?apikey=${OMDb_API_KEY}&${queryType}=${encodeURIComponent(searchParam)}${plotParam}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'True') {
      return { data: isIdSearch ? data : data.Search, error: null };
    } else {
      return { data: isIdSearch ? null : [], error: data.Error };
    }
  } catch (error) {
    console.log('Api request failed:', error);
    return { data: isIdSearch ? null : [], error: 'Network connection error' };
  }
}

function renderSearchSuggestions(movies, apiError) {
  suggestionsContainer.replaceChildren();

  if (apiError) {
    suggestionsContainer.classList.remove('hidden');
    const errorRow = document.createElement('div');
    errorRow.className = 'p-3 text-sm text-center text-gray-400 italic';
    errorRow.textContent =
      apiError === 'Movie not found!'
        ? '? No movies found...'
        : 'Please type more characters...';
    suggestionsContainer.appendChild(errorRow);
    return;
  }

  if (!movies || movies.length === 0) {
    suggestionsContainer.classList.add('hidden');
    return;
  }

  suggestionsContainer.classList.remove('hidden');
  const topMovies = movies.slice(0, 5);

  topMovies.forEach((movie) => {
    const row = document.createElement('div');
    row.className =
      'p-2 text-left text-sm text-white hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-700/50 last:border-none flex justify-between items-center gap-2';

    row.innerHTML = `
      <span class="font-medium truncate">${movie.Title}</span>
      <span class="text-xs text-gray-400 shrink-0">${movie.Year}</span>
`;

    row.addEventListener('click', async () => {
      searchInput.value = movie.Title;
      suggestionsContainer.classList.add('hidden');

      container.innerHTML = `
        <div class="col-span-full text-center py-10">
          <p class="text-xl text-yellow-400 animate-pulse font-medium">⏳ Loading movie details...</p>
        </div>
      `;

      const { data: detailedMovie, error } = await movieApiRequest(movie.imdbID, true);

      if (error) {
        container.innerHTML = `<p class="text-red-400">❌ Error: ${error}</p>`;
      } else {
        renderMoviesCards(detailedMovie);
      }
    });
    suggestionsContainer.appendChild(row);
  });
}

const processLiveSearch = debounce(async (text) => {
  const query = text.trim();

  if (query.length < 3) {
    suggestionsContainer.replaceChildren();
    suggestionsContainer.classList.add('hidden');
    return;
  }

  console.log('LiveSearch makes request for hints:', query);

  const { data: movies, error } = await movieApiRequest(query);

  renderSearchSuggestions(movies, error);
}, 400);

searchInput.addEventListener('input', (event) => {
  processLiveSearch(event.target.value);
});

function renderMoviesCards(moviesData) {
  const movies = Array.isArray(moviesData) ? moviesData : [moviesData];
  const template = document.getElementById('movie-card-template');

  if (!moviesData) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10 bg-slate-900/60 backdrop-blur-sm rounded-lg">
        <p class="text-xl text-red-400">❌ No results found. Try another title.</p>
      </div>
    `;
    return;
  }

  if (movies.length === 0 || !movies[0]) {
    container.innerHTML = `
      <div class="col-span-full text-center py-10 bg-slate-900/60 backdrop-blur-sm rounded-lg">
        <p class="text-xl text-red-400">❌ No results found. Try another title.</p>
      </div>
    `;
    return;
  }

  container.replaceChildren();

  const isDetailedView =
    movies.length === 1 && movies[0] && movies[0].hasOwnProperty('Plot');

  if (isDetailedView) {
    container.className = 'max-w-3xl mx-auto mt-10 px-4 pb-12';
  } else {
    container.className =
      'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10 px-4 pb-12';
  }

  movies.forEach((movie) => {
    const cardClone = template.content.cloneNode(true);
    const cardWrapper = cardClone.querySelector('div');

    const posterImg = cardClone.querySelector('.movie-poster');
    const titleH3 = cardClone.querySelector('.movie-title');
    const typeSpan = cardClone.querySelector('.movie-type');
    const yearSpan = cardClone.querySelector('.movie-year');

    posterImg.src = movie.Poster !== 'N/A' ? movie.Poster : DEFAULT_POSTER;
    posterImg.alt = movie.Title;

    posterImg.addEventListener('error', () => {
      console.log(`Poster for movie ${movie.Title} return 404. Replace to placeholder.`);
      posterImg.src = DEFAULT_POSTER;
    });

    titleH3.textContent = movie.Title;
    titleH3.title = movie.Title;
    typeSpan.textContent = movie.Type;

    if (isDetailedView) {
      cardWrapper.className =
        'flex flex-col md:flex-row bg-slate-800/90 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 p-2 gap-6';

      const posterContainer = posterImg.parentElement;
      posterContainer.className =
        'w-full md:w-64 h-96 md:h-auto shrink-0 overflow-hidden rounded-lg bg-slate-950 flex items-center justify-center';

      yearSpan.textContent = movie.imdbRating
        ? `📅 ${movie.Year} | ⭐ ${movie.imdbRating}`
        : `📅 ${movie.Year}`;
      titleH3.insertAdjacentHTML(
        'afterend',
        `
        <div class="flex flex-col gap-3 my-2 text-sm text-gray-300">
          <p class="text-xs text-lime-400 uppercase tracking-wider font-semibold">🎭 Genre: ${movie.Genre || 'N/A'}</p>
          <p class="italic bg-slate-900/40 p-3 rounded-md border border-slate-700/30 line-clamp-none">${movie.Plot}</p>
          <p class="text-xs text-gray-400">👥 Actors: <span class="text-gray-200">${movie.Actors || 'N/A'}</span></p>
        </div>
        `,
      );
    } else {
      yearSpan.textContent = `${movie.Year}`;
      cardWrapper.classList.add('cursor-pointer');

      cardWrapper.addEventListener('click', async () => {
        container.innerHTML = `<p class="text-xl text-yellow-400 animate-pulse text-center col-span-full">Loading details...</p>`;
        const { data: detailedMovie, error } = await movieApiRequest(movie.imdbID, true);
        if (!error) renderMoviesCards(detailedMovie);
      });
    }

    container.appendChild(cardClone);
  });
}

movieForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  console.log('Form submited with query:', query);

  if (query.length >= 3) {
    container.innerHTML =
      '<p class="text-xl text-yellow-400 animate-pulse text-center col-span-full">Searching...</p>';
    const { data: movies, error } = await movieApiRequest(query);

    if (error) {
      container.innerHTML = `<p class="text-red-400">❌ Error: ${error}</p>`;
    } else {
      renderMoviesCards(movies);
      suggestionsContainer.classList.add('hidden');
    }
  } else {
    container.innerHTML = `
      <div class="col-span-full text-center py-6 bg-amber-500/20 border border-amber-500/30 rounded-lg">
        <p class="text-amber-400 font-medium">⚠️ Please enter at least 3 characters for the search query.</p>
      </div>
    `;
  }
});

document.addEventListener('click', (event) => {
  if (!movieForm.contains(event.target)) {
    suggestionsContainer.classList.add('hidden');
  }
});
