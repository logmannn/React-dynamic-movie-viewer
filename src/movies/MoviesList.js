import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Movie from "./Movie";
import { getMovies } from "./actions";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.match.id,
      previousPage: ""
    };
  }

  async componentDidMount() {
    const {
      getMovies,
      match,
      isLoaded,
      moviesLoadedAt,
      totalPages
    } = this.props;

    // console.log("what is this" + match.id);

    // if (match.id == null) {
    //   this.setState({
    //     currentPage: 1
    //   });
    // } else {
    this.setState({
      currentPage: match.id
    });
    // }

    const oneHour = 60 * 60 * 1000;
    // const oneHour = 1000;
    const timeSinceMoviesPreviouslyLoaded =
      (new Date() - new Date(moviesLoadedAt)) / 1000;
    console.log(`${timeSinceMoviesPreviouslyLoaded}/${oneHour / 1000}`);

    // if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
    // console.log(match.params.id);
    console.log("componentDidMount" + match.params.id);
    getMovies(match.params.id);
    // }
  }

  async componentDidUpdate() {
    const { match, getMovies } = this.props;
    const { currentPage } = this.state;
    if (match.params.id !== currentPage) {
      console.log("match is not equal to currentpage");
      this.setState({
        currentPage: match.params.id
      });
      getMovies(match.params.id);
    }
  }

  nextPages = currentPage => {
    let pages = [];
    let current = parseInt(eval(currentPage));
    let amountOfNumbers = 0;
    let maxListed = 10;

    if (current > 0) {
      // get up to 5 before it
      for (let i = parseInt(current - 5); i < parseInt(current); i++) {
        if (i > 0) {
          pages.push(
            <Link to={`/page/${i}`} key={i}>
              {i}
            </Link>
          );
          amountOfNumbers++;
        }
      }
    }

    for (let i = parseInt(current); i < parseInt(eval(current + 5)); i++) {
      if (i == current) {
        pages.push(<CurrentPageLink key={i}>{i}</CurrentPageLink>);
      } else {
        pages.push(
          <Link to={`/page/${i}`} key={i}>
            {i}
          </Link>
        );
      }
      amountOfNumbers++;
    }

    if (amountOfNumbers < maxListed) {
      for (let i = amountOfNumbers + 1; i < maxListed + 1; i++) {
        pages.push(
          <Link to={`/page/${i}`} key={i}>
            {i}
          </Link>
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
