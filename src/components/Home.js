import React, { PureComponent } from 'react';
import { getChickenRecipes } from '../services/recipeApi';
import RecipeComponent from './RecipeComponent.js';

export default class Home extends PureComponent {
  state = {
    listRecipes: [],
  };

  componentDidMount() {
    this.loadHomeRecipes();
  }

  async loadHomeRecipes() {
    const {
      data: { hits },
    } = await getChickenRecipes();
    this.setState({
      listRecipes: hits,
    });
  }

  render() {
    const displayHomeRecipes = this.state.listRecipes.map(recipe => (
      <div key={recipe.recipe.uri}>
        <RecipeComponent
          label={recipe.recipe.label}
          image={recipe.recipe.image}
          uri={recipe.recipe.uri}
        />
      </div>
    ));
    return <div>{displayHomeRecipes}</div>;
  }
}
