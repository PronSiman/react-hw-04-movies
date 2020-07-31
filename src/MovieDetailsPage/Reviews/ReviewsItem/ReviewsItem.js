import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

const ReviewsItem = ({ author, content }) => {
  return (
    <>
      <h3>
        <i>by</i> {author}
      </h3>
      <p>{content}</p>
    </>
  );
};

ReviewsItem.defaultProps = {
  author: '',
  content: '',
};

ReviewsItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
};

export default ReviewsItem;
