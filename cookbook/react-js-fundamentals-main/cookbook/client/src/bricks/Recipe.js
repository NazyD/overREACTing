import Card from "react-bootstrap/Card";
import './Recipe.css';
import React from "react";
import IngredientList from "./IngredientsList";

function Recipe(props) {
    if(props.cardStyle === "grid") {
        return (
            <Card className="recipe-card">
                <Card.Body>
                    <div className="header-recipe">{props.recipe.name}</div>
                    <div className="description-recipe">{props.recipe.description}</div>
                    <div className="image">
                        <img src={props.recipe.imgUri} alt={"recipe"}/>
                    </div>
                </Card.Body>
            </Card>
        );
    } else if (props.cardStyle === "grid-small") {

        return (
            <Card className="recipe-card-small">
                <Card.Body>
                    <div className="header-recipe">{props.recipe.name}</div>
                    <div className="description-recipe-small">{props.recipe.description}</div>
                    <div className="ingredients">
                        <IngredientList ingredientList={props.recipe.ingredients}
                                    ingredientsList={props.ingredientsList}/>
                    </div>
                    <div className="image">
                        <img src={props.recipe.imgUri} alt={"recipe"}/>
                    </div>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <table className={"table"}>
                <tr>
                    <th>Název receptu</th>
                    <th>Popis</th>
                </tr>
            </table> &&
            <table className={"table"}>
                <td>{props.recipe.name}</td>
                <td>{props.recipe.description}</td>
            </table>
        );
    }

}

export default Recipe;