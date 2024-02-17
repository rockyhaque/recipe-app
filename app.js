const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const foodDisplayContainer = document.querySelector("#foodDisplayContainer");
const spinner = document.querySelector("#spinner");
const modalInfo = document.querySelector("#modal-info");
const topToBtn = document.querySelector("#topToBtn");

// event listener
window.addEventListener("load", () => {
  getData(),
  scrolling()
});

window.addEventListener("scroll", scrolling)
searchBtn.addEventListener("click", getData);
topToBtn.addEventListener("click", topToScroll);

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getData();
  }
  // console.log(e.key);
});

function getData() {
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
}

function displayCards(data) {
  if (!data) {
    foodDisplayContainer.innerHTML = `
    <div class="flex justify-center">
      <h2 class="text-3xl">No Data Found!</h2>
    </div>
    
    `;
    // foodDisplayContainer.classList.remove("grid")
    return;

    // const noDataText = foodDisplayContainer.innerHTML = `
    //   <h2 class="text-3xl">No Data Found!</h2>
    // `
    // noDataText.classList.add("text-center")
    // return;
  }

  let childHtml = "";
  for (const item of data) {
    const { strMealThumb, strMeal, strInstructions, idMeal } = item;
    // console.log(item);

    let html = `
    <div class="card bg-base-100 shadow-xl">
    <figure><img src=${strMealThumb} alt="food" /></figure>
    <div class="card-body">
        <h2 class="card-title">${strMeal}</h2>
        <p>${strInstructions.slice(0, 100)}...</p>
        <div class="card-actions justify-end" onClick="modalFunc(${idMeal})">
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

function modalFunc(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      modalInfo.innerHTML = "";
      let html = `
        <div class="card card-compact bg-base-100 shadow-xl">
            <figure>
              <img
                class="w-full h-96 object-cover"
                src=${data.meals[0].strMealThumb}
                alt="images"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${data.meals[0].strMeal}</h2>
              <p>
              ${data.meals[0].strInstructions}
              </p>
            </div>
          </div>
      `;
      modalInfo.innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}

function topToScroll() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrolling(){
  
  const px = window.pageYOffset;
  if(px > 500){
    topToBtn.classList.remove("opacity-0", "invisible")
  } else{
    topToBtn.classList.add("opacity-0", "invisible")
  }
}
