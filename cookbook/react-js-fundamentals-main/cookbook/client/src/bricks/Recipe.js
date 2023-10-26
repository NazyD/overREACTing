import Card from "react-bootstrap/Card";
import './Recipe.css';
import React from "react";

function Recipe(props) {
    if(props.cardStyle === "grid") {
        return (
            <Card className="recipe-card">
                <Card.Body>
                    <div className="headerRecipe">{props.recipe.name}</div>
                    <div className="descriptionRecipe">{props.recipe.description}</div>
                    <img src={props.recipe.imgUri} alt={"recipe-image"}/>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card className="recipe-vertical">
                <Card.Body>
                    <img src={props.recipe.imgUri} alt={"recipe-image"}/>
                    <div className={"text-container"}>
                        <div className="headerRecipe">{props.recipe.name}</div>
                        <div className="descriptionRecipe">{props.recipe.description}</div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}

export default Recipe;