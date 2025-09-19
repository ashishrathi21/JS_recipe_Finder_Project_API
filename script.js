let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");
let resultTitle = document.querySelector(".results h2");
let searchTerm = document.querySelector("#searchTerm");
let resultsContainer = document.querySelector(".card-grid");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchRecipes(query) {
  try {
    const result = await fetch(`${url}${query}`);
    const data = await result.json();

    resultsContainer.innerHTML = "";

    if (!data.meals) {
      resultsTitle.textContent = `No results found for "${query}"`;
      return;
    }

    data.meals.forEach((meal) => {
      let card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <span class="tag">${meal.strCategory}</span>
        <p class="view">view recipe</p>
      `;
      resultsContainer.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

searchBtn.addEventListener("click", function () {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});

searchInput.addEventListener("keyup", function (keyPressed) {
  if (keyPressed.key == "Enter") {
    searchBtn.click();
  }
});
