import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import canvas from "react-bootstrap/Offcanvas";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Icon from "@mdi/react";
import {mdiAlertOctagonOutline, mdiLoading} from "@mdi/js";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NewRecipe from "./bricks/NewRecipe"


function App() {

    const [showModal, setShowModal] = useState({
        state: false,
        selectedRecipe: null
    });
    const [listRecipeCall, setListRecipeCall] = useState({
        state: "pending",
    });
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setListRecipeCall({ state: "error", error: responseJson });
            } else {
                setListRecipeCall({ state: "success", data: responseJson });
            }
        });
    }, []);

    function getRecipeListDropdown() {
        switch (listRecipeCall.state) {
            case "pending":
                return (
                    <Nav.Link disabled={true}>
                        <Icon size={1} path={mdiLoading} spin={true} /> Recipe List
                    </Nav.Link>
                );
            case "success":
                return (
                    <NavDropdown title="Select Recipe" id="navbarScrollingDropdown">
                        {listRecipeCall.data.map((recipe) => {
                            return (
                                <NavDropdown.Item
                                    onClick={() =>
                                        navigate("/recipeDetail?id=" + recipe.id)
                                    }
                                >
                                    {recipe.name}
                                </NavDropdown.Item>
                            );
                        })}
                    </NavDropdown>
                );
            case "error":
                return (
                    <div>
                        <Icon size={1} path={mdiAlertOctagonOutline} /> Error
                    </div>
                );
            default:
                return null;
        }
    }

    const handleEditRecipe = (recipe) => {
        setShowModal({
            state: true,
            selectedRecipe: recipe, // Set the selected recipe for editing
        });
    };

    return (
        <div className="App">
            <Navbar
                fixed="top"
                expand={"sm"}
                className="mb-3"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        nav
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <canvas.Header closeButton>
                            <canvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                nav
                            </canvas.Title>
                        </canvas.Header>
                        <canvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {getRecipeListDropdown()}
                                <Nav.Link onClick={() => navigate("/recipeList")}>
                                    Recepty
                                </Nav.Link>
                                <Nav.Link onClick={() => navigate("/ingredientList")}>
                                    Ingredience
                                </Nav.Link>
                                <Button onClick={() => setShowModal({state: true})} variant="success"
                                        style={{marginInline: 7}}>Nový recept</Button>
                            </Nav>
                        </canvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <NewRecipe
                showModal={showModal.state}
                setShowModal={setShowModal}
                selectedRecipe={showModal.selectedRecipe} // Pass selected recipe to NewRecipe
                onSave={(data) => {
                    console.log("Recipe saved:", data);
                    setShowModal({
                        state: false,
                        selectedRecipe: null, // Reset selected recipe after save
                    });
                }}
            />
            <Outlet />
        </div>
    );
}

export default App;
