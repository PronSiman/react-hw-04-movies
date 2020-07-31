import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Searchbar from './Searchbar/Searchbar';
import trendingFilms from '../services/filmsApi';
import FilmsList from '../FilmsList/FilmsList';
import getQueryParams from '../utils/getQueryParams';

const MovieWrapper = styled.div`
  width: 960px;
  margin: 50px auto;
`;
const MovieTitle = styled.h1`
  text-align: center;
`;

class Movies extends Component {
  state = {
    isLoading: false,
    error: null,
    movies: [],
    // query: '',
  };

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    const { query } = getQueryParams(search);
    if (query) {
      this.fetchMoviesbyStringFromApi(query);
      return;
    }
    this.fetchTrandingMoviesApi();
  }

  componentDidUpdate(prevProps) {
    const { location: currentLocation } = this.props;
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(currentLocation.search);
    if (prevQuery !== nextQuery && nextQuery !== '') {
      this.fetchMoviesbyStringFromApi(nextQuery);
    }
  }

  fetchTrandingMoviesApi = () => {
    this.setState({ isLoading: true });
    trendingFilms
      .getTrandingFilms('day')
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  fetchMoviesbyStringFromApi = query => {
    this.setState({ isLoading: true });
    trendingFilms
      .searchMoviesByQuery(query)
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  setSearchQuery = query => {
    const { location, history } = this.props;
    if (query) {
      history.push({
        pathname: location.pathname,
        search: `query=${query}`,
      });
    }
  };

  render() {
    const { movies, error, isLoading } = this.state;
    const { match, location } = this.props;
    const { url } = match;
    const { query } = getQueryParams(location.search);

    return (
      <MovieWrapper>
        <Searchbar setSearchQuery={this.setSearchQuery} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading</p>}
        {movies.length > 0 && (
          <>
            <MovieTitle>
              Trending video by {query ? `${query}` : `day`}
            </MovieTitle>
            <FilmsList films={movies} matchUrl={url} location={location} />
          </>
        )}
        {movies.length === 0 && <p>Error request, please try again</p>}
      </MovieWrapper>
    );
  }
}

Movies.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Movies;
