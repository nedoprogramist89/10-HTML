class Movie {
    constructor(id, title, director, year) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.year = year;
    }
}

class MovieManager {
    constructor() {
        this.movies = [];
        this.currentId = 0;
    }

    addMovie(title, director, year) {
        const movie = new Movie(this.currentId++, title, director, year);
        this.movies.push(movie);
        this.render();
    }

    updateMovie(id, title, director, year) {
        const movie = this.movies.find(movie => movie.id == id);
        if (movie) {
            movie.title = title;
            movie.director = director;
            movie.year = year;
            this.render();
        }
    }

    deleteMovie(id) {
        this.movies = this.movies.filter(movie => movie.id != id);
        this.render();
    }

    render() {
        const movieContainer = document.getElementById('movies');
        movieContainer.innerHTML = '';
        this.movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'col-md-4';
            movieCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">Режиссер: ${movie.director}</p>
                        <p class="card-text">Год: ${movie.year}</p>
                        <button class="btn btn-primary" onclick="editMovie(${movie.id})">Изменить</button>
                        <button class="btn btn-danger" onclick="deleteMovie(${movie.id})">Удалить</button>
                    </div>
                </div>
            `;
            movieContainer.appendChild(movieCard);
        });
    }
}

const movieManager = new MovieManager();

document.getElementById('movieForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('movieId').value;
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    if (id) {
        movieManager.updateMovie(id, title, director, year);
    } else {
        movieManager.addMovie(title, director, year);
    }

    hideModal('movieModal');
    document.getElementById('movieForm').reset();
    document.getElementById('movieId').value = '';
});

document.getElementById('addMovieButton').addEventListener('click', function () {
    showModal('movieModal');
});

function editMovie(id) {
    const movie = movieManager.movies.find(movie => movie.id == id);
    if (movie) {
        document.getElementById('movieId').value = movie.id;
        document.getElementById('title').value = movie.title;
        document.getElementById('director').value = movie.director;
        document.getElementById('year').value = movie.year;
        showModal('movieModal');
    }
}

function deleteMovie(id) {
    movieManager.deleteMovie(id);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById('modalBackdrop');
    modal.style.display = 'block';
    backdrop.style.display = 'block';
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const backdrop = document.getElementById('modalBackdrop');
    modal.style.display = 'none';
    backdrop.style.display = 'none';
}
