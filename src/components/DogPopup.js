import React from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

class DogPopup extends React.Component {
  render() {
    let { dogImage, onClosePopup } = this.props;

    //TODO: Closing popup, getting another random image
    return (
      <>
        <PopupWrapper onClick={onClosePopup}>
          <img src={dogImage} alt=''></img>
        </PopupWrapper>
      </>
    );
  }
}

export default DogPopup;
