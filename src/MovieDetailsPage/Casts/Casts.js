import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import trendingFilms from '../../services/filmsApi';
import CastsItem from './CastsItem/CastsItem';
import cutList from '../../utils/cutLongArray';

const CastsList = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

class Cats extends Component {
  state = {
    casts: '',
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.detailsId;

    trendingFilms
      .getCurrentMovieCasts(id)
      .then(casts => {
        const cuttedCasts = cutList(casts);
        return this.setState({ casts: cuttedCasts });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { casts, error, isLoading } = this.state;
    return (
      <>
        <div>
          <h2>Casts</h2>
          {error && <p>Whoops, something went wrong: {error.message}</p>}
          {isLoading && <p>Loading</p>}
          {casts.length > 0 && (
            <CastsList>
              {casts.map(({ id, character, name, profile_path }) => (
                <CastsItem
                  key={id}
                  character={character}
                  name={name}
                  profile_path={profile_path}
                />
              ))}
            </CastsList>
          )}
        </div>
      </>
    );
  }
}

Cats.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Cats;
