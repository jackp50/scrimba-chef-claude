export async function getRecipeFromChefClaude(ingredientsArr) {
    const response = await fetch("https://scrimba-chef-claude.onrender.com/get-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsArr }),
    });

    const data = await response.json();
    return data.recipe;
}