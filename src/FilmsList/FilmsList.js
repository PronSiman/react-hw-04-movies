import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FilmsItemCard from '../FilmsItemCard/FilmsItemCard';

const FilmsListUl = styled.ul`
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FilmsList = ({ films, location }) => {
  return (
    <FilmsListUl>
      {films.map(
        ({
          id,
          title,
          originalTitle,
          name,
          originalName,
          release_date,
          first_air_date,
          poster_path,
        }) => (
          <FilmsItemCard
            key={id}
            title={title}
            originalTitle={originalTitle}
            name={name}
            originalName={originalName}
            release_date={release_date}
            first_air_date={first_air_date}
            posterPath={poster_path}
            id={id}
            location={location}
          />
        ),
      )}
    </FilmsListUl>
  );
};
FilmsList.defaultProps = {
  location: {},
};
FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

export default FilmsList;
