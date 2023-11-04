import React, {useMemo, useState} from "react";

import './RecipeList.css';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import RecipeCardList from "./RecipeCardList";

import { mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";


function RecipeList(props) {
    const [viewType, setViewType] = useState("grid");
    const [searchBy, setSearchBy] = useState("");

    const filteredRecipeList = useMemo(() => {
        return props.recipeList.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy, props.recipeList]);


    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    return (
        <div className={"container"}>
            <div>
                <Form className="d-flex" onSubmit={handleSearch}>

                    <Button
                        className={"butt"}
                        onClick={() =>
                            setViewType("grid")
                        }>Velký detail</Button>
                    <Button
                        className={"butt"}
                        onClick={() =>
                            setViewType("grid-small")
                        }>Malý detail</Button>
                    <Button
                        className={"butt"}
                        onClick={() =>
                            setViewType("vertical")
                        }>Seznam</Button>

                    <Form.Control
                        id={"searchInput"}
                        className={"form-style"}
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleSearchDelete}
                    />
                    <Button className={"butt"} variant="outline-success" type="submit">
                        <Icon size={1} path={mdiMagnify} />
                    </Button>
                </Form>
            </div>
            {viewType === "grid" &&
                <RecipeCardList recipeList={filteredRecipeList} cardStyle={"grid"} ingredientsList={props.ingredientsList}/>}
            {viewType === "grid-small" &&
                <RecipeCardList recipeList={filteredRecipeList} cardStyle={"grid-small"} ingredientsList={props.ingredientsList}/>}
            {viewType === "vertical" &&
                <RecipeCardList recipeList={filteredRecipeList} cardStyle={"vertical"} ingredientsList={props.ingredientsList}/>}

        </div>
        )
}

export default RecipeList;