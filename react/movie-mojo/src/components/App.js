import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Movie from './Movie';
import AddMovie from './AddMovie';
import { initialMovies } from '../movies';
import { additionalMovies } from '../movies';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: initialMovies
    };

    this.loadAdditionalMovies = this.loadAdditionalMovies.bind(this);
    this.addMovieToGallery = this.addMovieToGallery.bind(this);
  }
  loadAdditionalMovies() {
    let currentMovies = { ...this.state.movies };
    let newMovies = Object.assign(currentMovies, additionalMovies);

    this.setState({ movies: newMovies });
  }
  addMovieToGallery(movie) {
    let ts = Date.now();
    let newMovie = {};
    newMovie['movie' + ts] = movie;
    let currentMovies = { ...this.state.movies };
    let newMovies = Object.assign(currentMovies, newMovie);
    this.setState({ movies: newMovies });
  }
  render() {
    return (
      <div className="App">
        <Header text="Leo's Movie Mojo App!" />
        <p className="App-intro">Welcome to the 'Movie Mojo' React app!</p>
        <div className="movies">
          {Object.keys(this.state.movies).map(key => (
            <Movie key={key} meta={this.state.movies[key]} />
          ))}
        </div>
        <div className="add-movies">
          <button onClick={this.loadAdditionalMovies}>Load more...</button>
        </div>
        <AddMovie addMovie={this.addMovieToGallery} />
      </div>
    );
  }
}

export default App;
