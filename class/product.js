class product {
    constructor(name, price, quantity, category, isUsed) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
        this.isUsed = isUsed;
    }

    get usedStatus() {
        return this.isUsed ? 'Yes' : 'No';
    }

    toHTMLRow() {
        return `<tr>
                    <td>${this.name}</td>
                    <td>${this.price}</td>
                    <td>${this.quantity}</td>
                    <td>${capitalizeFirstLetter(this.category)}</td>
                    <td>${this.usedStatus}</td>
                </tr>`;
    }
}

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
module.exports = { product, capitalizeFirstLetter };