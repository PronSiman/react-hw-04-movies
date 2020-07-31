import React, { Suspense, lazy } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from './NotFound/NotFound';
import MovieDetailsPage from './MovieDetailsPage/MovieDetailsPage';
import routes from './routes';

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));

const MenuUl = styled.ul`
  display: flex;
  list-style: none;
`;

const MenuLi = styled.li`
  padding-left: 16px;
  padding-right: 16px;
  &:hover {
    cursor: pointer;
  }
  .active {
    color: red;
  }
`;

const App = () => {
  const { home, movies, details } = routes;
  return (
    <>
      <MenuUl>
        <MenuLi>
          <NavLink exact to={home} activeClassName="active">
            Home
          </NavLink>
        </MenuLi>
        <MenuLi>
          <NavLink to={movies} activeClassName="active">
            Movies
          </NavLink>
        </MenuLi>
      </MenuUl>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path={home} exact component={Home} />
          <Route path={movies} exact component={Movies} />
          <Route path={details} component={MovieDetailsPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
};
export default App;
