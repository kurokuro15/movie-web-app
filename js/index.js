API_KEY = 'feb27a44fdb3056b191e3cd76efd1f10'
API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es`
IMAGE_BASE = `https://image.tmdb.org/t/p/w500`

// clase para manejar la busqueda de peliculas
class Search {
  constructor(query) {
    this.query = query
  }

  async getResults() {
    const res = await fetch(`${API_URL}&query=${this.query}`)
    console.log(res)
    const data = await res.json()
    console.log(data)
    this.results = data.results
    return this.results
  }
}

// clase para manipular interface
class UI {
  constructor() {
    this.results = document.querySelector('.results')
  }

  displayResults(results) {
    this.results.innerHTML = results.map(movie => {
      return `
        <article>
          <h2>${movie.title}</h2>
          <img src="${IMAGE_BASE + movie.poster_path}" alt="${movie.title}">
          <p>${movie.overview}</p>
          <p>${movie.release_date}</p>
        </article>
      `
    }).join('')
  }
}

// implementar clase UI
const ui = new UI()
document.querySelector("input").addEventListener('keyup', e => {
  const search = new Search(e.target.value)
  search.getResults().then(results => {
    ui.displayResults(results)
  })
})

