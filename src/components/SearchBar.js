import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { getRecipesByName } from '../services/recipeApi';
import RecipeComponent from './RecipeComponent';

const SearchResultsContainer = styled.div`
  width: 80%;
`;

const addTenToDisplayResults = valueToIncrement => (prevState, props) => ({
  displayResultsFromNb: prevState.displayResultsFromNb + valueToIncrement,
  displayResultsToNb: prevState.displayResultsToNb + valueToIncrement,
});

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = null;
    this.state = {
      searchBarValue: '',
      listRecipes: [],
      displayResultsFromNb: 0,
      displayResultsToNb: 10,
    };
  }

  componentDidMount() {
    this.inputRef.focus();
  }

  saveInputValue({ target: { value } }) {
    this.setState({
      searchBarValue: value,
    });
  }

  async loadRecipesSearchBarValue(searchBarValue) {
    const { displayResultsFromNb, displayResultsToNb } = this.state;
    const fromNb = displayResultsFromNb;
    const toNb = displayResultsToNb;
    const {
      data: { hits },
    } = await getRecipesByName(searchBarValue, fromNb, toNb);
    this.setState({
      listRecipes: hits,
    });
  }

  getRecipesFromSearchBarValue() {
    this.resetSearchBarResults();
    this.loadRecipesSearchBarValue(this.state.searchBarValue);
  }

  resetSearchBarResults() {
    this.setState({
      listRecipes: [],
    });
  }

  startSearchFromInput(e) {
    if (e.key === 'Enter') {
      this.getRecipesFromSearchBarValue();
    }
  }

  displayTenNextResults() {
    this.setState(addTenToDisplayResults(10), () =>
      this.loadRecipesSearchBarValue(this.state.searchBarValue)
    );
  }

  render() {
    const { listRecipes } = this.state;
    const displaySearchBarRecipes = listRecipes.map(({ recipe }) => (
      <div key={recipe.uri}>
        <RecipeComponent
          label={recipe.label}
          image={recipe.image}
          uri={recipe.uri}
        />
      </div>
    ));
    return (
      <div>
        <div>
          <input
            type="texte"
            onChange={this.saveInputValue.bind(this)}
            onKeyDown={this.startSearchFromInput.bind(this)}
            ref={inputRef => (this.inputRef = inputRef)}
          />
          <button onClick={this.getRecipesFromSearchBarValue.bind(this)}>
            Search
          </button>
        </div>
        <SearchResultsContainer onClick={this.resetSearchBarResults.bind(this)}>
          {displaySearchBarRecipes}
          {listRecipes.length !== 0 ? (
            <button onClick={this.displayTenNextResults.bind(this)}>
              Next >
            </button>
          ) : null}
        </SearchResultsContainer>
      </div>
    );
  }
}
