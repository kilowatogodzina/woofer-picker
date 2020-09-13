import React from 'react';
import styled from 'styled-components';

const PopupWrapper = styled.div`
  width: 100%;
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
  width: 600px;
  max-width: 85%;
  max-height: 80%;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 15px;

  img {
    max-width: 100%;
    max-height: 400px;
    border-radius: 5px;
    margin: 0.5rem 0;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  flex-wrap: wrap;

  button {
    border: 1px solid;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0 1rem 0 0;
    cursor: pointer;
    background: #edf6f9;
    transition: background 0.3s ease-in-out;

    &:hover {
      background: #a0ced9;
    }
  }
`;

class DogPopup extends React.Component {
  render() {
    let { dogImage, onClosePopup, breed, onChooseAnother } = this.props;

    return (
      <>
        <PopupWrapper>
          <PopupContent>
            <h2>Hi, meet: {breed}</h2>

            {dogImage && <img src={dogImage} alt=''></img>}

            <ButtonWrapper>
              <button onClick={onChooseAnother}>Is there another dog?</button>
              <button onClick={onClosePopup}>Close</button>
            </ButtonWrapper>
          </PopupContent>
        </PopupWrapper>
      </>
    );
  }
}

export default DogPopup;
