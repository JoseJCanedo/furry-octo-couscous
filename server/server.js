const recipesearch = require("./routes/find_recipe")
const express = require("express");  
const PORT = process.env.PORT || 5000;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("/api/hello", (req, res) => {
    res.status(200).send("Hello World!");
});

server.get("/api/recipe", (req, res) => {
    console.log("/api/recipe")
    var details = recipesearch.searchRecipe("brownies", ["almond butter"], null, 'ra');
    res.status(200).send(details);
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));