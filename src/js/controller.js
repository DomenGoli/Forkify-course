import * as model from "./model.js"
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

import 'core-js/stable'
import 'regenerator-runtime/runtime'
// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

// if(module.hot) {
//     module.hot.accept()
// }


///////////////////////////////////////

const controlRecipe = async function () {
    try {
        const id = window.location.hash.slice(1)

        if(!id) return

        recipeView.renderSpinner()

        // 0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());
        
        // 1) Updating bookmarks view
        bookmarksView.update(model.state.bookmarks)

        // 2) Loading recipe
        await model.loadRecipe(id) // funkcija ne returna nic zato ne rabimo shranit. blocka execution
        
        // 3) Rendering recipe
        recipeView.render(model.state.recipe)
        


    } catch (err) {
        recipeView.renderError()
        console.error(err)
    }
};


const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner()

        // 1) Get search query
        const query = searchView.getQuery()
        if(!query) return;

        // 2) Load search results
        await model.loadSearchResults(query)

        // 3) Render results
        resultsView.render(model.getSearchResultsPage());

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search)
    }catch(err){
        console.log(err);
        console.error(err)
    }
    
}
// controlSearchResults()
const controlPagination = function(goToPage) {
    // 1) Render NEW results
    resultsView.render(model.getSearchResultsPage(goToPage));
    // 2) Render NEW pagination buttons
    paginationView.render(model.state.search);
}


const controlServings = function(newServings) {
    // Update the recipe servings (in state)
    model.updateServings(newServings)


    // Update the recipe view
    // recipeView.render(model.state.recipe)
    recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
    // 1) Add or remove bookmark
    if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
    else model.deleteBookmark(model.state.recipe.id)
    
    // 2) Render bookmark
    recipeView.update(model.state.recipe)

    // 3) Render bookmarks
    bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
    try {
    
    // Show loading spinner
    addRecipeView.renderSpinner()
    
    // Upload the new recipe
    await model.uploadRecipe(newRecipe)

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage()

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Change In URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`) // change url brez relodanja strani
    
    // Close form window
    setTimeout(function() {
        addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)

    } catch(err) {
        addRecipeView.renderError(err.message)
    }
    
}
    

const init = function() {
    // subscriber publisher pattersn
    bookmarksView.addHandlerRender(controlBookmarks)
    recipeView.addHendlerRender(controlRecipe)
    recipeView.addHendlerUpdateServings(controlServings)
    recipeView.addHendlerAddBookmark(controlAddBookmark)
    searchView.addHandlerSearch(controlSearchResults)
    paginationView.addHandlerClick(controlPagination)
    addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()
