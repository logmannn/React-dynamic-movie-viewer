import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Movie from './Movie';
import { getMovies } from './actions';

class MoviesList extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;

    this.state = {
      currentPage: match.id,
    };
  }

  async componentDidMount() {
    const {
      getMovies,
      match,
      moviesLoadedAt,
      // isLoaded,
      // totalPages
    } = this.props;

    // if (match.id == null) {
    //   this.setState({
    //     currentPage: 1
    //   });
    // } else {
    this.setState({
      currentPage: match.id,
    });
    // }

    const oneHour = 60 * 60 * 1000;
    // const oneHour = 1000;
    const timeSinceMoviesPreviouslyLoaded = (new Date() - new Date(moviesLoadedAt)) / 1000;
    console.log(`${timeSinceMoviesPreviouslyLoaded}/${oneHour / 1000}`);

    // if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
    // console.log(match.params.id);
    getMovies(match.params.id);
    // }
  }

  async componentDidUpdate() {
    const { match, getMovies } = this.props;
    const { currentPage } = this.state;
    if (match.params.id !== currentPage) {
      this.setState({
        currentPage: match.params.id,
      });
      getMovies(match.params.id);
    }
  }

  nextPages = (currentPage) => {
    const pages = [];
    const current = parseInt(currentPage, 10);
    let amountOfNumbers = 0;
    const maxListed = 10;

    if (current > 0) {
      // get up to 5 before it
      for (let i = parseInt(current - 5, 10); i < parseInt(current, 10); i += 1) {
        if (i > 0) {
          pages.push(
            <Link to={`/page/${i}`} key={i}>
              {i}
            </Link>,
          );
          amountOfNumbers += 1;
        }
      }
    }

    for (let i = parseInt(current, 10); i < parseInt(eval(current + 5), 10); i += 1) {
      if (i === current) {
        pages.push(<CurrentPageLink key={i}>{i}</CurrentPageLink>);
      } else if (i <= 1000) {
        pages.push(
          <Link to={`/page/${i}`} key={i}>
            {i}
          </Link>,
        );
      }
      amountOfNumbers += 1;
    }

    if (amountOfNumbers < maxListed) {
      for (let i = amountOfNumbers + 1; i < maxListed + 1; i += 1) {
        pages.push(
          <Link to={`/page/${i}`} key={i}>
            {i}
          </Link>,
        );
      }
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
          <PageNav>{this.nextPages(currentPage)}</PageNav>
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
      pure: false
    }
  )(MoviesList)
);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;

const CurrentPageLink = styled.span`
  color: red;
`;

const PageNav = styled.div`
  > a {
    color: white;
    padding: 5px;
    text-decoration: none;
  }
  span {
    padding: 5px;
  }
`;

MoviesList.propTypes = {
  currentPage: PropTypes.string,
  match: PropTypes.string,
};
