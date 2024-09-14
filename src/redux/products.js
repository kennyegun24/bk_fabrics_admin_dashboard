// GET ALL PTODUCTS

import axios from "axios";

// GET ONE PRODUCT

// DELETE PRODUCT

// UPDATE PRODUCT

// CREATE PRODUCT
export const createProduct = async (
  {
    product_name,
    product_desc,
    price,
    in_stock,
    product_image,
    TOKEN,
    categories,
  },
  setAddItem
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
          Token: `Bearer ${TOKEN}`,
        },
      }
    );
    setAddItem("Item Uploaded");
  } catch (error) {
    setAddItem("Something went wrong creating product");
  }
};

export const createModifyShippingCost = async (
  { TOKEN, country, stateName, fee },
  setAddItem
) => {
  alert(TOKEN);
  try {
    const req = await axios.post(
      "https://bk-fabrics-server.vercel.app/api/shipping/new-fees",
      {
        country,
        stateName,
        fee,
      },
      {
        headers: {
          Token: `Bearer ${TOKEN}`,
        },
      }
    );
    setAddItem("Fee Uploaded");
  } catch (error) {
    console.log(error);
    setAddItem("Something went wrong creating product");
  }
};
