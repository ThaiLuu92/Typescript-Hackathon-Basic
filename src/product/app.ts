interface Product {
  name: string;
  price: number;
  avatar: string;
}

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([]));
}

const productForm = document.getElementById("productForm") as HTMLFormElement;
const productList = document.getElementById("productList");

productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addProduct();
});

function getProducts(): Product[] {
  const productsString = localStorage.getItem("products") || "[]";
  return JSON.parse(productsString) as Product[];
}

function saveProducts(products: Product[]): void {
  localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts() {
  const products = getProducts();

  if (productList) {
    let productsHTML = "";

    products.forEach((product, index) => {
      productsHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <img src="${product.avatar}" alt="">
                    </td>
                    <td id="td-btn">
                        <button id="edit-btn" onclick="editProduct(${index})">Sửa</button>
                        <button id="del-btn" onclick="deleteProduct(${index})">Xóa</button>
                    </td>
                </tr>
            `;
    });

    productList.innerHTML = productsHTML;
  }
}

function addProduct() {
  const productNameInput = document.getElementById(
    "product-name"
  ) as HTMLInputElement;
  const productPriceInput = document.getElementById(
    "product-price"
  ) as HTMLInputElement;
  const productAvatarInput = document.getElementById(
    "product-avatar"
  ) as HTMLInputElement;

  const name = productNameInput.value.trim();
  const price = Number(productPriceInput.value);
  const avatar = productAvatarInput.value.trim();

  if (name === "" || isNaN(price) || avatar === "") {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  const products = getProducts();
  const newProduct: Product = {
    name: name,
    price: price,
    avatar: avatar,
  };

  products.push(newProduct);
  saveProducts(products);
  productNameInput.value = "";
  productPriceInput.value = "";
  productAvatarInput.value = "";
  displayProducts();
}

function deleteProduct(index: number) {
  const products = getProducts();

  if (index >= 0 && index < products.length) {
    products.splice(index, 1);
    saveProducts(products);
    displayProducts();
  }
}

function editProduct(index: number) {
  const products = getProducts();

  if (index >= 0 && index < products.length) {
    const product = products[index];

    const newName = prompt("Sửa tên sản phẩm", product.name);
    const newPrice = prompt("Sửa giá sản phẩm", product.price.toString());
    const newAvatar = prompt("Sửa đường dẫn ảnh sản phẩm", product.avatar);

    if (newName !== null && newPrice !== null && newAvatar !== null) {
      product.name = newName;
      product.price = Number(newPrice);
      product.avatar = newAvatar;
      saveProducts(products);
      displayProducts();
    }
  }
}

displayProducts();
