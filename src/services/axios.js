import axios from 'axios';

export function getDogBreeds() {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/breeds/list/all`)
    .then((result) => result.data);
}

export function getRandomDogImage(breed) {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/breed/${breed}/images/random`)
    .then((result) => result.data);
}
