const foodItems = document.getElementById("foods");
const details = document.getElementById("details");
//load all foods
const loadAllFoods = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => displayAllFoods(data.categories));
};
const displayAllFoods = (categories) => {
  categories.forEach((category) => {
    console.log(category);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
            <img src="${
              category.strCategoryThumb
            }" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${category.strCategory}</h5>
              <p class="card-text">
                ${category.strCategoryDescription.slice(0, 200)}
              </p>
            </div>
          </div>
        `;
    foodItems.appendChild(div);
  });
};
loadAllFoods();
//load food by search

const loadFoods = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";

  if (searchText == "") {
    const h4 = document.createElement("h4");
    h4.innerText = "Please search a food that is your favourite!!!";
    h4.classList.add("error");
    foodItems.appendChild(h4);
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => foodCard(data.meals));
  }
};
const foodCard = (foods) => {
  console.log(foods);
  foodItems.textContent = "";

  details.textContent = "";
  if (foods == null) {
    const h4 = document.createElement("h4");
    h4.classList.add("error");
    h4.innerText = `Sorry! your search food is not avilable in our meal db.....`;
    foodItems.appendChild(h4);
  } else {
    foods.forEach((food) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div onclick="loadFoodDetails('${food.idMeal}')" class="card">
            <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${food.strMeal}</h5>
              <p class="card-text">
                ${food.strInstructions.slice(0, 100)}
              </p>
            </div>
          </div>
        `;
      foodItems.appendChild(div);
    });
  }
};

//load food details by click on specific
const loadFoodDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((details) => foodDetails(details.meals[0]));
};
const foodDetails = (meal) => {
  details.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p>${meal.strInstructions.slice(0, 200)}</p>
        <a href="${meal.strYoutube}" class="btn btn-success">Watch Reciepe</a>
      </div>
    `;
  details.appendChild(div);
};
