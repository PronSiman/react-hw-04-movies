import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchSubmitBtn = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const SerarxhBarWrapper = styled.div`
  margin-bottom: 25px;
`;

const INITAL_STATE = {
  searchQuery: '',
};

class Searchbar extends Component {
  static defaultProps = {
    setSearchQuery: () => {},
  };

  state = {
    ...INITAL_STATE,
  };

  handelChange = ({ target }) => {
    const { value } = target;
    this.setState({ searchQuery: value });
  };

  formSubmit = e => {
    const { searchQuery } = this.state;
    const { setSearchQuery } = this.props;
    e.preventDefault();
    setSearchQuery(searchQuery);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITAL_STATE });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SerarxhBarWrapper>
        <form onSubmit={this.formSubmit}>
          <input
            type="text"
            placeholder="Search for movies"
            value={searchQuery}
            onChange={this.handelChange}
          />
          <SearchSubmitBtn type="submit">
            <span>Search</span>
          </SearchSubmitBtn>
        </form>
      </SerarxhBarWrapper>
    );
  }
}
Searchbar.defaultProps = {
  setSearchQuery: '',
};
Searchbar.propTypes = {
  setSearchQuery: PropTypes.func,
};
export default Searchbar;
