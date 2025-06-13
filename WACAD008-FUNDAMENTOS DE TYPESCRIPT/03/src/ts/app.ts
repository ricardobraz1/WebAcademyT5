interface Product {
  model: string;
  manufacturer: string;
  price: number;
}

class TV implements Product {
  constructor(
    public model: string,
    public manufacturer: string,
    public resolution: string,
    public size: number,
    public price: number
  ) {}
}

class CellPhone implements Product {
  constructor(
    public model: string,
    public manufacturer: string,
    public memory: string,
    public price: number
  ) {}
}

class Bike implements Product {
  constructor(
    public model: string,
    public manufacturer: string,
    public wheelSize: number,
    public price: number
  ) {}
}

class Cart<T extends Product> {
  private items: { product: T; quantity: number }[] = [];

  // Método público para acessar os itens do carrinho
  getItems() {
    return this.items;
  }

  addItem(product: T, quantity: number = 1): void {
    const existingItem = this.items.find((item) => item.product.model === product.model);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.updateCartDisplay();
  }

  removeItem(productModel: string): void {
    this.items = this.items.filter((item) => item.product.model !== productModel);
    this.updateCartDisplay();
  }

  updateItemQuantity(productModel: string, quantity: number): void {
    const item = this.items.find((item) => item.product.model === productModel);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (item && quantity === 0) {
      this.removeItem(productModel);
    }
    this.updateCartDisplay();
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  updateCartDisplay(): void {
    const cartItemsElement = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");

    if (cartItemsElement && totalPriceElement) {
      cartItemsElement.innerHTML = this.items
        .map(
          (item) =>
            `<tr>
              <td>${item.product.model}</td>
              <td>
                <button class="btn btn-sm btn-danger" onclick="window.decreaseQuantity('${item.product.model}')">-</button>
                ${item.quantity}
                <button class="btn btn-sm btn-success" onclick="window.increaseQuantity('${item.product.model}')">+</button>
              </td>
              <td>R$ ${item.product.price.toFixed(2)}</td>
              <td>R$ ${(item.product.price * item.quantity).toFixed(2)}</td>
              <td><button class="btn btn-danger" onclick="window.removeItem('${item.product.model}')">Remover</button></td>
            </tr>`
        )
        .join("");

      totalPriceElement.textContent = this.getTotalPrice().toFixed(2);
    }
  }
}

const cart = new Cart<Product>();

// Funções globais para manipulação do carrinho/ definição de vlores globais
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

function increaseQuantity(model: string) {
  const item = cart.getItems().find((item) => item.product.model === model);
  if (item) {
    cart.updateItemQuantity(model, item.quantity + 1);
  }
}

function decreaseQuantity(model: string) {
  const item = cart.getItems().find((item) => item.product.model === model);
  if (item) {
    cart.updateItemQuantity(model, item.quantity - 1);
  }
}

function removeItem(model: string) {
  cart.removeItem(model);
}

// Expõe as funções globalmente
(window as any).addTv = addTv;
(window as any).addCellPhone = addCellPhone;
(window as any).addBike = addBike;
(window as any).increaseQuantity = increaseQuantity;
(window as any).decreaseQuantity = decreaseQuantity;
(window as any).removeItem = removeItem;

// Vincula os botões de adicionar produto
document.getElementById("addTv")?.addEventListener("click", addTv);
document.getElementById("addCellPhone")?.addEventListener("click", addCellPhone);
document.getElementById("addBike")?.addEventListener("click", addBike);
