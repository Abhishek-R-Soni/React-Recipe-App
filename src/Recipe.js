import React from 'react'

export const Recipe = ({rec, add}) => {    

    return (
      <div className="recipes">
        <p>
          <b>{rec.label}</b>
        </p>
        <div>
          <p>
            <b>Ingredients</b>
            {rec.ingredients.map((ingredient) => (
              <li>{ingredient.text}</li>
            ))}
          </p>
        </div>
        <img src={rec.image} className="image" alt="Not found"></img>

        {add ? (<button className="btn btn-primary" onClick={add}>Add to Cart</button>) : (<h1>Thanks</h1>)}
      </div>
    );
}