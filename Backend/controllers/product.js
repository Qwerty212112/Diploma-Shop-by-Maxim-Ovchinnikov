const Product = require("../models/Product");

//add
async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });

  return newProduct;
}

//edit
async function editProduct(id, product) {
  const newProduct = await Product.findOneAndUpdate({ id }, product, {
    returnDocument: "after",
  });

  if (!newProduct) {
    return null;
  }

  await newProduct.populate({
    path: "comments",
    populate: "author",
  });
  return newProduct;
}
//delete
function deleteProduct(id) {
  return Product.deleteOne({ id });
}
//get list  with search and pagination
async function getPeoducts(search = "", limit = 10, page = 1, gender = "") {
  const parsedLimit = Math.max(1, Number(limit) || 10);
  const parsedPage = Math.max(1, Number(page) || 1);
  const query = { title: { $regex: search, $options: "i" } };
  if (gender) {
    query.gender = gender;
  }

  const [products, count] = await Promise.all([
    Product.find(query)
      .limit(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit)
      .sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  return {
    products,
    lastPage: Math.max(1, Math.ceil(count / parsedLimit)),
  };
}
//get item
function getProduct(id) {
  return Product.findOne({ id }).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getPeoducts,
  getProduct,
};
