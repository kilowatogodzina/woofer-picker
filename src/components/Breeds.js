import React from 'react';
import { getDogBreeds, getRandomDogImage } from '../services/axios';
import DogPopup from './DogPopup';

class Breeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dogBreeds: [],
      dogImage: '',
      isLoading: true,
      isPopupOpen: false,
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
        });
      }
    });
  }

  onCloseDogPopup = () => {
    this.setState({
      isPopupOpen: false,
    });
  }

  render() {
    let { dogBreeds, isLoading, isPopupOpen, dogImage } = this.state;

    if (isLoading) {
      return <div>Ładowanie...</div>;
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
        
        {isPopupOpen && <DogPopup dogImage={dogImage} onClosePopup={this.onCloseDogPopup}/>}
      </>
    );
  }
}

export default Breeds;
