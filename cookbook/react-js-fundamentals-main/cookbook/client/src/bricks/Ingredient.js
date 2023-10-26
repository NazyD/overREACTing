import React from "react";

function Ingredient(props) {
    const ingredientData = props.ingredientsList.find(item => item.id === props.ing.id);
    const ingredientName = ingredientData ? ingredientData.name : "něčeho";
    return (
        <div>-{ingredientName} ({props.ing.amount} {props.ing.unit})</div>
    )
}

export default Ingredient;