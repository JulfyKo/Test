class Shop {
  constructor() {
    this.products = [];
  }

  // Add product
  addProduct(product) {
    if (!product || !product.id || !product.name || typeof product.price !== "number") {
      throw new Error("Invalid product");
    }

    const exists = this.products.find(p => p.id === product.id);
    if (exists) {
      throw new Error("Product with this ID already exists");
    }

    this.products.push({
      ...product,
      createdAt: Date.now() // for mocking in tests
    });
  }

  // Get product by id
  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  // Remove product
  removeProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }

    this.products.splice(index, 1);
    return true;
  }

  // Get total price of all products
  getTotalPrice() {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  // Apply discount (percentage)
  applyDiscount(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error("Invalid discount percent");
    }

    this.products = this.products.map(p => ({
      ...p,
      price: p.price * (1 - percent / 100)
    }));
  }

  // Get expensive products
  getProductsAbovePrice(minPrice) {
    return this.products.filter(p => p.price > minPrice);
  }
}

module.exports = Shop;