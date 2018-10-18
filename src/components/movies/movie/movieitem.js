// import {Component} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import React, { Component}  from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import uuidv1 from "uuid/v1";



export default  class Movieitem extends Component {

    constructor() {
        super();
        this.state = {

        }
    }


    render() {
        return (

            <div>

                <ListGroupItem style={{height:'60px'}}
                               key={'user'+this.props.i}>
                    <span className={'liFields'} ><img width='20px'  src={this.props.movie.Poster} /></span>
                    <span className={'liFields'}>{this.props.movie.Title}</span>
                    <span className={'liFields'}> {this.props.movie.Year}</span>
                    <span className={'liFields'}> {this.props.movie.Runtime}</span>
                    <span className={'liFields'}> {this.props.movie.Director}</span>
                    <span className={'liFields'}> {this.props.movie.Genre}</span>
                    <div style={{display:'inline'}} onClick={e=>{
                        // this.setState({currentMovie: this.props.movie});
                        this.props.updateCurrentMovie(this.props.movie)
                        this.props.openEdit();
                    }
                    }>
                        <FontAwesomeIcon style={{float:'right'}} icon="edit" />
                    </div>

                    <div style={{display:'inline'}} onClick={e => {
                        // this.setState({id: this.props.movie.id});
                        this.props.updateMovieId(this.props.movie.id)
                        this.props.openDelete();
                    }

                    }> <FontAwesomeIcon style={{float:'right', marginRight:'10px'}} icon="trash" />
                    </div>
                </ListGroupItem>

            </div>
        )
    }



}

