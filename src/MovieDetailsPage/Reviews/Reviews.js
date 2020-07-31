import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';
import trendingFilms from '../../services/filmsApi';
import ReviewsItem from './ReviewsItem/ReviewsItem';
import cutList from '../../utils/cutLongArray';

const ReviewsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

class Reviews extends Component {
  state = {
    reviews: '',
    error: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.detailsId;
    trendingFilms
      .getCurrenReviews(id)
      .then(reviews => {
        const cuttedReviews = cutList(reviews);
        return this.setState({ reviews: cuttedReviews });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { reviews, error, isLoading } = this.state;

    return (
      <>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading</p>}
        {reviews.length > 0 ? (
          <div>
            <h2>Last reviews</h2>

            <ReviewsList>
              {reviews.map(({ id, author, content }) => (
                <ReviewsItem key={id} author={author} content={content} />
              ))}
            </ReviewsList>
          </div>
        ) : (
          <p>No reviews yet</p>
        )}
      </>
    );
  }
}

Reviews.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Reviews;
