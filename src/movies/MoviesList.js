import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Movie from "./Movie";
import { getMovies } from "./actions";
import { BrowserRouter as Router, Link } from "react-router-dom";

class MoviesList extends Component {
  async componentDidMount() {
    const {
      getMovies,
      match,
      isLoaded,
      moviesLoadedAt,
      totalPages
    } = this.props;
    const oneHour = 60 * 60 * 1000;
    // const oneHour = 1000;
    const timeSinceMoviesPreviouslyLoaded =
      (new Date() - new Date(moviesLoadedAt)) / 1000;
    console.log(`${timeSinceMoviesPreviouslyLoaded}/${oneHour / 1000}`);

    // if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
    getMovies(match.params.id);
    // }
  }

  nextPages = currentPage => {
    let pages = [];
    for (
      let i = parseInt(eval(currentPage) + 1);
      i < parseInt(eval(currentPage) + 11);
      i++
    ) {
      pages.push(
        <Link to={`/page/${i}`} key={i}>
          {i}
        </Link>
      );
    }
    return pages;
  };

  render() {
    const { movies, isLoaded, totalPages, match } = this.props;

    let currentPage = match.params.id;
    if (!match.params.id) {
      currentPage = 1;
    }

    if (!isLoaded) return <h1>Loading</h1>;
    else {
      return (
        <div>
          <MovieGrid>
            {movies.map(movie => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
          {this.nextPages(currentPage)}
        </div>
      );
    }
  }
}

// get props out of here
const mapStateToProps = state => ({
  movies: state.movies.movies,
  totalPages: state.movies.total_pages,
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
