
var recipes = [];


function addRecipe() {
  var title = document.getElementById("title").value;
  var ingredients = document.getElementById("ingredients").value;
  var instructions = document.getElementById("instructions").value;
  var imageInput = document.getElementById("image");
  var image = imageInput.files[0]
  

  var reader = new FileReader(); 
  
  reader.onload = function(event){
    var recipe = {
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        image: event.target.result
      };
      recipes.push(recipe);
      displayRecipes();
      
  };
  
  reader.readAsDataURL(image);
 
 

  // Reset form fields
  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("instructions").value = "";
  imageInput.value = "";
}

// Function to display the list of recipes
function displayRecipes() {
  var recipesList = document.getElementById("recipes");
  recipesList.innerHTML = "";
  
  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i];
    
    var listItem = document.createElement("li");
    
    var title = document.createElement("h3");
    title.innerText = recipe.title;
    
    var ingredients = document.createElement("p");
    ingredients.innerText = recipe.ingredients;
    
    var instructions = document.createElement("p");
    instructions.innerText = recipe.instructions;
    var image = document.createElement("img");
    image.src = recipe.image;
    image.alt = "Recipe Image";
    
    
   
    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", "editRecipe(" + i + ")");
    
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteRecipe(" + i + ")");
    
    listItem.appendChild(title);
    listItem.appendChild(ingredients);
    listItem.appendChild(instructions);
    listItem.appendChild(image);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    recipesList.appendChild(listItem);
  }
}

function editRecipe(index) {
    var recipe = recipes[index];
  
  
  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;
  
  
  var submitButton = document.getElementById("submitButton");
  submitButton.innerText = "Update";
  
 
  submitButton.removeEventListener("click", addRecipe);
  submitButton.addEventListener("click", function() {
    updateRecipe(index);
  });
}

function updateRecipe(index) {
    var title = document.getElementById("title").value;
    var ingredients = document.getElementById("ingredients").value;
    var instructions = document.getElementById("instructions").value;
    
    var recipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      image: recipes[index].image 
    };
    
    recipes[index] = recipe;
   
    document.getElementById("title").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("instructions").value = "";
    
    
    var submitButton = document.getElementById("submitButton");
    submitButton.innerText = "Add Recipe";
    
   
    submitButton.removeEventListener("click", updateRecipe);
    submitButton.addEventListener("click", addRecipe);
    
    displayRecipes();
  }


function deleteRecipe(index) {
  recipes.splice(index, 1);
  displayRecipes();
}

document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  addRecipe();
});
