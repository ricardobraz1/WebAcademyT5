"use strict";
var _a, _b, _c;
class TV {
    constructor(model, manufacturer, resolution, size, price) {
        this.model = model;
        this.manufacturer = manufacturer;
        this.resolution = resolution;
        this.size = size;
        this.price = price;
    }
}
class CellPhone {
    constructor(model, manufacturer, memory, price) {
        this.model = model;
        this.manufacturer = manufacturer;
        this.memory = memory;
        this.price = price;
    }
}
class Bike {
    constructor(model, manufacturer, wheelSize, price) {
        this.model = model;
        this.manufacturer = manufacturer;
        this.wheelSize = wheelSize;
        this.price = price;
    }
}
class Cart {
    constructor() {
        this.items = [];
    }
    // Método público para acessar os itens do carrinho
    getItems() {
        return this.items;
    }
    addItem(product, quantity = 1) {
        const existingItem = this.items.find((item) => item.product.model === product.model);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            this.items.push({ product, quantity });
        }
        this.updateCartDisplay();
    }
    removeItem(productModel) {
        this.items = this.items.filter((item) => item.product.model !== productModel);
        this.updateCartDisplay();
    }
    updateItemQuantity(productModel, quantity) {
        const item = this.items.find((item) => item.product.model === productModel);
        if (item && quantity > 0) {
            item.quantity = quantity;
        }
        else if (item && quantity === 0) {
            this.removeItem(productModel);
        }
        this.updateCartDisplay();
    }
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
    updateCartDisplay() {
        const cartItemsElement = document.getElementById("cartItems");
        const totalPriceElement = document.getElementById("totalPrice");
        if (cartItemsElement && totalPriceElement) {
            cartItemsElement.innerHTML = this.items
                .map((item) => `<tr>
              <td>${item.product.model}</td>
              <td>
                <button class="btn btn-sm btn-danger" onclick="window.decreaseQuantity('${item.product.model}')">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-success" onclick="window.increaseQuantity('${item.product.model}')">+</button>
              </td>
              <td>R$ ${item.product.price.toFixed(2)}</td>
              <td>R$ ${(item.product.price * item.quantity).toFixed(2)}</td>
              <td><button class="btn btn-danger" onclick="window.removeItem('${item.product.model}')">Remover</button></td>
            </tr>`)
                .join("");
            totalPriceElement.textContent = this.getTotalPrice().toFixed(2);
        }
    }
}
const cart = new Cart();
// Funções globais para manipulação do carrinho
function addTv() {
    const tv = new TV("Samsung UHD", "Samsung", "4K", 55, 3000);
    cart.addItem(tv);
}
function addCellPhone() {
    const phone = new CellPhone("iPhone 12", "Apple", "128GB", 5000);
    cart.addItem(phone);
}
function addBike() {
    const bike = new Bike("Caloi 500", "Caloi", 29, 1200);
    cart.addItem(bike);
}
function increaseQuantity(model) {
    const item = cart.getItems().find((item) => item.product.model === model);
    if (item) {
        cart.updateItemQuantity(model, item.quantity + 1);
    }
}
function decreaseQuantity(model) {
    const item = cart.getItems().find((item) => item.product.model === model);
    if (item) {
        cart.updateItemQuantity(model, item.quantity - 1);
    }
}
function removeItem(model) {
    cart.removeItem(model);
}
// Expõe as funções globalmente
window.addTv = addTv;
window.addCellPhone = addCellPhone;
window.addBike = addBike;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;
// Vincula os botões de adicionar produto
(_a = document.getElementById("addTv")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTv);
(_b = document.getElementById("addCellPhone")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addCellPhone);
(_c = document.getElementById("addBike")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", addBike);
