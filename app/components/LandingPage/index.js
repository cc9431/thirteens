/* eslint-disable indent */
/**
 *
 * LandingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Page from '../Page/Loadable';
import TitleImage from '../../images/title.png';
import Button from '../Button/Loadable';

// #ffa05b // background (primary)
// #d3170b // text
// #ff8f3d // buttons/secondary text

const Wrapper = styled(Page)`
  display: grid;
  grid-template-rows: 0fr 0.3fr;
  grid-gap: 30px;
`;

const Title = styled.img`
  width: 100%;
  transition: none;
`;

export function LandingPage({ page, nextPage }) {
  const pageIndex = 0;
  return (
    <Wrapper page={page} index={pageIndex}>
      <Title src={TitleImage} />
      <Button text="new game" onClick={nextPage} />
    </Wrapper>
  );
}

LandingPage.propTypes = {
  page: PropTypes.number,
  nextPage: PropTypes.func,
};

export default memo(LandingPage);
