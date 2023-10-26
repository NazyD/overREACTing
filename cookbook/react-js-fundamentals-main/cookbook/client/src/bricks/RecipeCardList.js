import React from "react";
import Recipe from "./Recipe";

function RecipeCardList(props) {
    function getRecipeCardList(recipeList) {
        return recipeList.map((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe} cardStyle={props.cardStyle}/>;
        });
    }

    return getRecipeCardList(props.recipeList);
}

export default RecipeCardList;