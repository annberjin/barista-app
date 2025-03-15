import React, { Component, useEffect, useState } from "react";

const RecipeChoices = ({ label, choices, checked, handleChange }) => {
  return(
    <>
    <div className="radio-buttons">
      {
        // Dynamically creates the list of options avaliable
        // The array of JSX elements returned by .map() is automatically rendered by React, so no need to set it to a variable
        // If choices is truthy (not null/undefined) then the .map function runs
        choices && choices.map((choice) => (
          <li key={choice}>
            <input 
              id={choice}
              value={choice} // e.target.value will get replaced with the value here
              name={label} // e.target.name will get replaced with the value here
              type="radio"
              onChange={handleChange}
              checked={checked == choice} //Checks if the input checked is equal to the choice
            />
              {choice}
          </li> 
        ))
      }
    </div>
    </>
  );
};

export default RecipeChoices;