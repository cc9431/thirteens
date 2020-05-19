/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import { onSubmitPlayers } from './actions';
import makeSelectApp from './selectors';

import Button from '../../components/Button/Loadable';
import LandingPage from '../../components/LandingPage/Loadable';
import PlayerPage from '../../components/PlayerPage/Loadable';
import GamePage from '../../components/GamePage/Loadable';

const Wrapper = styled.div`
  background: #eecebf;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Back = styled(Button)`
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 10px;
  opacity: ${props => (props.page ? '1' : '0')};
  visibility: ${props => (props.page ? 'visible' : 'hidden')};
  transition: all 500ms ease;
`;

export function App({ submitPlayers, state }) {
  const { players } = state;
  useInjectReducer({ key: 'appStore', reducer });
  const [page, setPage] = useState(-1);
  useEffect(() => {
    nextPage();
  }, []);

  useEffect(() => {
    if (page === 2 && players.length === 0) setPage(0);
  }, [page]);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <Wrapper>
      <Helmet>
        <title>thirteens</title>
      </Helmet>
      <Back page={page} text="back" onClick={prevPage} />
      <>
        <LandingPage nextPage={nextPage} page={page} />
        <PlayerPage
          submitPlayers={newPlayers => submitPlayers(newPlayers)}
          nextPage={nextPage}
          page={page}
        />
        <GamePage players={players} page={page} />
      </>
    </Wrapper>
  );
}

App.propTypes = {
  state: PropTypes.object,
  submitPlayers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitPlayers: players => dispatch(onSubmitPlayers(players)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
