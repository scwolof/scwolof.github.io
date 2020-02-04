
function remove_modal_element (id) {
    element = document.getElementById(id);
    if (element) {
        modal_content.removeChild(element);
    }
}

function closeModal () {
    // Serves
    remove_modal_element('modal_description');
    remove_modal_element('modal_image');
    remove_modal_element('modal_serves_title');
    remove_modal_element('modal_serves');
    remove_modal_element('modal_ingredient_title');
    remove_modal_element('modal_ingredient_section');
    remove_modal_element('modal_instructions_title');
    remove_modal_element('modal_instructions_section');
    remove_modal_element('modal_note_title');
    remove_modal_element('modal_note');

    console.log('close modal');
    recipe_modal.style.display = "none";
}

modal_close.onclick = function() {
    recipe_modal.style.display = "none";
        closeModal();
}

window.onclick = function(event) {
    if (event.target == recipe_modal) {
        closeModal();
    }
}


var recipe_grid = document.getElementsByClassName("recipe-grid")[0];

for(let i = 0; i < recipes_json.length; i++) {
    let index = i;
    let recipebox = document.createElement("div");
    recipebox.setAttribute('class', 'recipe-item');

    recipebox.onclick = function () {
            console.log('show modal: ' + index);
            // Title
            modal_title.innerHTML = recipes_json[index].title;
            // Serves
            if(recipes_json[index].description) {
                txt = document.createElement("p");
                txt.setAttribute('class', 'modal-section-text');
                txt.setAttribute('id', 'modal_description');
                txt.innerHTML = recipes_json[index].description;
                modal_content.appendChild(txt);
            }
            // Image
            if(recipes_json[index].image) {
                image = document.createElement("img");
                image.setAttribute('class', 'modal-image');
                image.setAttribute('id', 'modal_image');
                image.src = recipes_json[index].image;
                modal_content.appendChild(image);
                console.log('show image');
            }
            // Serves
            if(recipes_json[index].serves) {
                title = document.createElement("h3");
                title.setAttribute('class', 'modal-section-title');
                title.setAttribute('id', 'modal_serves_title');
                title.innerHTML = "Serves:";
                modal_content.appendChild(title);

                txt = document.createElement("p");
                txt.setAttribute('class', 'modal-section-text');
                txt.setAttribute('id', 'modal_serves');
                txt.innerHTML = recipes_json[index].serves;
                modal_content.appendChild(txt);
            }
            // Ingredients
            if(recipes_json[index].ingredients) {
                title = document.createElement("h3");
                title.setAttribute('class', 'modal-section-title');
                title.setAttribute('id', 'modal_ingredient_title');
                title.innerHTML = "Ingredients:";
                modal_content.appendChild(title);

                section = document.createElement("div");
                section.setAttribute('id', 'modal_ingredient_section');
                for(let j=0; j < recipes_json[index].ingredients.length; j++) {
                    if (recipes_json[index].ingredients[j][0] == '*') {
                        input = document.createElement("input");
                        input.setAttribute('id', 'input'+j);
                        input.setAttribute('type', 'checkbox');
                        section.appendChild(input)

                        txt = document.createElement("label");
                        txt.setAttribute('class', 'modal-section-text');
                        txt.htmlFor = 'input'+j;
                        txt.innerHTML = ' ' + recipes_json[index].ingredients[j]
                            .substring(1,recipes_json[index].ingredients[j].length)
                            .trim();
                        section.appendChild(txt)
                        breakline = document.createElement("br");
                        section.appendChild(breakline)
                    } else {
                        txt = document.createElement("p");
                        txt.setAttribute('class', 'modal-section-text');
                        txt.innerHTML = recipes_json[index].ingredients[j];
                        section.appendChild(txt)
                    }

                }
                modal_content.appendChild(section);
            }
            // Instructions
            if(recipes_json[index].instructions) {
                title = document.createElement("h3");
                title.setAttribute('class', 'modal-section-title');
                title.setAttribute('id', 'modal_instructions_title');
                title.innerHTML = "Instructions:";
                modal_content.appendChild(title);

                section = document.createElement("div");
                section.setAttribute('id', 'modal_instructions_section');
                for(let j=0; j < recipes_json[index].instructions.length; j++) {
                    if (recipes_json[index].instructions[j][0] == '*') {
                        input = document.createElement("input");
                        input.setAttribute('id', 'input'+j);
                        input.setAttribute('type', 'checkbox');
                        section.appendChild(input)

                        txt = document.createElement("label");
                        txt.setAttribute('class', 'modal-section-text');
                        txt.htmlFor = 'input'+j;
                        txt.innerHTML = ' ' + recipes_json[index].instructions[j]
                            .substring(1,recipes_json[index].instructions[j].length)
                            .trim();
                        section.appendChild(txt)
                        breakline = document.createElement("br");
                        section.appendChild(breakline)
                    } else {
                        txt = document.createElement("p");
                        txt.setAttribute('class', 'modal-section-text');
                        txt.innerHTML = recipes_json[index].instructions[j];
                        section.appendChild(txt)
                    }

                }
                modal_content.appendChild(section);
            }
            // Serves
            if(recipes_json[index].note) {
                title = document.createElement("h3");
                title.setAttribute('class', 'modal-section-title');
                title.setAttribute('id', 'modal_note_title');
                title.innerHTML = "Notes:";
                modal_content.appendChild(title);

                txt = document.createElement("p");
                txt.setAttribute('class', 'modal-section-text');
                txt.setAttribute('id', 'modal_note');
                txt.innerHTML = recipes_json[index].note;
                modal_content.appendChild(txt);
            }
            // Show modal block
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


var $grid = $('.recipe-grid').isotope({
  itemSelector: '.recipe-item',
  layoutMode: 'fitRows',
  /*
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
  */
});
