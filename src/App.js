import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';
import './App.css';
import {updateMovieList} from './actions/actions'
import {updateCurrentMovie} from './actions/actions'
import {updateMovie} from './actions/actions'
import {removeMovie} from './actions/actions'
import {addMovie} from './actions/actions'
import {Modal,ListGroup,ListGroupItem, Button} from 'react-bootstrap';
import uuidv1 from 'uuid/v1';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit,faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './styles.css';
import MoviesList from './components/movies/moviesList'

library.add(faTrash)
library.add(faEdit)
library.add(faPlusSquare)

const fetchCall = (url) => {
    return fetch(url)
        .then(res => res.json());
};

class App extends Component {

    constructor() {
        super();
        this.state = {
            showEditModal: false,
            showDeleteModal: false,
            showAddModal: false,
            newMovie: {id: uuidv1()},
            id: null,
            currentMovie: {}
        }
    }

    componentDidMount() {
        fetch("https://www.omdbapi.com/?s=batman&apikey=ebfb52b7")
            .then(res => res.json())
            .then(
                (result) => {
                    const { Search } = result;
                    const calls = [];
                    Search.forEach(item => {
                        calls.push(fetchCall(`https://www.omdbapi.com/?i=${item.imdbID}&apikey=ebfb52b7`));
                    });
                    Promise.all(calls)
                        .then(movies => this.props.updateMovieList(movies)
                        ).catch(err => console.log(err));
                }
            )
    }

    render() {

        return (
            <div className="App">

            {this.props.movies.length > 0 &&

                    <MoviesList
                        movies={this.props.movies}
                    />
                }
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        movies: state.search.movies,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions:
        updateMovieList: bindActionCreators(updateMovieList, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


