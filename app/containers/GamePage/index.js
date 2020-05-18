/* eslint-disable react/no-array-index-key */
/**
 *
 * GamePage
 *
 */

import React, { memo, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectGamePage from './selectors';
import makeSelectPlayerPage from '../PlayerPage/selectors';
import reducer from './reducer';
import BetTricksInput from '../../components/BetTricksInput';

const Wrapper = styled.div`
  background: #eecebf;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  width: 100%;
  margin: 100px;
`;

const GridBodyWrapper = styled.div`
  display: grid;
  grid-gap: inherit;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
  border-radius: 8px;
  height: 40px;
  width: 100%;
  border: none;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  transition: all 500ms ease;
`;

const HeaderRow = styled(Row)`
  padding: 10px 15px;
  height: 50px;
  width: 100%;
  border: none;
  background: #ff8f3d21;
`;

const Column = styled.div`
  display: grid;
  grid-gap: inherit;
  grid-auto-flow: row;
  background: #ff8f3d21;
  padding: 10px 15px;
  user-select: none;
  font-size: 1rem;
  font-family: Futura;
  border-radius: 8px;
`;

const HeaderColumn = styled(Column)`
  color: #d3170b;
  text-align: center;
  padding: 0px;
  background: transparent;
  font-size: 1.2rem;
`;

export function GamePage(props) {
  useInjectReducer({ key: 'gamePage', reducer });
  const { players } = props.playerPageStore;
  const nPlayers = players.length || 1;
  if (!players.length) props.redirectToLandingPage();
  const nRounds = Math.floor(52 / nPlayers);
  const defaultTable = [];
  for (let i = 0; i < nRounds; i += 1) {
    defaultTable.push([]);
    for (let j = 0; j < nPlayers; j += 1) {
      defaultTable[i].push({ bet: '', tricks: '' });
    }
  }
  const [table, setTable] = useState(defaultTable);

  return (
    <Wrapper>
      <Helmet>
        <title>thirteens</title>
      </Helmet>
      <GridWrapper>
        <HeaderRow>
          {players.map((name, index) => (
            <HeaderColumn key={index}>{name}</HeaderColumn>
          ))}
        </HeaderRow>
        <GridBodyWrapper>
          {table.map((row, round) => (
            <Row key={round}>
              {table[round].map((column, player) => (
                <BetTricksInput
                  key={player}
                  table={table}
                  setTable={setTable}
                  round={round}
                  player={player}
                />
              ))}
            </Row>
          ))}
        </GridBodyWrapper>
      </GridWrapper>
    </Wrapper>
  );
}

GamePage.propTypes = {
  playerPageStore: PropTypes.object,
  redirectToLandingPage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  playerPageStore: makeSelectPlayerPage(),
  gamePage: makeSelectGamePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    redirectToLandingPage: () => dispatch(push('/')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GamePage);
