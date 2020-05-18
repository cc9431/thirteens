/* eslint-disable react/no-array-index-key */
/**
 *
 * PlayerPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import { onSubmitPlayers } from './actions';
import makeSelectPlayerPage from './selectors';
import reducer from './reducer';

import Input from '../../components/Input/Loadable';
import Button from '../../components/Button/Loadable';

const Wrapper = styled.div`
  background: #eecebf;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin: auto;
`;

const Row = styled.div`
  display: grid;
  grid-gap: inherit;
  grid-auto-flow: column;
`;

export function PlayerPage(props) {
  useInjectReducer({ key: 'playerPage', reducer });

  const [players, setPlayers] = useState(['', '', '', '', '']);
  const [show, setShow] = useState(2);

  const setPlayerName = (name, index) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const validateNames = () => {
    const gamePlayers = [];
    players.forEach((name, index) => {
      if (index <= show) gamePlayers.push(name || 'Unnamed Player');
    });
    props.submitPlayers(gamePlayers);
    props.redirectToGame();
  };

  return (
    <Wrapper>
      <Helmet>
        <title>thirteens</title>
      </Helmet>
      <GridWrapper>
        <GridWrapper>
          {players.map((player, index) => (
            <Input
              show={index <= show}
              key={index}
              onChange={name => setPlayerName(name, index)}
              value={player}
            />
          ))}
          <Row>
            <Button
              onClick={() => {
                if (show < 4) setShow(show + 1);
              }}
              text="add player"
            />
            <Button
              onClick={() => {
                if (show > 2) {
                  const newPlayers = [...players];
                  newPlayers[show] = '';
                  setShow(show - 1);
                  setPlayers(newPlayers);
                }
              }}
              text="remove player"
            />
          </Row>
          <Button text="start" onClick={() => validateNames()} />
        </GridWrapper>
      </GridWrapper>
    </Wrapper>
  );
}

PlayerPage.propTypes = {
  submitPlayers: PropTypes.func,
  redirectToGame: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  playerPage: makeSelectPlayerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirectToGame: () => dispatch(push('/play')),
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
)(PlayerPage);
