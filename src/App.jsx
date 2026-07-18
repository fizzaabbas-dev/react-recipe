import { useState } from "react";

function App() {
  const [recipeRef, setRecipeRef] = useState(""); 
  const [meals, setMeals] = useState([]); 

  async function getRecipes(e) {
    e.preventDefault(); 
    
    try {
      const recipePromise = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeRef}`
      );
      const data = await recipePromise.json();
      setMeals(data.meals || []); 
      console.log(data.meals);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  }

  return (
    <div className="font-sans p-6 max-w-4xl mx-auto text-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Recipe's</h1>
      
      {/* Search Form */}
      <form onSubmit={getRecipes} className="mb-8 flex justify-center gap-3">
        <input 
          type="text" 
          name="recipeName" 
          id="recipeName" 
          value={recipeRef}
          onChange={(e) => setRecipeRef(e.target.value)} 
          placeholder="Search for a meal..."
          className="px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-400 w-64 shadow-sm"
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-lg shadow-md transition duration-200"
        >
          Get
        </button>
      </form>

      {/* Recipes Grid */}
      <div id="recipes" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {meals.map((ml) => (
          <div 
            key={ml.idMeal} 
            className="border border-gray-200 rounded-xl p-4 shadow-md bg-white flex flex-col items-center hover:shadow-lg transition duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{ml.strMeal}</h3>
            <img 
              src={ml.strMealThumb} 
              alt={ml.strMeal} 
              className="w-36 h-36 object-cover rounded-lg mb-3 shadow-inner"
            />
            <p className="text-sm text-gray-500 font-medium tracking-wide bg-gray-100 px-3 py-1 rounded-full">{ml.strArea}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;