"use strict";
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([]));
}
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addProduct();
});
function getProducts() {
    const productsString = localStorage.getItem("products") || "[]";
    return JSON.parse(productsString);
}
function saveProducts(products) {
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
    const productNameInput = document.getElementById("product-name");
    const productPriceInput = document.getElementById("product-price");
    const productAvatarInput = document.getElementById("product-avatar");
    const name = productNameInput.value.trim();
    const price = Number(productPriceInput.value);
    const avatar = productAvatarInput.value.trim();
    if (name === "" || isNaN(price) || avatar === "") {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }
    const products = getProducts();
    const newProduct = {
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
function deleteProduct(index) {
    const products = getProducts();
    if (index >= 0 && index < products.length) {
        products.splice(index, 1);
        saveProducts(products);
        displayProducts();
    }
}
function editProduct(index) {
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
