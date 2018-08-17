import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Movie from "./Movie";
import { getMovies } from "./actions";

class MoviesList extends PureComponent {
  async componentDidMount() {
    const { getMovies, isLoaded, moviesLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    const timeSinceMoviesPreviouslyLoaded =
      (new Date() - new Date(moviesLoadedAt)) / 1000;
    console.log(`${timeSinceMoviesPreviouslyLoaded}/${oneHour / 1000}`);
    if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
      getMovies();
    }
    // this.props.getMovies(); //(same thing)
  }

  render() {
    const { movies, isLoaded, moviesLoadedAt } = this.props;
    if (!isLoaded) return <h1>Loading</h1>;
    else {
      return (
        <MovieGrid>
          {movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </MovieGrid>
      );
    }
  }
}

// get props out of here
const mapStateToProps = state => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
  moviesLoadedAt: state.movies.moviesLoadedAt
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovies
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
