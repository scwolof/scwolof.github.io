
var recipe_grid = document.getElementsByClassName("recipe-grid")[0];

for(var i = 0; i < recipes_json.length; i++) {
    var recipebox = document.createElement("div");
    recipebox.setAttribute('class', 'recipe-item');

    var title = document.createElement("h3");
    title.setAttribute('class', 'recipe-title');
    title.innerHTML = recipes_json[i].title;

    var image = document.createElement("img");
    image.setAttribute('class', 'recipe-image');
    if (recipes_json[i].image) {
        image.src = recipes_json[i].image;
    }

    recipebox.appendChild(title)
    recipebox.appendChild(image)
    recipe_grid.appendChild(recipebox);
}

