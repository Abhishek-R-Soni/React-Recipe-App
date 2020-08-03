import React, {useEffect, useState} from 'react';
import './App.css';
import {Recipe} from './Recipe'
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const App = () => {
  const APP_ID = "8a45d430"
  const APP_KEY ="6a162618cfaa82bf773e06c59a3b410e"
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("mango")
  const [saves, setSaves] = useState([])
  const [status, setStatus] = useState(false)

  useEffect(() => {
    getRecipes();
  }, [query])
  
  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
    const data = await response.json()
    setRecipes(data.hits)
  }

  const updateSearch = e =>{
    setSearch(e.target.value)
  }

  const updateQuery = e =>{
      e.preventDefault()
      setQuery(search)
      setSearch('')
      setStatus(false)
  }

  const addToCart = (e, item) => {
    setSaves(saves.concat(item))
    alert("Added")
  }

  const show = () =>{
    setStatus(true)
  }

  return (
    <React.Fragment>
      <h1 className="head">Recipe App</h1>
      <button id="addto" className="btn btn-primary" onClick={show}>Cart</button>
      
      <div className="App">
        <form className="search-form" onSubmit={updateQuery}>
          <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
          <button id="search" className="btn btn-primary" type="submit">Search</button>
        </form>

        {status ? saves.map((save) => <Recipe rec={save} add={false} />) : null}

        {status === false
          ? recipes.map((recipe) => (
              <Recipe
                rec={recipe.recipe}
                add={(e) => {
                  addToCart(e, recipe.recipe);
                }}
                show={show}
              />
            ))
          : null}
      </div>
    </React.Fragment>
  );
}

export default App;