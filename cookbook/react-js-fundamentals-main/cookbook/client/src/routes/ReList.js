import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import bgPicture from '../images/cookingMain.jpg';
import RecipeList from '../bricks/RecipeList'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";

const cockbook = {
    name: "LET ME COOK!"
}


function ReList() {

    const [recipesLoadCall, setRecipesLoadCall] = useState({
        state: "pending",
    });
    const [ingredientsLoadCall, setIngredientsLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipesLoadCall({ state: "error", error: responseJson });
            } else {
                setRecipesLoadCall({ state: "success", data: responseJson });
            }
        });
        fetch('http://localhost:3000/ingredient/list', {method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400){
                setIngredientsLoadCall({state: "error", error: responseJson});
            } else {
                setIngredientsLoadCall({state: "success", data: responseJson});
            }
        })
    }, []);

    function getChild() {
        switch (recipesLoadCall.state && ingredientsLoadCall.state) {
            case "pending":
                return (
                    <div className={"loading"}>
                        <Icon size={2} path={mdiLoading} spin={true}/>
                    </div>
                );
            case "success":
                return (
                    <>
                        <RecipeList recipeList={recipesLoadCall.data} ingredientsList={ingredientsLoadCall.data} />
                    </>
                );
            case "error":
                return (
                    <div className={"error"}>
                        <div>Nepodařilo se načíst data.</div>
                        <br/>
                        <pre>{JSON.stringify(recipesLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <div style={{backgroundImage: `url(${bgPicture})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "270px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"}}>
                <div className="App" style={{color: "white", fontSize: "50px"}}>
                    <h1>{cockbook.name}</h1>
                    <Outlet />
                </div>
            </div>
            {getChild()}
        </div>
    );
}

export default ReList;