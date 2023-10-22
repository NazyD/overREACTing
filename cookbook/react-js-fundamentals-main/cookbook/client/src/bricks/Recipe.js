import Card from "react-bootstrap/Card";
import './Recipe.css';
import React from "react";

function Recipe(props) {
    return (
            <Card className="recipe">
                <Card.Body>
                    <div className="headerRecipe">{props.recipe.name}</div>
                    <div className="descriptionRecipe">{props.recipe.description}</div>
                    <img src={props.recipe.imgUri} alt={""}/>
                </Card.Body>
            </Card>
    );
}

export default Recipe;