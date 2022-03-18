// I don't even know how to test this.
// Need to parse the HTML from URL, then pass to soup
function makeHttpObject() {
    if("XMLHttpRequest" in window)return new XMLHttpRequest();
      else if("ActiveXObject" in window)return new ActiveXObject("Msxml2.XMLHTTP");
  }

function searchRecipe(recipeName, includeIngredients, excludedIngrediants, sortOrder="ra"){
    var JSSoup = require('jssoup').default;
    var baseUrl = "https://allrecipes.com/search/results/?"
    var queryParams = "search="+recipeName
    if (includeIngredients != null){
        includeIngredients.array.forEach(element => {
            queryParams.concat("&IngIncl", element);
        });
        
    }
    if(excludedIngrediants != null){
        excludedIngrediants.array.forEach(element => {
            queryParams.concat("&IngExcl", excludedIngrediants)
        })   
    }
    queryParams.concat("&sort", sortOrder)
    baseUrl.concat(encodeURIComponent(queryParams))


    var request = makeHttpObject();
    request.open("GET", "/", true);
    request.send(baseUrl);
    request.onreadystatechange = function() {
    if (request.readyState == 4)
        console.log(request.responseText);
    };

    var soup = new JSSoup(request.responseText);

}

