const Shop = require('./class/classes');
const { product, capitalizeFirstLetter } = require('./class/product');

describe('capitalizeFirstLetter', () => {
  test('capitalizes string', () => {
    expect(capitalizeFirstLetter('category')).toBe('Category');
  });

  test('handles falsy', () => {
    expect(capitalizeFirstLetter('')).toBe('');
    expect(capitalizeFirstLetter(null)).toBe('');
  });
});

describe('product', () => {
  test('checks status', () => {
    const itemUsed = new product('Laptop', 1000, 1, 'tech', true);
    const itemNew = new product('Mouse', 50, 5, 'tech', false);

    expect(itemUsed.usedStatus).toBe('Yes');
    expect(itemNew.usedStatus).toBe('No');
  });

  test('renders html', () => {
    const item = new product('Laptop', 1000, 1, 'tech', true);
    const html = item.toHTMLRow();

    expect(html).toContain('<td>Laptop</td>');
    expect(html).toContain('<td>1000</td>');
    expect(html).toContain('<td>Tech</td>');
    expect(html).toContain('<td>Yes</td>');
  });
});

describe('Shop', () => {
  let shop;

  beforeEach(() => {
    shop = new Shop();
  });

  describe('addProduct', () => {
    test('validates input', () => {
      expect(() => shop.addProduct(null)).toThrow('Invalid product');
      expect(() => shop.addProduct({ id: 1, name: 'A' })).toThrow('Invalid product');
      expect(() => shop.addProduct({ name: 'A', price: 100 })).toThrow('Invalid product');
    });

    test('adds item', () => {
      const mockTimestamp = 1680000000000;
      jest.spyOn(Date, 'now').mockReturnValue(mockTimestamp);

      const item = { id: 1, name: 'Phone', price: 500 };
      shop.addProduct(item);

      expect(shop.products).toHaveLength(1);
      expect(shop.products[0]).toEqual({ ...item, createdAt: mockTimestamp });

      jest.restoreAllMocks();
    });

    test('prevents duplicates', () => {
      const item = { id: 1, name: 'Phone', price: 500 };
      shop.addProduct(item);

      expect(() => shop.addProduct(item)).toThrow('Product with this ID already exists');
    });
  });

  describe('retrieval and removal', () => {
    beforeEach(() => {
      shop.addProduct({ id: 1, name: 'Phone', price: 500 });
    });

    test('gets product', () => {
      expect(shop.getProductById(1).name).toBe('Phone');
    });

    test('throws error', () => {
      expect(() => shop.getProductById(99)).toThrow('Product not found');
      expect(() => shop.removeProduct(99)).toThrow('Product not found');
    });

    test('removes product', () => {
      const result = shop.removeProduct(1);
      expect(result).toBe(true);
      expect(shop.products).toHaveLength(0);
    });
  });

  describe('calculations', () => {
    beforeEach(() => {
      shop.addProduct({ id: 1, name: 'Phone', price: 500 });
      shop.addProduct({ id: 2, name: 'Case', price: 50 });
    });

    test('sums price', () => {
      expect(shop.getTotalPrice()).toBe(550);
    });

    test('filters price', () => {
      const list = shop.getProductsAbovePrice(100);
      expect(list).toHaveLength(1);
      expect(list[0].id).toBe(1);
    });

    test('applies discount', () => {
      shop.applyDiscount(10);
      expect(shop.products[0].price).toBe(450);
      expect(shop.products[1].price).toBe(45);

      expect(() => shop.applyDiscount(-1)).toThrow('Invalid discount percent');
      expect(() => shop.applyDiscount(101)).toThrow('Invalid discount percent');
    });
  });
});