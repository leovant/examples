import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div className="movie">
        <h2>{this.props.meta.title}</h2>
        <div>
          <img width="200" src={this.props.meta.poster} />
        </div>
        <p>({this.props.meta.year})</p>
        <p>{this.props.meta.description}</p>
      </div>
    );
  }
}

export default Movie;
