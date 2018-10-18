// import {Component} from "react";
import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import React, { Component}  from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import uuidv1 from "uuid/v1";
import Movieitem from "./movie/movieitem";
import {bindActionCreators} from "redux";
import {addMovie, removeMovie, updateCurrentMovie, updateMovie, updateMovieList} from "../../actions/actions";
import connect from "react-redux/es/connect/connect";



class MoviesList extends Component {

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
        this.updateCurrentMovie=this.updateCurrentMovie.bind(this)
        this.updateMovieId=this.updateMovieId.bind(this)
    }

    renderList() {

        return this.props.movies.map((movie,i) => {

            return (
               <Movieitem
                   movie={movie}
                   i={i}
                   updateCurrentMovie={this.updateCurrentMovie}
                   updateMovieId={this.updateMovieId}
                   openDelete={this.openDelete}
                   openEdit={this.openEdit}
               />
            );
        });
    }

    updateCurrentMovie(currentMovie){
        this.setState({currentMovie});
    }
    updateMovieId(id){
        this.setState({id});

    }

    closeEdit  =()=> {
        this.setState({ showEditModal: false });
    }
    openEdit =()=> {
        this.setState({ showEditModal: true});
    }

    closeDelete =()=> {
        this.setState({ showDeleteModal: false });
    }
    openDelete =()=>{
        this.setState({ showDeleteModal: true });
    }

    closeAdd =()=>{
        this.setState({ showAddModal: false });
    }
    openAdd =()=>{
        this.setState({ showAddModal: true });
    }

    editMovie(id = this.state.currentMovie.id,
              Title = this.state.currentMovie.Title,
              Year = this.state.currentMovie.Year,
              Runtime = this.state.currentMovie.Runtime,
              Director = this.state.currentMovie.Director,
              Genre = this.state.currentMovie.Genre,
              Poster = this.state.currentMovie.Poster) {
        this.props.updateMovie({id, Title, Year, Runtime, Director, Genre, Poster});
    }

    addNewMovie(newMovie){
        this.props.addMovie(newMovie);
        this.closeAdd();
    }


    render() {

        const modalStyle = {
            position: 'fixed',
            zIndex: 1040,
            top: 0, bottom: 0, left: 0, right: 0
        };

        const backdropStyle = {
            ...modalStyle,
            zIndex: 'auto',
            backgroundColor: '#000',
            opacity: 0.5
        };


        const dialogStyle = function() {
            let top = 50
            let left = 50

            return {
                position: 'absolute',
                width: 400,
                top: top + '%', left: left + '%',
                transform: `translate(-${top}%, 0%)`,
                border: '1px solid #e5e5e5',
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,.5)',
                padding: 20
            };
        };

        let title;
        let _runtime;
        let director;
        let genere;
        let year;


        return (

            <div>

                <div style={{marginBottom:'40px',marginTop:'20px',}} onClick={e=>{
                    e.preventDefault()
                    this.setState({showAddModal:true})

                }}>
                    <FontAwesomeIcon icon="plus-square" /> Add Movie
                </div>

            <ListGroup>

                {this.renderList()}
            </ListGroup>





                    <Modal
                        aria-labelledby='modal-label'
                        style={modalStyle}
                        backdropStyle={backdropStyle}
                        show={this.state.showAddModal}
                        onHide={this.closeAdd}
                    >
                        <div style={dialogStyle()} >
                            <h4 id='modal-label'>Movie Details:</h4>

                            <form >

                                <div className={'modalForm'}>
                                    <label className={'labelSpace'}>Title:</label>
                                    <input required={true} type={'text'}
                                           onBlur={(e)=>
                                           {this.setState({newMovie: {
                                                   ...this.state.newMovie,
                                                   Title: e.target.value}})}

                                           }></input>
                                </div>
                                <div className={'fieldsSpace'}>
                                    <label className={'labelSpace'}>Year:</label>
                                    <input required={true} type={'text'}
                                           onBlur={(e)=> {this.setState({newMovie: {
                                                   ...this.state.newMovie,
                                                   Year: e.target.value}})}}
                                    ></input>
                                </div>
                                <div className={'fieldsSpace'}>
                                    <label className={'labelSpace'}>Runtime:</label>
                                    <input required={true} type={'text'}
                                           onBlur={(e)=> {this.setState({newMovie: {
                                                   ...this.state.newMovie,
                                                   Runtime: e.target.value}})}}
                                    ></input>
                                </div>
                                <div className={'fieldsSpace'}>
                                    <label className={'labelSpace'}>Director:</label>
                                    <input required={true} type={'text'}
                                           onBlur={(e)=> {this.setState({newMovie: {
                                                   ...this.state.newMovie,
                                                   Director: e.target.value}})}}
                                    ></input>
                                </div>
                                <div>
                                    <label className={'labelSpace'}>Genre:</label>
                                    <input required={true} type={'text'}
                                           onBlur={(e)=> {this.setState({newMovie: {
                                                   ...this.state.newMovie,
                                                   Genre: e.target.value}})}}
                                    ></input>
                                    <div className={'btnSpace'}>
                                        <Button className={'labelSpace'} onClick={(e)=>{
                                            e.preventDefault();
                                            this.addNewMovie(this.state.newMovie);
                                        }}>Add Movie</Button>
                                        <Button onClick={(e)=>{
                                            this.closeAdd();
                                        }}>Cancel</Button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </Modal>

                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.showEditModal}
                    onHide={this.closeEdit}
                >
                    <div style={dialogStyle()} >
                        <h4 id='modal-label'>Movie details:</h4>
                        <form >

                            <div className={'modalForm'}>
                                <label className={'labelSpace'}>Title:</label>
                                <input type={'text'} defaultValue={this.state.currentMovie.Title}
                                       onBlur={(e)=> {
                                           title = e.target.value
                                       }
                                       }></input>
                            </div>
                            <div className={'fieldsSpace'}>
                                <label className={'labelSpace'}>Year:</label>
                                <input type={'text'} defaultValue={this.state.currentMovie.Year}
                                       onBlur={(e)=> {year = e.target.value}}
                                ></input>
                            </div>
                            <div className={'fieldsSpace'}>
                                <label className={'labelSpace'}>Runtime:</label>
                                <input type={'text'} defaultValue={this.state.currentMovie.Runtime}
                                       onBlur={(e)=> { _runtime = e.target.value }}
                                ></input>
                            </div>
                            <div className={'fieldsSpace'}>
                                <label className={'labelSpace'}>Director:</label>
                                <input type={'text'} defaultValue={this.state.currentMovie.Director}
                                       onBlur={(e)=> { director = e.target.value }}
                                ></input>
                            </div>
                            <div>
                                <label className={'labelSpace'}>Genre:</label>
                                <input type={'text'} defaultValue={this.state.currentMovie.Genre}
                                       onBlur={(e)=> { genere = e.target.value}}
                                ></input>
                                <div className={'btnSpace'}>
                                    <Button className={'labelSpace'}
                                            onClick={e=>{
                                                e.preventDefault();
                                                this.editMovie(this.state.currentMovie.id, title, year, _runtime, director, genere);
                                                this.closeEdit();
                                            }
                                            }
                                    >Save</Button>
                                    <Button onClick={(e)=>{
                                        this.closeEdit();
                                    }}>Cancel</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal>

                <Modal
                    aria-labelledby='modal-label'
                    style={modalStyle}
                    backdropStyle={backdropStyle}
                    show={this.state.showDeleteModal}
                    onHide={this.closeDelete}
                >
                    <div style={dialogStyle()} >
                        <h4 id='modal-label'>Are you sure you want to delete this movie?</h4>

                        <div className={'btnSpace'}>
                            <Button className={'labelSpace'} onClick={(e)=>{
                                e.preventDefault();
                                this.props.removeMovie(this.state.id);
                                this.closeDelete();
                            }}>Delete </Button>
                            <Button  onClick={(e)=>{
                                e.preventDefault();
                                this.setState({showDeleteModal:false}
                                )
                            }
                            }>Cancel</Button>
                        </div>
                    </div>
                </Modal>


                </div>
        )
    }



}
function mapDispatchToProps(dispatch) {
    return {
        // actions:
        updateCurrentMovie: bindActionCreators(updateCurrentMovie, dispatch),
        updateMovie: bindActionCreators(updateMovie, dispatch),
        removeMovie: bindActionCreators(removeMovie, dispatch),
        addMovie: bindActionCreators(addMovie, dispatch),
    };
}

export default connect( mapDispatchToProps)(MoviesList);
