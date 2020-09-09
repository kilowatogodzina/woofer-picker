import React from 'react';
import { getDogBreeds, getRandomDogImage } from '../services/axios';
import DogPopup from './DogPopup';
import Loader from './Loader';

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
      <>
        <div>
          {/* TODO: This needs refactoring! */}
          {dogBreeds.map(([key, value], index) => {
            return (
              <>
                <div key={index} onClick={() => this.openDogPopup(key)}>
                  {key}
                </div>

                {value.length > 0 && (
                  <div>
                    {value.map((breed, i) => (
                      <div
                        key={i}
                        onClick={() => this.openDogPopup(`${key}/${breed}`)}
                      >
                        {key} {breed}
                      </div>
                    ))}
                  </div>
                )}
              </>
            );
          })}
        </div>

        {isPopupOpen && (
          <DogPopup
            breed={currentBreed}
            dogImage={dogImage}
            onClosePopup={this.onCloseDogPopup}
            onChooseAnother={this.getAnotherPicture}
          />
        )}
      </>
    );
  }
}

export default Breeds;
