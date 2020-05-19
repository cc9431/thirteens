/* eslint-disable indent */
/**
 *
 * Page
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  margin: 10vh 10vw;
  width: 80vw;
  height: 80vh;
  overflow: auto;
  transition: all 500ms cubic-bezier(0.68, -0.6, 0.32, 1.6), width 0ms ease,
    height 0ms ease, margin 0ms ease;
  opacity: ${props => (props.page === props.index ? '1' : '0')};
  transform: translateX(
    ${props => {
      if (props.page > props.index) return '-100px';
      if (props.page < props.index) return '100px';
      return '0px';
    }}
  );
  z-index: ${props => (props.page === props.index ? '1' : '0')};
  visibility: ${props => (props.page === props.index ? 'visible' : 'hidden')};
`;

function Page({ className, children, page, index }) {
  return (
    <Wrapper className={className} page={page} index={index}>
      {children}
    </Wrapper>
  );
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  page: PropTypes.number,
  index: PropTypes.number,
};

export default memo(Page);
