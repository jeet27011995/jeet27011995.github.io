let clothingcards = document.getElementById("clothingcards");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCard = () => {
  return (clothingcards.innerHTML = clothItemData

    .map((x) => {
      let { id, img, name, brand, price } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `<div class="card">
    
      <div class="img">
        <img
          src="${img}"
        />
      </div>
      <div class="details">
        <h3>${name}</h3>
        <h4>${brand}</h4>
        <div class="price-quality">
        <h5>Rs ${price}</h5>
        <i onclick ="decrement(${id})" class="bi bi-dash-lg">-</i>
        <div id="${id}" class="quantity">
        ${search.item === undefined ? 0 : search.item}</div>
        <i onclick ="increment(${id})" class="bi bi-plus-lg">+</i>
        </div>
      </div>
    
  </div>`;
    })
    .join(""));
};
generateCard();
let asscessoriescards = document.getElementById("asscessoriescards");

//let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateAcess = () => {
  return (asscessoriescards.innerHTML = accessItemdata
    .map((y) => {
      let { id, img, name, brand, price } = y;
      let search = basket.find((x) => x.id === id) || [];
      return `<div class="card" id="">
    
      <div class="img">
        <img
          src="${img}"
        />
      </div>
      <div class="details">
        <h3>${name}</h3>
        <h4>${brand}</h4>
        <div class="price-quality">
        <h5>Rs ${price}</h5>
        <i onclick ="decrement(${id})" class="bi bi-dash-lg">-</i>
        <div id="${id}" class="quantity">
        ${search.item === undefined ? 0 : search.item}
        </div>
        <i onclick ="increment(${id})" class="bi bi-plus-lg">+</i>
        </div>
      </div>
      
    
  </div>`;
    })
    .join(""));
};
generateAcess();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  // console.log(basket);
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((x) => x.id === selectedItem);
  if (search === undefined) return;
  else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }
  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  // console.log(basket);

  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

//${search.item === undefined? 0 : search.item}
calculation();
