import uuidv1 from "uuid/v1";

const initState={
    movies:[],
};
//
export default function searchReducer(state = initState, action) {
    switch (action.type) {

        case 'updateMovieList':
            const movies = action.payload.map((movie)=> { //uuid lib
                return {
                    id : uuidv1(),
                    Title: movie.Title,
                    Year: movie.Year,
                    Director: movie.Director,
                    Genre: movie.Genre,
                    Runtime: movie.Runtime,
                    Poster: movie.Poster || ''
                }
            });
            return {movies: movies};
        case 'addMovie':
            const updatedMovies = [...state.movies, action.payload];

            return {movies: updatedMovies};
        case 'removeMovie':
            const filtered = state.movies.filter(movie => movie.id !== action.payload);

            return {movies: filtered};
        case 'updateMovie':
            const updatedMovieList = state.movies.map(movie => {

                if (movie.id === action.payload.id) {
                    movie = action.payload;
                }
                return movie;
            });
            return {movies: updatedMovieList};
           default:
            return state;
    }
}