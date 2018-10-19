const theSpot = document.querySelector(".foodList")
let test = 0


let div = (name, type, ethnicity, noms) => {
  let item = `<div class = "foodList">
  <h1>"${name}"</h1>
  <p>"${type}"</p>
  <p>"${ethnicity}"</p>
  <p>Ingredients:${nomIng(noms)}</p>
  <p>Country:${nomCou(noms)}</p>
  <p>Calories:${nomCal(noms)}</p>
  <p>Fat:${nomFat(noms)}</p>
  <p>Sugar:${nomSug(noms)}</p>
  </div>`
  
  return item;
  
}


// grabbing values from my api
function nomCou(noms){
  let insert = "";
  if (noms.product.hasOwnProperty("countries")) {
      insert += ` ${noms.product.countries}`
  } else {
    insert = `Nope`
  }
  return insert;
}

function nomCal(noms){
  let insert = "";
  if (noms.product.nutriments.hasOwnProperty("energy_value")) {
      insert += ` ${noms.product.nutriments.energy_value}`
  } else {
    insert = `Nope`
  }
  return insert;
}
function nomFat(noms){
  let insert = "";
  if (noms.product.nutriments.hasOwnProperty("fat")) {
      insert += ` ${noms.product.nutriments.fat}`
  } else {
    insert = `Nope`
  }
  return insert;
}
function nomSug(noms){
  let insert = "";
  if (noms.product.nutriments.hasOwnProperty("sugars_value")) {
      insert += ` ${noms.product.nutriments.sugars_value}`
  } else {
    insert = `Nope`
  }
  return insert;
}

function nomIng(noms) {
  let insert = "";
  if (noms.product.hasOwnProperty("ingredients")) {
       noms.product.ingredients.forEach((array) => {
      insert += ` ${array.text},`
    })
  } else {
    insert = `Nope`
  }
  return insert;
}
 

let daFood = [];
let onlineFood = [];

// inserting my json into my dom
const foodInsert = (foodObj, apiFood) => {
  foodObj.forEach(element => {
    apiFood.forEach((noms) => {
      if (noms.code === element.barcode) {
        theSpot.insertAdjacentHTML('beforeend', div(element.name, element.type, element.ethnicity, noms));
      }

    })
  })
};

// get data from api  
const onlineFetch = (foodObj) => {
  foodObj.forEach((a) => {
    onlineFood.push(fetch(`https://world.openfoodfacts.org/api/v0/product/${a.barcode}.json`)
      .then(data => data.json()))
  })
  return Promise.all(onlineFood);
}

// main fetch
fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    daFood = parsedFoods;
    onlineFetch(parsedFoods)
      .then(allTheThings => {
        console.log(allTheThings);
        foodInsert(parsedFoods, allTheThings);

      })

  })


