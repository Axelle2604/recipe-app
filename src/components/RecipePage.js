import React, { PureComponent } from 'react';
import { getRecipeByUrl } from '../services/recipeApi';

export default class RecipePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: null,
      recipe: [],
    };
  }

  componentDidMount() {
    this.getAllInformations();
  }

  componentDidUpdate() {
    if (this.state.recipe.length === 0) {
      this.getAllInformations();
    }
  }

  getAllInformations() {
    const uri = 'http://www.edamam.com/ontologies/edamam.owl#';
    this.setState({ recipeId: this.props.match.params.recipeId });
    this.loadRecipeSelected(uri, this.state.recipeId);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.recipeId !== props.match.params.recipeId) {
      return {
        recipeId: props.match.params.recipeId,
        recipe: [],
      };
    }
    return null;
  }

  async loadRecipeSelected(uri, id) {
    const url = `${uri + id}`;
    const { data } = await getRecipeByUrl(encodeURIComponent(url));
    this.setState({
      recipe: data,
    });
  }

  render() {
    return (
      <div>
        {this.state.recipe.map(({ uri, label, image, ingredientLines }) => (
          <div key={uri}>
            <h1>{label}</h1>
            <img src={image} alt={label} />
            <div>
              {ingredientLines.map(ingredient => (
                <p key={ingredient}>{ingredient}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
