import axios from 'axios';
import { API_KEY, APP_ID } from './keysAPI';

export const getChickenRecipes = () =>
  axios.get(
    `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}&from=0&to=10`
  );

export const getRecipesByName = (searchBarValue, fromNb, toNb) =>
  axios.get(
    `https://api.edamam.com/search?q=${searchBarValue}&app_id=${APP_ID}&app_key=${API_KEY}&from=${fromNb}&to=${toNb}`
  );

export const getRecipeByUrl = url =>
  axios.get(
    `https://api.edamam.com/search?r=${url}&app_id=${APP_ID}&app_key=${API_KEY}`
  );
