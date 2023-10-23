import bgPicture from './images/cookingMain.jpg';
import RecipeList from './bricks/RecipeList'
import recipes from './recipes.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const cockbook = {
  name: "LET ME COOK!"
}


function App() {
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
              </div>
          </div>
          <RecipeList recipeList={recipes} />
      </div>
  );
}

export default App;
