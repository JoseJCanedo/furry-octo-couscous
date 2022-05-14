// I don't even know how to test this.
// Need to parse the HTML from URL, then pass to soup

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function parseRecipeCard(recipe) {
    data = {}
    a_tag = recipe.find("a")
    
    data["name"] = a_tag.attrs.title

    class_div_tag = recipe.find("div", {"class": "card__summary"})
    data["description"] = class_div_tag.nextElement._text
    data["url"] = a_tag.attrs.href
    try{
        img_tag = recipe.find("img")
        data["image"] =  img_tag.attrs.src
    }        
    catch {
        return []
    }
    if (data != null & "image" in data){
        return(data)
    } else {
        return []
    }
}

function searchRecipe(recipeName, includeIngredients, excludedIngrediants, sortOrder="ra"){
    var JSSoup = require('jssoup').default;
    var baseUrl = "https://allrecipes.com/search/results/?"
    var queryParams = "search="+recipeName
    if (includeIngredients != null){
        includeIngredients.forEach(ingredient => {
            queryParams=queryParams.concat("&IngIncl", ingredient);
        });
        
    }
    if(excludedIngrediants != null){
        excludedIngrediants.forEach(ingredient => {
            queryParams=queryParams.concat("&IngExcl", ingredient)
        })   
    }
    queryParams=queryParams.concat("&sort", sortOrder)
    recipe_search_url = new URL(baseUrl + queryParams)
    

    var responseText = httpGet(recipe_search_url.href)

    var soup = new JSSoup(responseText);
    search_data = [];
    recipe_container = soup.findAll("div", {"class":"card__recipe"});
    recipe_container.forEach(recipe => search_data.push(parseRecipeCard(recipe)));

    return(search_data);
}

module.exports.searchRecipe = searchRecipe;

