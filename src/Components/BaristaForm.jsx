import React, {Component, useEffect, useState} from 'react';
import RecipeChoices from './RecipeChoices.jsx';
import drinksJson from "./drinks.json";

const BaristaForm = () => {
  const [inputs, setInputs] = useState({
    'temperature': '',
    'milk': '',
    'syrup': '',
    'blended': ''
  });

  const [currentDrink, setCurrentDrink] = useState('');
  const [trueRecipe, setTrueRecipe] = useState({});
  
  const [correctAnswers, setCorrectAnswers] = useState({
    'temperature': '',
    'syrup': '',
    'milk': '',
    'blended': ''
  });
  
  // Avoid calling functions directly outside of event handlers or hooks bc etNextDrink() is being called on every render.
  useEffect(getNextDrink, []);
  // Use useEffect to ensure that getNextDrink is called once when the component first renders.

  const ingredients = {
    'temperature' : ['hot', 'lukewarm', 'cold'],
    'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
    'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
    'blended': ['yes', 'turbo', 'no']
  }

  const onNewDrink = (e) => {
    setInputs({
      'temperature': '',
      'milk': '',
      'syrup': '',
      'blended': ''
    });

    setCorrectAnswers({
      'temperature': '',
      'syrup': '',
      'milk': '',
      'blended': ''
    });

    getNextDrink();
  };

  function getNextDrink() {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  }
  
  const onCheckAnswer = () => {
    setCorrectAnswers((prevState)=> ({...prevState, 
      'temperature': inputs['temperature'] === trueRecipe.temp ? 'Correct' : 'Wrong',
      'syrup': inputs['syrup'] === trueRecipe.syrup ? 'Correct' : 'Wrong',
      'milk': inputs['milk'] === trueRecipe.milk ? 'Correct' : 'Wrong',
      'blended': inputs['blended'] === trueRecipe.blended ? 'Correct' : 'Wrong'
    }))
  };

  const onHandleChange = (e) => {
    setInputs((prevState)=> ({...prevState, [e.target.name]:e.target.value}))
  };

  return(
    <>
    <h2>Hi, I'd like to order a:</h2>
    <div className="drink-container">
      <h2 className="mini-header">
        {currentDrink}
      </h2>

      <button
      type="new-drink-button"
      className="button newdrink"
      onClick={onNewDrink}
      >
        🔄
    </button>
    </div>

    <form className="container">
      <div className="mini-container">
      {
        ["temperature", "milk", "syrup", "blended"].map((cat) => (
          /* Looped through array instead of writing individual code blocks for each cat to reduce repetition*/
          <div key={cat} className="categories">
            <h3>{cat}</h3>

            <div className="answer-space" id={correctAnswers[cat]}>
              {inputs[cat]} 
            </div>

            <RecipeChoices
              label={cat}
              choices={ingredients[cat]}
              checked={inputs[cat]}
              handleChange={onHandleChange} //Cleaned up code by making onHandleChange function
            />
          </div>
        ))
      }
      </div>
    </form>

    <button
      type="submit"
      className="button submit"
      onClick={onCheckAnswer}
    >
      Check Answer
    </button>
    </>
  );
};

export default BaristaForm;