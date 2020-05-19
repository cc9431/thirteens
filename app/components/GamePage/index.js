/* eslint-disable react/no-array-index-key */
/**
 *
 * GamePage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Page from '../Page/Loadable';
import BetTricksInput from '../BetTricksInput';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
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
  grid-template-columns: repeat(3, 20px) repeat(auto-fit, minmax(0px, 1fr));
  border-radius: 8px;
  min-height: 40px;
  height: 100%;
  width: 100%;
  border: none;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
  transition: all 500ms ease;
`;

const HeaderColumn = styled.div`
  color: #d3170b;
  text-align: center;
  margin: auto;
  background: transparent;
  font-size: 1.2rem;
  font-family: Futura;
`;

const RowData = styled.div`
  color: ${props => (props.tricksWrong ? '#d3170b' : '#d3170bab')};
  text-align: center;
  margin: auto;
  white-space: nowrap;
  overflow: visible;
  background: transparent;
  font-size: 1rem;
  font-family: Futura;
`;

const defaultTable = (nRounds, nPlayers) => {
  const table = [];
  for (let i = 0; i < nRounds; i += 1) {
    table.push({
      row: [],
      totalBets: 0,
      totalTricks: 0,
      totalDealt: nRounds - i,
    });
    for (let j = 0; j < nPlayers; j += 1) {
      table[i].row.push({ bet: '', tricks: '' });
    }
  }
  return table;
};

export function GamePage(props) {
  const { players, page } = props;
  const pageIndex = 2;
  const nPlayers = players.length || 1;
  const nRounds = Math.floor(52 / nPlayers);
  const [table, setTable] = useState(defaultTable(nRounds, nPlayers));
  useEffect(() => {
    setTable(defaultTable(nRounds, nPlayers));
  }, [JSON.stringify(players)]);

  return (
    <Page page={page} index={pageIndex}>
      <GridWrapper>
        <Row>
          <RowData />
          <RowData />
          <RowData />
          {players.map((name, index) => (
            <HeaderColumn key={index}>{name}</HeaderColumn>
          ))}
        </Row>
        <GridBodyWrapper>
          {table.map((tableRow, round) => {
            const { row, totalBets, totalTricks, totalDealt } = tableRow;
            const tricksCompleted = row.reduce(
              (a, b) => a && !Number.isNaN(parseInt(b.tricks, 10)),
              true,
            );
            const tricksWrong = tricksCompleted && totalDealt !== totalTricks;
            return (
              <Row key={round}>
                <RowData tricksWrong={tricksWrong}>{totalDealt}</RowData>
                <RowData>{totalBets}</RowData>
                <RowData tricksWrong={tricksWrong}>{totalTricks}</RowData>
                {row.map((column, player) => (
                  <BetTricksInput
                    key={player}
                    table={table}
                    setTable={setTable}
                    round={round}
                    player={player}
                    dealt={totalDealt}
                  />
                ))}
              </Row>
            );
          })}
        </GridBodyWrapper>
      </GridWrapper>
    </Page>
  );
}

GamePage.propTypes = {
  page: PropTypes.number,
  players: PropTypes.array,
};

export default memo(GamePage);
