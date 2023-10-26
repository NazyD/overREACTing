import Card from "react-bootstrap/Card";
import './Recipe.css';
import React from "react";

function Recipe(props) {
    if(props.cardStyle === "grid") {
        return (
            <Card className="recipe-card">
                <Card.Body>
                    <div className="header-recipe">{props.recipe.name}</div>
                    <div className="description-recipe">{props.recipe.description}</div>
                    <img src={props.recipe.imgUri} alt={"recipe"}/>
                </Card.Body>
            </Card>
        );
    } else if (props.cardStyle === "grid-small") {
        return (
            <Card className="recipe-card-small">
                <Card.Body>
                    <div className="header-recipe">{props.recipe.name}</div>
                    <div className="description-recipe-small">{props.recipe.description}</div>
                    <img src={props.recipe.imgUri} alt={"recipe"}/>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card className="recipe-vertical">
                <Card.Body>
                    <img src={props.recipe.imgUri} alt={"recipe"}/>
                    <div className={"text-container"}>
                        <div className="header-recipe">{props.recipe.name}</div>
                        <div className="description-recipe-vertical">{props.recipe.description}</div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}

export default Recipe;