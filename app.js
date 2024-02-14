const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const foodDisplayContainer = document.querySelector("#foodDisplayContainer");
const spinner = document.querySelector("#spinner");

// event listener
searchBtn.addEventListener("click", function () {
  spinner.classList.remove("hidden");
  const foodName = searchInput.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      spinner.classList.add("hidden");
      displayCards(data.meals);
    })
    .catch((err) => {
      console.log(err);
    });
});

function displayCards(data) {
  let childHtml = "";
  for (const item of data) {
    const { strMealThumb, strMeal, strInstructions } = item;

    let html = `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src=${strMealThumb} alt="food" /></figure>
    <div class="card-body">
        <h2 class="card-title">${strMeal}</h2>
        <p>${strInstructions.slice(0, 100)}</p>
        <div class="card-actions justify-end">
        <label for="my-modal-6" class ="btn btn-warning text-white">
            View Details
        </label>
        </div>
    </div>
    </div>
    `;

    childHtml = childHtml + html;
  }

  foodDisplayContainer.innerHTML = childHtml;
}
