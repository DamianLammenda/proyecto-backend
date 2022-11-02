//inicializa el array con un producto de ejemplo.
//Comentar los ejemplos para visualizar el alert del error.
let products = [
  {
    name: "Bitcoin",
    price: 20000,
    thumbnail:
      "https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitcoincash_bch_bitcoin-64.png",
  },
  {
    name: "Ethereum",
    price: 1500,
    thumbnail:"https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-64.png"
  }
];

//class de productos
class Products {
  constructor() {}
  getproduct() {
    return products;
  }
  saveProduct(product) {
    products.push(product);
    return products;
  }
}
module.exports = Products;
