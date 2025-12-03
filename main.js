const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#0a0a0f',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        show: false,
        autoHideMenuBar: true
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

ipcMain.handle('get-recipes', async (event, ingredients) => {
    const recipesPath = path.join(__dirname, 'data', 'recipes.json');
    let recipesData = fs.readFileSync(recipesPath, 'utf8');

    // Strip BOM if present
    if (recipesData.charCodeAt(0) === 0xFEFF) {
        recipesData = recipesData.slice(1);
    }
    
    const recipes = JSON.parse(recipesData);

    const scoredRecipes = recipes.map(recipe => {
        let score = 0;
        const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase());
        ingredients.forEach(userIngredient => {
            if (recipeIngredients.some(recipeIngredient => recipeIngredient.includes(userIngredient.toLowerCase()))) {
                score++;
            }
        });
        const matchPercentage = (score / recipe.ingredients.length) * 100;
        return { ...recipe, matchPercentage };
    }).filter(recipe => recipe.matchPercentage > 0);

    scoredRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return scoredRecipes.slice(0, 3);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
