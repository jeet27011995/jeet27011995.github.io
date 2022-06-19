let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

console.log(clothItemData);

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

//${search.item === undefined? 0 : search.item}
calculation();

let generateCardItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        console.log(x);
        let { id, item } = x;
        var search =
          clothItemData.find((y) => y.id === id) ||
          accessItemdata.find((y) => y.id === id) ||
          [];
        return `
        <div class ="cart-item">
        <img width="120" alt="clothing"src="${search.img}"/>
        
        <div class="details">
               <div class="title-price-x">
                <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">Rs ${search.price}</p>
                    
                </h4>
                <i onclick="removeItem(${id})" style="color:red;"class="fa-solid fa-xmark"></i>
             </div>
            <div class="cart-buttons">
            <i onclick ="decrement(${id})" class="bi bi-dash-lg">-</i>
        <div id="${id}" class="quantity">
        ${item}
        </div>
        <i onclick ="increment(${id})" class="bi bi-plus-lg">+</i></div>
            <h3>Total - Rs: ${item * search.price}</h3>
          </div>

        </div>
        
        `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Emplty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to home</button>
    </a>`;
  }
};
generateCardItems();

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
  generateCardItems();
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
  generateCardItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);

  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
  generateCardItems();
  TotalAmount();
  calculation();
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        var search =
          clothItemData.find((y) => y.id === id) ||
          accessItemdata.find((y) => y.id === id) ||
          [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    //console.log(amount);

    label.innerHTML = `
    <h2>Total bill: Rs: ${amount}</h2>
    <button class="checkout">Checkout</Button>
    <button onclick="clearCart()" class="removeAll">Remove All</Button>`;
  } else return;
};

TotalAmount();

let clearCart = () => {
  basket = [];
  generateCardItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
