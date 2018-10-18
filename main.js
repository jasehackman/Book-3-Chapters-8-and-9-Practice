const theSpot = document.querySelector(".foodList")

let div = (name, type, ethnicity) => {
  let item = `<div class = "foodList">
    <h1>"${name}"</h1>
    <p>"${type}"</p>
    <p>"${ethnicity}"</p>
    </div>`

  return item;
  
}

fetch("http://localhost:8088/food")
  .then(foods => foods.json())
  .then(parsedFoods => {
    console.table(parsedFoods)
    
    parsedFoods.forEach(element => {
    theSpot.insertAdjacentHTML('beforeend', div(element.name, element.type, element.ethnicity));
    console.log(element.name, element.type, element.ethnicity)
    });
  
  })

