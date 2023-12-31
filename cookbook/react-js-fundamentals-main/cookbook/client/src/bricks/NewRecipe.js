import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import IngredientsChoose from "./IngredientsChoose";


const defaultForm = {
    name: "",
    description: "",
    imgUri: "",
    ingredients: [],
};

function NewRecipe({showModal, setShowModal, selectedRecipe, onSave}) {
    const [formData, setFormData] = useState(defaultForm);
    const [validated, setValidated] = useState(false);
    const [recipeAddCall, setRecipeAddCall] = useState({
        state: 'inactive'
    });

    useEffect(() => {
        if (selectedRecipe) {
            setFormData(selectedRecipe);
        }
    }, [selectedRecipe]);

    const handleDropdownValueChange = (value, index) => {
        const parsed = JSON.parse(value);
        setField("ingredients", [...formData.ingredients.slice(0, index),
            { name: parsed.name, id: parsed.id }], index);
    };

    const handleIngredientAmountChange = (value, index) => {
        setField("ingredients.amount", value, index);
    }

    const handleIngredientUnitChange = (value, index) => {
        setField("ingredients.unit", value, index);
    }

    const [dropDowns, setDropdowns] = useState(
        [
            <IngredientsChoose
                selectedValue={(value) => handleDropdownValueChange(value, formData.ingredients.length)}
                ingredientAmount={(value) => handleIngredientAmountChange(value, formData.ingredients.length)}
                ingredientUnit={(value) => handleIngredientUnitChange(value, formData.ingredients.length)} required />
        ]
    );

    const handleAddDropDown = () => {
        setDropdowns(dropDown => [...dropDown,
            <IngredientsChoose
                selectedValue={(value) => handleDropdownValueChange(value, formData.ingredients.length)}
                ingredientAmount={(value) => handleIngredientAmountChange(value, formData.ingredients.length)}
                ingredientUnit={(value) => handleIngredientUnitChange(value, formData.ingredients.length)} required
            />
        ]);
    }

    const handleRemoveDropDown = () => {
        setFormData((prevData) => ({
            ...prevData,
            ingredients: prevData.ingredients.slice(0, -1),
        }));
        const dropDownArray = [...dropDowns];
        dropDownArray.splice(-1, 1);
        setDropdowns(dropDownArray);
    };

    const setField = (name, value, index) => {
        if (name === "ingredients") {
            setFormData((prevData) => ({
                ...prevData,
                ingredients: value,
            }));
        } else if (name === "ingredients.amount") {
            setFormData((prevData) => {
                const updatedIngredients = [...prevData.ingredients];
                updatedIngredients[index] = {
                    ...updatedIngredients[index],
                    amount: Number(value),
                };
                return {
                    ...prevData,
                    ingredients: updatedIngredients,
                };
            });
        } else if (name === "ingredients.unit") {
            setFormData((prevData) => {
                const updatedIngredients = [...prevData.ingredients];
                updatedIngredients[index] = {
                    ...updatedIngredients[index],
                    unit: value,
                };
                return {
                    ...prevData,
                    ingredients: updatedIngredients,
                };
            });
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;

        if (form.checkValidity()) {
            const payload = {
                ...formData,
            };

            setRecipeAddCall({state: "pending"});

      const url = selectedRecipe
        ? `http://localhost:3000/recipe/update`
        : "http://localhost:3000/recipe/create";

      const method = selectedRecipe ? "POST" : "POST";

      const result = await fetch(url, {
        method,
                    headers: {
                        "Content-Type": "application/json",
                    },
        body: JSON.stringify(payload),
                });
            const data = await result.json();
            if (result.status >= 400) {
                setRecipeAddCall({ state: "error", error: data });
                console.log("data:" + data)
            } else {
                setRecipeAddCall({ state: "success", data });
                handleCloseModal();
        if (onSave) {
          onSave(data);
        }
            }
    }
        setValidated(true);
    };

    const handleCloseModal = () => {
        setShowModal({state: false})
        setFormData(defaultForm);
    }

    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedRecipe ? "Upravit recept" : "Nový recept"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" style={{backgroundColor: "#ebebeb", padding: "10px",
                            borderRadius: "5px"}}>
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                minLength={5}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Minimální délka pro název je 5 znaků
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ height: "220px",backgroundColor: "#ebebeb", padding: "10px",
                                                    borderRadius: "5px"}}>
                            <Form.Label>Postup</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                minLength={5}
                                required
                                style={{resize: "none" }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Minimální délka pro název je 5 znaků
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px"}}>
                            <Form.Label>URL Obrázku</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.imgUri}
                                onChange={(e) => setField("imgUri", e.target.value)}
                                minLength={5}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" style={{backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px"}}>
                            <Form.Label>Seznam ingrediencí</Form.Label>
                            {dropDowns.map((ingredient, i) => {
                                return <div key={i}>{ingredient}</div>
                            })}
                            <Form.Control.Feedback type="invalid">
                                Něco vyberte
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group style={{backgroundColor: "#ebebeb", padding: "10px", borderRadius: "5px"}}>
                        <Button onClick={handleAddDropDown}
                                style={{marginRight: "20px"}}>
                            Přidat ingredienci
                        </Button>
                        <Button onClick={handleRemoveDropDown}>Odstranit ingredienci</Button>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100">
                            <div>
                                { recipeAddCall.state === 'error' &&
                                    <div className="text-danger">Error: {recipeAddCall.error.errorMessage}</div>
                                }
                            </div>
                            <div className="d-flex flex-row gap-2">
                                <Button
                                    className="btn btn-sm"
                                    variant="secondary"
                                    onClick={handleCloseModal}
                                >
                                    Zavřít
                                </Button>
                                <Button
                                    type="submit"
                                    style={{ float: "right" }}
                                    variant="primary"
                                    className="btn btn-success btn-sm"
                                    disabled={recipeAddCall.state === 'pending'}
                                >{ recipeAddCall.state === 'pending' ? (
                                    <Icon size={0.8} path={mdiLoading} spin={true} />
                                ) : (
                                    "Přidat"
                                )}
                                </Button>
                            </div>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default NewRecipe;