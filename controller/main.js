let products = [];
getProduct();
function getProduct() {
  getProductsApi()
    .then((response) => {
      products = response.data
      // for (i = 0; i < products.length; i++) {
      //     console.log(products[i])
      // }
      // let newP =products.map((product) => {
      //     return console.log(product)
      // })
      display(products)

    })
    .catch((err) => console.log(err))
}
// Hàm hiện sản phẩm
function display(products) {


  let html = "";
  let newProducts = products.reduce((result, product, index) => {
    return html = result + `
            <div class="card py-3">
            <div class="top-bar">
              <i class="fab fa-apple"></i>
              <em class="stocks">In Stock</em>
            </div>
            <div class="img-container">
              <img
                class="product-img"
                src="${product.img}"
                alt=""
              />
              <div class="out-of-stock-cover"><span>Out Of Stock</span></div>
            </div>
            <div class="details">
              <div class="name-fav">
                <strong class="product-name">${product.name}</strong>
                <button onclick='this.classList.toggle("fav")' class="heart">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
              <div class="wrapper">
                <h5>Your next computer is not a computer</h5>
                <p>
                  ${product.screen} <br/>
                  ${product.backCamera} <br/>
                  ${product.frontCamera} <br/>
                  ${product.desc}
                </p>
              </div>
              <div class="purchase">
                <p class="product-price">${product.price + " $"}</p>
                <span class="btn-add">
                  <div>
                    <button class="add-btn" data-type="add" data-id="${product.id}">
                      Add <i class="fas fa-chevron-right"></i>
                    </button></div
                ></span>
              </div>
            </div>
          </div> 
            `
  }, '')
  // console.log(newProducts)
  document.querySelector('.main-cart').innerHTML = newProducts


}
// Hàm lọc sản phẩm
document.querySelector("#filter").addEventListener("change", (e) => {
  console.log(e.target.value);
  let valueSelect = e.target.value;
  // for (i = 0; i < products.length; i++) {
  //     console.log(products[i].type);

  // }
  // let stampProducts = [];
  // products.forEach((product) => {
  //     let typeProduct = product.type
  //     if (valueSelect == typeProduct) {
  //         // console.log("true")
  //         stampProducts.push(product)
  //         console.log(stampProducts)
  //         display(stampProducts)
  //     }
  // })
  const stamp = products.filter((product) => {
    // return product.type == valueSelect;
    return product.type == valueSelect;
  })
  console.log(stamp)
  display(stamp)

})

function filter() {
}


// filter, map, => new Array;
// find, findIndex, tìm trong mảng => hứng = 1 biến;
// forEach => duyệt mảng;


// HIỆN GIỎ HÀNG 
document.querySelector('.filter__nav .button-cart i').addEventListener('click', (e) => {
  // console.log('click')
  const showCart = document.querySelector('.filter__nav .button-cart .cart')
  // showCart.style.transform = 'translateX(0)';
  showCart.style.display = 'block';

})
// TẮT GIỎ HÀNG
document.querySelector(".cart .cart__header button").addEventListener('click', (e) => {
  // console.log("123")
  const closeCart = document.querySelector('.filter__nav .button-cart .cart')
  // closeCart.style.transform = 'translateX(500px)';
  closeCart.style.display = 'none';
})

let cartArray = [];
let quantity = 1;
// Lắng nghe sự kiên click để add đúng sản phẩm vào giỏ hàng
document.querySelector(".main-cart").addEventListener('click', (e) => {
  const elementType = e.target.getAttribute('data-type')
  const elementId = e.target.getAttribute('data-id')

  // if (elementType === 'add') {
  //     product = products.find((product) => {
  //         return product.id === elementId
  //     })
  //     if (product !== undefined) {
  //         cartArray.push(product);
  //         console.log(cartArray);
  //         displayCart(cartArray)
  //     }
  // }
  if (elementType === 'add') {
    let product = products.find((product) => {
      return product.id === elementId
    })
    console.log(product.id)
    // tạo đối tượng mới
    let cartItem = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        screen: product.screen,
        backCamera: product.backCamera,
        frontCamera: product.frontCamera,
        img: product.img,
        type: product.type,
        desc: product.desc,
      },
      quantity: 1
    };
    // console.log(cartItem)

    // tìm ttrong giỏ hàng
    let stamp = cartArray.find((item) => {
      return item.product.id == product.id
    })
    console.log(stamp)

    // nếu stamp = undifined thì add vào giỏ hàng
    if (stamp == undefined) {
      cartArray.push(cartItem);
      console.log(cartArray);
    } else {
      stamp.quantity++;
      console.log(stamp)
    }


    // nếu stamp khác undefined => tìm đc 1 object trong cart, trùng với object đang muốn thêm vào (dựa vào id) => tăng quantity lên 1 đơn vị
  }
  displayCart(cartArray);

}
);



// HÀM HIỆN NHỮNG SẢN PHẨM ĐÃ THÊM VÀO GIỎ HÀNG
const displayCart = (arr) => {
  let html = "";
  newArray = arr.reduce((result, products, index) => {
    return html = result + `
        <div class="cart__item">
            <div class="cart__image">
            <img
                src="${products.product.img}"
                alt=""
            />
            </div>
            <strong>${products.product.name}</strong>
            <div class="quantity">
            <form>
            <div class="value__button" data-type="decrease" data-id="${products.product.id}">-</div>
            ${products.quantity}
            <div class="value__button" data-type="increase"  data-id="${products.product.id}">+</div>
            </form>
            
            </div>
            <p>${products.product.price}</p>
            <button data-type="delete" data-id="${products.product.id}">xóa</button>
        </div>
        `


  }, '');
  document.querySelector(".cart__body .cart__list").innerHTML = html;
}

// Lắng nghe sự kiện click button xóa để xóa sản phẩm
document.querySelector('.cart').addEventListener('click', (e) => {
  const deleteType = e.target.getAttribute("data-type");
  const deleteId = e.target.getAttribute("data-id");
  const temp = cartArray.findIndex((product) => {
    // console.log(product.product.id, deleteId)
    return product.product.id === deleteId;
  })
  if (deleteType === "delete") {
    cartArray.splice(temp, 1);
    displayCart(cartArray);
  }
})

// Lắng nghe sự kiện hai button Purchase và Clear
document.querySelector('.cart').addEventListener('click', (e) => {
  const purchaseType = (e.target.getAttribute("data-type"));
  const clearType = (e.target.getAttribute("data-type"));
  cartArray = []
  if (purchaseType === "purchase" || clearType === "clear") {
    displayCart(cartArray);

  }
})

// Lắng nghe sự kiện tăng số lượng sản phẩm
document.querySelector(".cart__body").addEventListener('click', (e) => {
  const type = e.target.getAttribute("data-type")
  const id = e.target.getAttribute("data-id")
  const temp = cartArray.filter((p) => {
    // console.log(p.product.id, id)
    return p.product.id == id;
  })
  console.log(temp[0])
  if (type === "increase") {
    temp[0].quantity++;
    // console.log( = temp.quantity + 1)

  } else if (type === "decrease") {
    console.log("D")

  }
})