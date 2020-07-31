import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import HeroEmptyAvatar from '../../../static-images/empty-avatar.jpg';

const CastListItem = styled.li`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const ActorPoster = styled.img`
  margin-right: 25px;
  display: block;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

const Name = styled.span``;
const CastsItem = ({ character, name, profile_path }) => {
  return (
    <CastListItem>
      <ActorPoster
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500${profile_path}`
            : HeroEmptyAvatar
        }
      />
      <Name>
        {name} as <b>{character}</b>
      </Name>
    </CastListItem>
  );
};
CastsItem.defaultProps = {
  character: '',
  name: '',
  profile_path: '',
};

CastsItem.propTypes = {
  character: PropTypes.string,
  name: PropTypes.string,
  profile_path: PropTypes.string,
};
export default CastsItem;
