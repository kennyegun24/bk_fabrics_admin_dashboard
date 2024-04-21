// GET ALL PTODUCTS

import axios from "axios";

// GET ONE PRODUCT

// DELETE PRODUCT

// UPDATE PRODUCT

// CREATE PRODUCT
export const createProduct = async (
  { product_name, product_desc, price, in_stock, product_image, TOKEN },
  setAddItem,
  categories
) => {
  try {
    const req = await axios.post(
      "https://bk-fabrics-server.vercel.app/api/product/create",
      {
        product_name,
        product_desc,
        price,
        in_stock,
        product_image,
        categories,
      },
      {
        headers: {
          Token: `${TOKEN}`,
        },
      }
    );
    setAddItem("Item Uploaded");
  } catch (error) {
    setAddItem("Something went wrong creating product");
  }
};
