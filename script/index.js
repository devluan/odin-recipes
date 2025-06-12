async function fetchRecipes() {
    const recipes = await fetch('https://dummyjson.com/recipes');
    const json = await recipes.json();
    return json.recipes;
}

async function displayRecipes() {
    try {
        const recipes = await fetchRecipes();
        const list = document.querySelector('#recipe-list');
        
        for (const recipe of recipes) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="./recipe.html?id=${recipe.id}">${recipe.name}</a>`;
            list.appendChild(li);
        }
    } catch (exception) {
        console.error(exception.message);
    }
}

displayRecipes();