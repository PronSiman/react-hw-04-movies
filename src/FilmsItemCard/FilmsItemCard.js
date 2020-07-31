import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import routes from '../routes';
import Filmposter from '../static-images/film-poster.jpg';

const FilmCard = styled.li`
  width: 200px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  &:hover {
    -webkit-box-shadow: 0px -2px 9px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px -2px 9px -1px rgba(0, 0, 0, 0.75);
    box-shadow: 0px -2px 9px -1px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
  .FilmCardLink {
    text-decoration: none;
  }
`;

const FilmTitle = styled.h3`
  margin-bottom: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 200px;
  color: #000;
`;
const FilmPoster = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  margin-bottom: 16px;
`;

const ReliseDate = styled.span`
  color: blue;
`;

const FilmsItemCard = ({
  title,
  originalTitle,
  name,
  originalName,
  releaseDate,
  firstAirDate,
  posterPath,
  id,
  location,
}) => {
  return (
    <FilmCard>
      <NavLink
        to={{
          pathname: `${routes.movies}/${id}`,
          state: { from: location },
        }}
        className="FilmCardLink"
      >
        <FilmTitle>{title || originalTitle || name || originalName}</FilmTitle>
        <FilmPoster
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : Filmposter
          }
        />
        <ReliseDate>
          {releaseDate
            ? `Release date: ${releaseDate}`
            : `First Air date: ${firstAirDate}`}
        </ReliseDate>
      </NavLink>
    </FilmCard>
  );
};
FilmsItemCard.defaultProps = {
  title: '',
  originalTitle: '',
  name: '',
  originalName: '',
  releaseDate: '',
  firstAirDate: '',
  posterPath: '',
  location: {},
};
FilmsItemCard.propTypes = {
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  name: PropTypes.string,
  originalName: PropTypes.string,
  releaseDate: PropTypes.string,
  firstAirDate: PropTypes.string,
  posterPath: PropTypes.string,
  id: PropTypes.number.isRequired,
  location: PropTypes.objectOf(PropTypes.any),
};

export default FilmsItemCard;
