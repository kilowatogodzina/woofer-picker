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

const PopupContent = styled.div`
  width: 700px;
  height: 400px;
  max-width: 100%;
  max-height: 80%;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

class DogPopup extends React.Component {
  render() {
    let { dogImage, onClosePopup, breed, onChooseAnother } = this.props;

    return (
      <>
        <PopupWrapper>
          <PopupContent>
            <div>{breed}</div>

            {dogImage && 
              <img src={dogImage} alt=''></img>
            }

            <button onClick={onChooseAnother}>Another dog!</button>
            <button onClick={onClosePopup}>Finish!</button>
          </PopupContent>
        </PopupWrapper>
      </>
    );
  }
}

export default DogPopup;
