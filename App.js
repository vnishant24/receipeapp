import './App.css';
import { useState, useEffect } from 'react';
import Recipe from './Recipe';
function App() {
  const APP_ID = "f838d816";
  const APP_KEY = "63057943ec749b0eddb5fb2d237a2662";


const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken');

useEffect( ()=> {
  getRecipes();
}, [query]);

const exampleReq = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

const getRecipes = async () => {
  const response = await fetch(exampleReq);
  const data = await response.json();
  setRecipes(data.hits);
}

const updateSearch = e => {
  setSearch(e.target.value);
}
const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');


}
return (
    
    <div className="App">
      <h2>Recipe App</h2>
      <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" types="text" value={search} onChange ={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
        <Recipe
        mainData = {recipe}
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))}
      </div>
    </div>
  );
}
export default App;
