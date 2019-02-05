import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import RecipePage from './components/RecipePage';

import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <SearchBar />
            <Route exact path="/" component={Home} />
            <Route exact path="/recipe/:recipeId" component={RecipePage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
