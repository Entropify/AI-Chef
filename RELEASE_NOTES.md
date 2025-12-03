# Release Notes for AI-Chef

## Version 1.0.0

### Overview
This is the initial release of AI-Chef, a smart recipe suggestion desktop application. AI-Chef helps users discover recipes based on ingredients they have in their fridge, without requiring any API keys.

### New Features
*   **Ingredient-based Recipe Suggestions:** Users can input ingredients they have on hand and receive relevant recipe suggestions.
*   **Local Recipe Database:** The application utilizes a bundled local database of 1000 recipes, ensuring functionality without external API calls.
*   **Portable Executable:** For Windows users, the application is distributed as a single, portable `.exe` file, requiring no installation.
*   **Clean and Intuitive UI:** A user-friendly interface designed for easy ingredient input and recipe browsing.

### Bug Fixes
*   Resolved an issue where the recipe database was not correctly parsed due to a Byte Order Mark (BOM) in the JSON file.
*   Corrected a logic error in advertisement removal script that was inadvertently deleting all recipes.

### Improvements
*   Enhanced recipe suggestion algorithm for better matching based on available ingredients.
*   Improved handling of "ADVERTISEMENT" strings in recipe data by replacing them instead of removing entire recipes.

---

## How Releases Work

### 1. Automatic Release Creation
*   **Trigger**: Any merge to the `main` branch.
*   **Version**: Automatically uses the version from `package.json`.
*   **Changelog**: Generated from commit history since the last release (manual curation for user-facing notes).

### 2. PR Merge Strategy
*   All feature PRs are initially merged to the `develop` branch (if applicable, for this project, `main` serves as primary for now).
*   Critical bug fixes may be merged directly.
*   Maintainers ensure PRs merge to the appropriate branch.

### 3. Hotfixes
*   For critical bugs, create a `hotfix/fix-description` branch from `main`.
*   Fix the issue and create a PR targeting `main`.
*   After approval, merge to `main`.
