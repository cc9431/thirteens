/**
 *
 * BetTricksInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FloatingInput = styled.div`
  position: relative;
  bottom: 28px;
  background: transparent;
  color: ${props => (props.showScore ? '#d3170b' : 'transparent')};
  visibility: ${props => (props.showScore ? 'visible' : 'hidden')};
  margin: auto;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  outline: none;
  border: none;
  transition: all 500ms ease;
`;

const Input = styled.input`
  background: transparent;
  color: #d3170b;
  width: 100%;
  overflow: hidden;
  padding: 0px 20px;
  text-overflow: ellipsis;
  outline: none;
  border: none;
  transition: all 500ms ease;
  color: ${props => (!props.showScore ? '#d3170b' : 'transparent')};
`;

const Wrapper = styled.div`
  background: #ff8f3d21;
  user-select: none;
  font-size: 1rem;
  font-family: Futura;
  border-radius: 8px;
  transition: all 500ms ease;
  :hover ${FloatingInput} {
    color: transparent;
    visibility: hidden;
  }
  :hover ${Input} {
    color: #d3170b;
    visibility: visible;
  }
`;

const BodyColumn = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-flow: column;
  height: 100%;
`;

const calculateScore = (betPlaced = 0, tricksWon = 0) => {
  if (tricksWon < betPlaced) return tricksWon;
  if (tricksWon > betPlaced) return betPlaced - (tricksWon - betPlaced);
  return tricksWon + 10;
};

const calculateFinalScore = (betPlaced = 0, tricksWon = 0) => {
  if (betPlaced === 1) {
    if (tricksWon === 1) return 20;
    return -5;
  }
  if (tricksWon === 1) return -1;
  return 10;
};

function BetTricksInput(props) {
  const { table, setTable, round, player, dealt } = props;
  const { bet, tricks } = table[round].row[player];
  const showScore = bet !== '' && tricks !== '';
  const setPlayerBet = newBet => {
    if (!Number.isNaN(parseInt(newBet, 10)) || !newBet) {
      const newTable = [...table];
      newTable[round].row[player].bet = newBet;
      newTable[round].totalBets += newBet - bet;
      setTable(newTable);
    }
  };
  const setPlayerTricks = newTricks => {
    if (!Number.isNaN(parseInt(newTricks, 10)) || !newTricks) {
      const newTable = [...table];
      newTable[round].row[player].tricks = newTricks;
      newTable[round].totalTricks += newTricks - tricks;
      setTable(newTable);
    }
  };
  const calculateTotalScore = () => {
    let sum = 0;
    for (let i = 0; i <= round; i += 1) {
      const data = table[i].row[player];
      const betPlaced = parseInt(data.bet, 10);
      const tricksWon = parseInt(data.tricks, 10);
      if (!Number.isNaN(betPlaced) && !Number.isNaN(tricksWon)) {
        const score =
          dealt === 1 && i === round
            ? calculateFinalScore(betPlaced, tricksWon)
            : calculateScore(betPlaced, tricksWon);
        sum += score;
        console.log('dealt', dealt, 'round', round, 'score', score, 'sum', sum);
      }
    }
    return sum;
  };
  // TODO floating column?
  return (
    <Wrapper>
      <BodyColumn key={player}>
        <Input
          placeholder="bet"
          value={bet}
          showScore={showScore}
          onChange={event => setPlayerBet(event.target.value)}
        />
        <Input
          placeholder="tricks"
          value={tricks}
          showScore={showScore}
          onChange={event => setPlayerTricks(event.target.value)}
        />
      </BodyColumn>
      <FloatingInput showScore={showScore}>
        {showScore && calculateTotalScore()}
      </FloatingInput>
    </Wrapper>
  );
}

BetTricksInput.propTypes = {
  table: PropTypes.array,
  setTable: PropTypes.func,
  round: PropTypes.number,
  player: PropTypes.number,
  dealt: PropTypes.number,
};

export default memo(BetTricksInput);
