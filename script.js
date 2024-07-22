document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const recipeList = document.getElementById('recipe-list');

    // Fetch recipes from the local JSON file
    fetch('recipes.json')
        .then(response => response.json())
        .then(recipes => {
            displayRecipes(recipes);

            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredRecipes = recipes.filter(recipe => 
                    recipe.name.toLowerCase().includes(searchTerm) ||
                    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
                );
                displayRecipes(filteredRecipes);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        if (recipes.length === 0) {
            recipeList.innerHTML = '<p>No recipes found.</p>';
            return;
        }
        recipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.classList.add('recipe-item');

            const recipeName = document.createElement('h2');
            recipeName.textContent = recipe.name;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}`;

            const recipeInstructions = document.createElement('p');
            recipeInstructions.innerHTML = `<strong>Instructions:</strong> ${recipe.instructions}`;

            recipeItem.appendChild(recipeName);
            recipeItem.appendChild(recipeIngredients);
            recipeItem.appendChild(recipeInstructions);
            
            recipeList.appendChild(recipeItem);
        });
    }
});

