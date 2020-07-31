import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import trendingFilms from '../services/filmsApi';
import FilmsList from '../FilmsList/FilmsList';

const HomeWrapper = styled.div`
  width: 960px;
  margin: 50px auto;
`;
const HomeTitle = styled.h1`
  text-align: center;
`;

class Home extends Component {
  state = {
    isLoading: false,
    movies: [],
    error: null,
  };

  static defaultProps = {
    url: '/',
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    trendingFilms
      .getTrandingFilms('week')
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { match, location } = this.props;
    const { url } = match;

    const { movies, error, isLoading } = this.state;
    return (
      <HomeWrapper>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading</p>}
        {movies.length > 0 && (
          <>
            <HomeTitle>Trending video by week</HomeTitle>
            <FilmsList films={movies} matchUrl={url} location={location} />
          </>
        )}
      </HomeWrapper>
    );
  }
}

Home.propTypes = {
  url: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Home;
