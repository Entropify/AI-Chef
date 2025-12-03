// State
let ingredients = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderIngredients();
});

function setupEventListeners() {
    document.getElementById('addIngredientBtn').addEventListener('click', addIngredient);
    document.getElementById('ingredientInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addIngredient();
        }
    });
    document.getElementById('getRecipesBtn').addEventListener('click', getRecipeSuggestions);
}

// Ingredient Management
function addIngredient() {
    const input = document.getElementById('ingredientInput');
    const ingredient = input.value.trim();

    if (!ingredient) return;

    // Check for duplicates
    if (ingredients.some(i => i.toLowerCase() === ingredient.toLowerCase())) {
        input.value = '';
        return;
    }

    ingredients.push(ingredient);
    input.value = '';
    renderIngredients();
    hideResults();
    hideError();
}

function removeIngredient(index) {
    ingredients.splice(index, 1);
    renderIngredients();
    hideResults();
}

function renderIngredients() {
    const container = document.getElementById('ingredientsTags');

    if (ingredients.length === 0) {
        container.innerHTML = '<div class="empty-state">No ingredients added yet. Start typing to add some!</div>';
        document.getElementById('getRecipesBtn').disabled = true;
        return;
    }

    document.getElementById('getRecipesBtn').disabled = false;

    container.innerHTML = ingredients.map((ingredient, index) => `
        <div class="tag">
            <span>${escapeHtml(ingredient)}</span>
            <button class="tag-remove" data-index="${index}" aria-label="Remove ${escapeHtml(ingredient)}">
                ×
            </button>
        </div>
    `).join('');

    // Add event listeners to the remove buttons
    container.querySelectorAll('.tag-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = parseInt(event.currentTarget.dataset.index, 10);
            removeIngredient(index);
        });
    });
}

// Recipe Suggestions
async function getRecipeSuggestions() {
    if (ingredients.length === 0) {
        showError('Please add at least one ingredient!');
        return;
    }

    showLoading();
    hideError();
    hideResults();

    try {
        const recipes = await window.electronAPI.getRecipes(ingredients);
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        showError(error.message || 'Failed to get recipe suggestions.');
    }
}

// Display Functions
function showLoading() {
    document.getElementById('loadingState').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
}

function displayRecipes(recipes) {
    hideLoading();
    const container = document.getElementById('recipeContent');

    if (!recipes || recipes.length === 0) {
        container.innerHTML = '<p class="text-center">No recipes found matching your ingredients. Try adding more!</p>';
        document.getElementById('resultsContainer').classList.remove('hidden');
        return;
    }

    container.innerHTML = recipes.map(recipe => `
        <div class="recipe">
            <h3>${escapeHtml(recipe.title)}</h3>
            <h4>Ingredients:</h4>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')}
            </ul>
            <h4>Instructions:</h4>
            <ol>
                ${recipe.instructions.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
            </ol>
            <p><strong>Match:</strong> ${recipe.matchPercentage.toFixed(0)}%</p>
        </div>
    `).join('');

    document.getElementById('resultsContainer').classList.remove('hidden');
    document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideResults() {
    document.getElementById('resultsContainer').classList.add('hidden');
}

function showError(message) {
    const container = document.getElementById('errorContainer');
    container.innerHTML = `
        <div class="error-message">
            <strong>⚠️ Error</strong>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function hideError() {
    document.getElementById('errorContainer').innerHTML = '';
}

// Utility Functions
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
