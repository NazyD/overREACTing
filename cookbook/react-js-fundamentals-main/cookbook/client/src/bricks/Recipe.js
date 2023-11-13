import Card from "react-bootstrap/Card";
import './Recipe.css';
import React, {useState} from "react";
import IngredientList from "./IngredientsList";
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NewRecipe from "./NewRecipe";

function Recipe(props) {
    const [showUpdateRecipe, setShowUpdateRecipe] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const handleUpdateClick = () => {
        setShowUpdateRecipe(true);
    };
    const handleDeleteClick = () => {
        setShowDeleteWarning(true);
    };
    const handleCloseDeleteWarning = () => {
        setShowDeleteWarning(false);
    };
    const handleConfirmDelete = async () => {
        const res = await fetch(`http://localhost:8000/recipe/delete`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ id: props.recipe.id })
        });

        const data = await res.json();
        console.log(res, data);

        if (res.status === 200) {
            setShowDeleteWarning(false);
        } else {
            console.error("Failed to delete recipe");
        }
        setShowDeleteWarning(false);
    };


    if(props.cardStyle === "grid") {
        return (
            <Card className="recipe-card">
                <Card.Body>
                    <div className="header-recipe">{props.recipe.name}</div>
                    <div className="description-recipe">{props.recipe.description}</div>
                    <div className="image">
                        <img src={props.recipe.imgUri} alt={"recipe"}/>
                        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Button
                                variant="outline-primary"
                                className="update-button"
                                onClick={handleUpdateClick}
                                style={{color: "white"}}
                            >
                                U
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="delete-button"
                                onClick={handleDeleteClick}
                                style={{color: "white"}}
                            >
                                D
                            </Button>
                        </div>
                    </div>

                    {showUpdateRecipe && (
                        <NewRecipe
                            showModal={showUpdateRecipe}
                            setShowModal={setShowUpdateRecipe}
                            selectedRecipe={props.recipe} // Pass the selected recipe for update
                            onSave={(data) => {
                                console.log("Recipe updated:", data);
                                setShowUpdateRecipe(false)
                            }}
                        />
                    )}
                    <Modal show={showDeleteWarning} onHide={handleCloseDeleteWarning}>
                        <Modal.Header closeButton>
                            <Modal.Title>Odstranit recept</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Opravdu chcete odstranit recept?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Ano
                            </Button>
                            <Button variant="secondary" onClick={handleCloseDeleteWarning}>
                                Ne
                            </Button>
                        </Modal.Footer>
                    </Modal>
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
                        <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <Button
                                variant="outline-primary"
                                className="update-button"
                                onClick={handleUpdateClick}
                                style={{color: "white"}}
                            >
                                U
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="delete-button"
                                onClick={handleDeleteClick}
                                style={{color: "white"}}
                            >
                                D
                            </Button>
                        </div>
                    </div>

                    {showUpdateRecipe && (
                        <NewRecipe
                            showModal={showUpdateRecipe}
                            setShowModal={setShowUpdateRecipe}
                            selectedRecipe={props.recipe} // Pass the selected recipe for update
                            onSave={(data) => {
                                console.log("Recipe updated:", data);
                                setShowUpdateRecipe(false);
                            }}
                        />
                    )}
                    <Modal show={showDeleteWarning} onHide={handleCloseDeleteWarning}>
                        <Modal.Header closeButton>
                            <Modal.Title>Odstranit recept</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Opravdu chcete odstranit recept?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleConfirmDelete}>
                                Ano
                            </Button>
                            <Button variant="secondary" onClick={handleCloseDeleteWarning}>
                                Ne
                            </Button>
                        </Modal.Footer>
                    </Modal>
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