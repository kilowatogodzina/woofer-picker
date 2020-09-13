import React from 'react';
import { getDogBreeds, getRandomDogImage } from '../services/axios';
import DogPopup from './DogPopup';
import Loader from './Loader';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-family: 'Sen', sans-serif;
`;

const Header = styled.h1`
  text-align: center;
`;

const BreedsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const BreedBadge = styled.div`
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  background: #edf6f9;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #a0ced9;
  }
`;

class Breeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogBreeds: [],
      dogImage: '',
      isLoading: true,
      isPopupOpen: false,
      currentBreed: '',
    };
  }

  componentDidMount() {
    getDogBreeds().then((result) => {
      if (result.status === 'success') {
        let dogBreeds = Object.entries(result.message);

        this.setState({
          isLoading: false,
          dogBreeds: dogBreeds,
        });
      }
    });
  }

  openDogPopup = (breed) => {
    getRandomDogImage(breed).then((result) => {
      if (result.status === 'success') {
        let image = result.message;

        this.setState({
          isPopupOpen: true,
          dogImage: image,
          currentBreed: breed.replace('/', ' '),
        });
      }
    });
  };

  onCloseDogPopup = () => {
    this.setState({
      isPopupOpen: false,
    });
  };

  getAnotherPicture = () => {
    let breed = this.state.currentBreed.replace(' ', '/');

    getRandomDogImage(breed).then((result) => {
      if (result.status === 'success') {
        let image = result.message;

        this.setState({
          dogImage: image,
          currentBreed: breed.replace('/', ' '),
        });
      }
    });
  };

  render() {
    let {
      dogBreeds,
      isLoading,
      isPopupOpen,
      dogImage,
      currentBreed,
    } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    return (
      <MainWrapper>
        <Header>Choose your favourite dog breed!</Header>
        <BreedsWrapper>
          {dogBreeds.map(([key, value], index) => {
            return (
              <React.Fragment key={`${key}_${index}`}>
                <BreedBadge
                  onClick={() => this.openDogPopup(key)}
                >
                  {key}
                </BreedBadge>
                {value.length > 0 && (
                  <>
                    {value.map((breed) => (
                      <React.Fragment key={`${key}_${breed}_${index}`}>
                        <BreedBadge
                          onClick={() => this.openDogPopup(`${key}/${breed}`)}
                        >
                          {`${key} ${breed}`}
                        </BreedBadge>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </BreedsWrapper>

        {isPopupOpen && (
          <DogPopup
            breed={currentBreed}
            dogImage={dogImage}
            onClosePopup={this.onCloseDogPopup}
            onChooseAnother={this.getAnotherPicture}
          />
        )}
      </MainWrapper>
    );
  }
}

export default Breeds;
