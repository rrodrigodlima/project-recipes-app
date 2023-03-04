import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksFirstLetter, fetchDrinksIngredients,
  fetchDrinksName, fetchFoodFirstLetter,
  fetchFoodIngredients, fetchFoodName } from '../services/FetchApi';

// Created componet Search Bar
export default function SearchBar() {
  const [filters, setFilters] = useState('');
  const [resultApi, setResultApi] = useState('');
  const { stateApi, setRecipes, recipes } = useContext(RecipesContext);
  console.log(recipes);
  const handleFood = async () => {
    if (resultApi === 'ingredient') {
      const request = await fetchFoodIngredients(filters);
      setRecipes(request.meals);
    }
    if (resultApi === 'name') {
      const request = await fetchFoodName(filters);
      setRecipes(request.meals);
    }
    if (resultApi === 'firstLetter') {
      const request = await fetchFoodFirstLetter(filters);
      setRecipes(request);
    }
  };

  const handleDrinks = async () => {
    if (resultApi === 'ingredient') {
      const request = await fetchDrinksIngredients(filters);
      console.log(request);
      setRecipes(request.drinks);
    }
    if (resultApi === 'name') {
      const request = await fetchDrinksName(filters);
      setRecipes(request.drinks);
    }
    if (resultApi === 'firstLetter') {
      if (resultApi.length > 1) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        const request = await fetchDrinksFirstLetter(filters);
        setRecipes(request.drinks);
      }
    }
  };

  return (
    <section className="searchBar">
      <div>
        <input
          data-testid="search-input"
          type="text"
          value={ filters.filter }
          placeholder="Buscar Receita"
          className="search-input"
          onChange={ ({ target }) => setFilters(target.value) }
        />
        <div className="radioFilters">
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="ingredient"
              data-testid="ingredient-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="Ingredient">
              Ingredient
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="name"
              data-testid="name-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="Name">
              Name
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="radioFilter"
              value="firstLetter"
              data-testid="first-letter-search-radio"
              className="search-radio"
              onChange={ ({ target }) => setResultApi(target.value) }
            />
            <label htmlFor="firstLetter">
              First letter
            </label>
          </div>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          className="search-button"
          onClick={ stateApi === 'food' ? handleFood : handleDrinks }
        >
          Search
        </button>
      </div>
    </section>
  );
}
