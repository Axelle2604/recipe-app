import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const RecipeComponent = props => {
  const id = props.uri.split(/#/);
  return (
    <div>
      <Link to={`/recipe/${id[1]}`}>
        <h2>{props.label}</h2>
        <img src={props.image} alt={props.label} />
      </Link>
    </div>
  );
};

export default memo(RecipeComponent);
