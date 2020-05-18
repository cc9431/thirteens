/**
 *
 * LandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TitleImage from '../../images/title.png';
import Button from '../../components/Button/Loadable';

// #ffa05b // background (primary)
// #d3170b // text
// #ff8f3d // buttons/secondary text

const MountAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background: #eecebf;
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.img`
  max-width: 130vh;
  width: 100%;
  margin: auto;
`;

const MovingDiv = styled.div`
  animation: ${MountAnimation} 1s linear;
  margin: auto;
  display: grid;
  grid-auto-flow: row;
  grid-gap: 30px;
  padding-bottom: 80px;
`;

export function LandingPage({ redirectToPlayers }) {
  return (
    <Wrapper>
      <Helmet>
        <title>thirteens</title>
      </Helmet>
      <MovingDiv>
        <Title src={TitleImage} />
        <Button text="new game" onClick={() => redirectToPlayers()} />
      </MovingDiv>
    </Wrapper>
  );
}

LandingPage.propTypes = {
  redirectToPlayers: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    redirectToPlayers: () => dispatch(push('/players')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LandingPage);
