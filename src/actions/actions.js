export const updateMovieList = (movies) => {
    return {
        type: 'updateMovieList',
        payload: movies
    }
};

export const updateCurrentMovie = (movie) => {
    return {
        type: 'updateCurrentMovie',
        payload: movie
    }
};


export const updateMovie = (movie) => {
    return {
        type: 'updateMovie',
        payload: movie
    }
};



export const removeMovie = (id) => {
    return {
        type: 'removeMovie',
        payload: id
    }
};


export const addMovie = (movie) => {
    return {
        type: 'addMovie',
        payload: movie
    }
};