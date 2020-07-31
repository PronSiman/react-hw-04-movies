import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import currentFilm from '../services/filmsApi';
import Cats from './Casts/Casts';
import Reviews from './Reviews/Reviews';
import routes from '../routes';

const MovieDetailsPageWrapper = styled.div`
  padding: 30px;
`;
const MovieDetailsPageWrapperTop = styled.div`
  display: flex;
`;
const MovieDetailsPageAdditional = styled.div``;
const FilmPoster = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  display: block;
  margin-bottom: 16px;
  margin-right: 30px;
`;
const FilmDescrWrapper = styled.div``;
const FilmTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 30px;
`;
const UsersPopularuty = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 15px;
`;
const OverviewTitle = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
`;
const GenresList = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  li {
    margin-right: 15px;
  }
`;

const OverviewDescr = styled.span`
  display: block;
  margin-bottom: 20px;
`;

const AdittionalList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`;
const AdittionalItem = styled.li`
  display: inline;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const BackButton = styled.button`
  margin-bottom: 20px;
`;

class MovieDetailsPage extends Component {
  state = {
    isLoading: false,
    filmData: '',
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.detailsId;

    this.setState({ isLoading: true });
    currentFilm
      .getCurrentMovie(id)
      .then(filmData => this.setState({ filmData }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  // getSnapshotBeforeUpdate(prevProps){
  //   const { location: prevLocation } = prevProps;
  //   const { state: prevLocationState } = prevLocation;
  //   const { from: prevFrom } = prevLocationState;
  //   if (prevLocationState && prevFrom) {
  //    this.props.location.state.from = prevFrom;
  //    console.log(this.props);
  //    return undefined;
  //   }
  //   return undefined;
  // }

  backButtonHeadler = () => {
    const { location, history } = this.props;
    const { state } = location;
    const { from } = state;
    if (state && from) {
      history.push(from);
      return;
    }
    history.push(routes.movies);
  };

  render() {
    const { match } = this.props;
    const { location } = this.props;
    const { state: oldState } = location;
    const { from: oldForm } = oldState;

    const { filmData, error, isLoading } = this.state;
    const {
      poster_path,
      original_title,
      popularity,
      overview,
      genres,
    } = filmData;
    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading</p>}
        {filmData !== '' && (
          <MovieDetailsPageWrapper>
            <BackButton onClick={this.backButtonHeadler}>Back</BackButton>
            <MovieDetailsPageWrapperTop>
              <FilmPoster
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              />
              <FilmDescrWrapper>
                <FilmTitle>{original_title}</FilmTitle>
                <UsersPopularuty>Popularity: {popularity}</UsersPopularuty>
                <OverviewTitle>Overview:</OverviewTitle>
                <OverviewDescr>{overview}</OverviewDescr>
                <OverviewTitle>Genres:</OverviewTitle>
                <GenresList>
                  {genres &&
                    genres.length > 0 &&
                    genres.map(({ id, name }) => <li key={id}>{name}</li>)}
                </GenresList>
                <hr />
                <p>Adittional information:</p>
                <AdittionalList>
                  <AdittionalItem>
                    <NavLink
                      to={{
                        pathname: `${match.url}/casts`,
                        state: {
                          from: oldState && oldForm ? oldForm : undefined,
                        },
                      }}
                      // state: { from: this.props.location.state.from }
                    >
                      Casts
                    </NavLink>
                  </AdittionalItem>
                  <AdittionalItem>
                    <NavLink
                      to={{
                        pathname: `${match.url}/reviews`,
                        state: {
                          from: oldState && oldForm ? oldForm : undefined,
                        },
                      }}
                    >
                      Reviews
                    </NavLink>
                  </AdittionalItem>
                </AdittionalList>
                <hr />
              </FilmDescrWrapper>
            </MovieDetailsPageWrapperTop>
            <MovieDetailsPageAdditional>
              <Route path={`${match.path}/casts`} exact component={Cats} />
              <Route path={`${match.path}/reviews`} exact component={Reviews} />
            </MovieDetailsPageAdditional>
          </MovieDetailsPageWrapper>
        )}
      </>
    );
  }
}
MovieDetailsPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieDetailsPage;
