import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
`;

class Loader extends React.Component {
  render() {
    return (
      <LoaderWrapper>
        <img src='preloader.gif' alt=''></img>
      </LoaderWrapper>
    );
  }
}

export default Loader;
