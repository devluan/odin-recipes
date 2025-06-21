function getRecipeId() {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');
    if (id == null) throw new Error("Invalid id");
    return id;
}

async function fetchRecipe(id) {
    const recipe = await fetch(`https://dummyjson.com/recipes/${id}`);
    return await recipe.json();
}

async function displayRecipe() {
    try {
        const recipe = await fetchRecipe(getRecipeId());

        document.title = recipe.name;
        const name = document.querySelector('#name');
        const img = document.querySelector('#recipe-image');
        const description = document.querySelector('#description');
        const ingredients = document.querySelector('#ingredients');
        const steps = document.querySelector('#steps');

        name.textContent = recipe.name;
        img.src = recipe.image;
        description.textContent = `The ${recipe.name} recipe, a classic from ${recipe.cuisine} cuisine, serves ${recipe.servings} people, has a ${recipe.difficulty.toLowerCase()} difficulty level, takes ${recipe.prepTimeMinutes} minutes to prepare and ${recipe.cookTimeMinutes} minutes to cook, with approximately ${recipe.caloriesPerServing} calories per serving.`;

        for (const item of recipe.ingredients) {
            const li = document.createElement('li');
            li.textContent = item;
            ingredients.appendChild(li);
        }

        for (const step of recipe.instructions) {
            const li = document.createElement('li');
            li.textContent = step;
            steps.appendChild(li);
        }
    } catch(exception) {
        window.location = "/";
    }
}

displayRecipe();