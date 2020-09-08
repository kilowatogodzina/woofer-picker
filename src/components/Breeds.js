import React from 'react';
import axios from 'axios';

class Breeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: [],
      isLoading: true,
      error: {},
    };
  }

  componentDidMount() {
    this.getDogBreeds();
  }

  getDogBreeds() {
    // TODO: Move this URL to env and create service to manage 
    axios.get('https://dog.ceo/api/breeds/list/all').then((result) => {
      if (result.data.status === 'success') {
        // Because result.data.message is an object...
        let breedsArray = Object.entries(result.data.message);

        this.setState({
          breeds: breedsArray,
          isLoading: false,
        });
      }
    });
  }

  getRandomDogImage(breed) {
    // TODO: Move this URL to env and create service to manage 
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then((result) => {
        if (result.data.status === 'success') {
          window.open(result.data.message, '_blank');
        }
      });
  }

  render() {
    let { breeds, isLoading } = this.state;
    return (
      <>
        {/* TODO: Insert prettier loader */}
        {isLoading && <div>Ładowanie...</div>}

        {!isLoading && (
          <div>
            {/* TODO: This needs refactoring! */}
            {breeds.map(([key, value], index) => {
              return (
                <>
                  <div key={index} onClick={() => this.getRandomDogImage(key)}>
                    {key}
                  </div>

                  {value.length > 0 && (
                    <div>
                      {value.map((breed, i) => (
                        <div
                          key={i}
                          onClick={() =>
                            this.getRandomDogImage(`${key}/${breed}`)
                          }
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
        )}
      </>
    );
  }
}

export default Breeds;
