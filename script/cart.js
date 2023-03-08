const products = [
  {
    name: "Beautiful Bouquet",
    image: "flower1.jpg",
    price: 150,
    qtty: 1,
  },
  {
    name: "Wonderful Bouquet",
    image: "flower2.jpg",
    price: 290,
    qtty: 1,
  },
  {
    name: "Stupendous Bouquet",
    image: "flower3.jpg",
    price: 210,
    qtty: 1,
  },
];
//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

console.log(products);

let productsRow = document.getElementById("products");
console.log(productsRow);

for (let product of products) {
  productsRow.innerHTML += `
  <div class="card product col my-4" style="width: 300px;">
    <img class="card-img-top mt-2 px-3" src="./images/${product.image}" alt="${product.name}">
    <div class="card-body px-3 py-0">
        <h5 class="card-title text-center mt-2">${product.name}</h5>
        <p class="card-text text-muted px-4">A beautiful bouquet for your loved one - there is something for everyone, just look around our shop!</p>
        <p class="card-text h5 text-end pe-4">${currencyFormater.format(product.price)}</p>
        <p class="card-text3 d-flex justify-content-center"><button class="btn w-75 add-button m-2"><i class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>
    </div>
  </div>
  `;
}

let cart = [];

let addBtns = document.getElementsByClassName("add-button");
console.log(addBtns);

for (let i = 0; i < addBtns.length; i++) {
  addBtns[i].addEventListener("click", function() {
    //cart.push(products[i]);
    addToCart(products[i]);
    console.table(cart);
  })
}

function addToCart(obj) {
  if(cart.find((val) => val.name == obj.name)) {
    obj.qtty++;
  } else {
    cart.push(obj);
  }

  createCart();
  total();
}

let selCart = document.getElementById("cart-items");

function createCart() {
  selCart.innerHTML = "";
  for (let val of cart) {
    selCart.innerHTML += `
    <div class="cart-row row gx-0">
      <div class="cart-item col-6 col-sm-6 my-2 d-flex align-items-center ps-2">
        <img class="cart-item-image" src="./images/${val.image}" width="100" height="100" alt="${val.name}">
        <div class="cart-item-title h6 ms-2">${val.name}</div>
      </div>
      <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
        <div class="d-flex">
          <i class="plus fs-5 bi bi-plus-circle-fill text-muted"></i>
        </div>
        <div class="text-center m-0 cart-quantity fs-5 w-25">${val.qtty}</div>
        <div class="d-flex">
          <i class="minus fs-5 bi bi-dash-circle-fill text-muted"></i>
        </div>
    </div>
    <div class="col-1 d-flex justify-content-start align-items-center">
      <i class="del fs-5 bi bi-trash3-fill"></i>
    </div>
    <div class="cart-price col-3 h5 my-auto text-end pe-5">${currencyFormater.format(val.price)}</div>
    </div>                    
  </div>
    `;
  }

  let plusBtns = document.getElementsByClassName("plus");
  let minusBtns = document.getElementsByClassName("minus");
  let deleteBtns = document.getElementsByClassName("del");

  for (let i = 0; i < plusBtns.length; i++) {
    plusBtns[i].addEventListener("click", function() {
      cart[i].qtty++;
      document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
      total();
    })

    minusBtns[i].addEventListener("click", function() {
      if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createCart();
        total();
        // -----
    } else {
      cart[i].qtty--;
      document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
      total();
    }
    })

    deleteBtns[i].addEventListener("click", function() {
      cart[i].qtty = 1;
      cart.splice(i, 1);
      createCart();
      total();
    })
  }
}

function total() {
  let total = 0;
  let amount = 0;
  for (let val of cart) {
    total = total + (val.price * val.qtty);
    if (total >= 300) {
      let disc = total / 10;
      total = total - disc;
      document.getElementById("discount").innerHTML = `Your discount is ${currencyFormater.format(disc)}!`;
      document.getElementById("disc").style.display = "none";
    } else {
      document.getElementById("discount").innerHTML = `Your discount is ${currencyFormater.format(0)}!`;
    }
    amount += val.qtty;
    document.getElementById("amount").innerHTML = amount;
  }
  document.getElementById("price").innerHTML = currencyFormater.format(total);  
}


// Sweet Alert

document.onload = setTimeout(function () {
Swal.fire({
  icon: 'warning',
  iconColor: 'hotpink',
  title: 'Discount!',
  html: `Buy flowers over € 300,-- and get<br><h3>10 % off!</h3>`,
  footer: 'what are you waiting for?',
  background: '#deeefb',
  position: 'top',
  confirmButtonText: 'Let\'s go!'
})
}, 5000);