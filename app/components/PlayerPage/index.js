/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
/**
 *
 * PlayerPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Page from '../Page/Loadable';
import Input from '../Input/Loadable';
import Button from '../Button/Loadable';

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
`;

const Row = styled.div`
  display: grid;
  grid-gap: inherit;
  grid-auto-flow: column;
  margin: auto;
`;

export function PlayerPage(props) {
  const { page } = props;
  const pageIndex = 1;
  const [players, setPlayers] = useState(['', '', '', '', '']);
  const [showInputs, setShowInputs] = useState(2);

  const setPlayerName = (name, index) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const validateNames = () => {
    const gamePlayers = [];
    players.forEach((name, index) => {
      if (index <= showInputs) gamePlayers.push(name || 'Unnamed Player');
    });
    props.submitPlayers(gamePlayers);
    props.nextPage();
  };

  return (
    <Page page={page} index={pageIndex}>
      <GridWrapper>
        {players.map((player, index) => (
          <Input
            show={index <= showInputs}
            key={index}
            onChange={name => setPlayerName(name, index)}
            value={player}
          />
        ))}
        <Row>
          <Button
            onClick={() => {
              if (showInputs < 4) setShowInputs(showInputs + 1);
            }}
            text="add player"
          />
          <Button
            onClick={() => {
              if (showInputs > 2) {
                const newPlayers = [...players];
                newPlayers[showInputs] = '';
                setShowInputs(showInputs - 1);
                setPlayers(newPlayers);
              }
            }}
            text="remove player"
          />
        </Row>
        <Button text="start" onClick={() => validateNames()} />
      </GridWrapper>
    </Page>
  );
}

PlayerPage.propTypes = {
  page: PropTypes.number,
  submitPlayers: PropTypes.func,
  nextPage: PropTypes.func,
};

export default memo(PlayerPage);
