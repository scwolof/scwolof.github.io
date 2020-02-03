

// Recipe pop-up
modal_close.onclick = function() {
    recipe_modal.style.display = "none";
    console.log('close modal')
}
window.onclick = function(event) {
    if (event.target == recipe_modal) {
        recipe_modal.style.display = "none";
    }
}


var recipe_grid = document.getElementsByClassName("recipe-grid")[0];
let i;

for(i = 0; i < recipes_json.length; i++) {
    let index = i
    let recipebox = document.createElement("div");
    recipebox.setAttribute('class', 'recipe-item');
    recipebox.onclick = function () {
            console.log('show modal: ' + index);
            modal_title.innerHTML = recipes_json[index].title;
            if(recipes_json[index].image) {
                console.log('show image');
                modal_image.src = recipes_json[index].image;
                modal_image.style.visibility = 'visible';
            } else {
                console.log('do not show image');
                modal_image.style.visibility = 'hidden';
            }
            recipe_modal.style.display = "block";
        };

    // Recipe title
    let title = document.createElement("h3");
    title.setAttribute('class', 'recipe-title');
    title.innerHTML = recipes_json[i].title;
    recipebox.appendChild(title)

    // Recipe image
    let image = document.createElement("img");
    image.setAttribute('class', 'recipe-image');
    if (recipes_json[i].image) {
        image.src = recipes_json[i].image;
    }
    recipebox.appendChild(image)

    recipe_grid.appendChild(recipebox);
}

recipe_modal.style.display = "none";
