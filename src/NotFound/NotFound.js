import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SpanTitle = styled.span`
  display: block;
  font-size: 56px;
  text-align: center;
  margin-top: 150px;
  margin-bottom: 15px;
`;

const SpanDescr = styled.span`
  display: block;
  font-size: 20px;
  text-align: center;
`;

const NotFound = () => {
  return (
    <>
      <SpanTitle>404</SpanTitle>
      <SpanDescr>
        It seems your got lost{' '}
        <NavLink to="/">Click here to back home-page</NavLink>{' '}
      </SpanDescr>
    </>
  );
};

export default NotFound;
