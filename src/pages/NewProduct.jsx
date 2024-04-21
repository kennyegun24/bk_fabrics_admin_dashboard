import { useState } from "react";
import image from "../images/fake_image.jpg";
import { CiCamera } from "react-icons/ci";
import ItemAdded from "../components/ItemAdded";
import Resizer from "react-image-file-resizer";
import { createProduct } from "../redux/products";
import axios from "axios";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
const NewProduct = ({ pending, setPending }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [addItem, setAddItem] = useState(null);
  const [items, setItems] = useState({
    product_name: "",
    product_desc: "",
    price: "",
    in_stock: "",
    categories: [],
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    if (e.target.name === "categories") {
      setItems((prev) => ({
        ...prev,
        categories: [e.target.value],
      }));
    } else {
      setItems((prev) => ({
        ...prev,

        [e.target.name]: e.target.value,
      }));
    }
  };
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  // const [pending, setPending] = useState(true);
  const submit = async (e) => {
    // setProgress(true);
    e.preventDefault();
    let validationError = {};
    setPending(true);
    if (items.product_name.trim() === "") {
      validationError.product_name = "Product name must be filled";
      setPending(false);
      // return false;
    }
    if (items.product_desc.trim() === "") {
      validationError.product_desc = "Product description must be filled";
      setPending(false);
      // return false;
    }
    if (items.price.trim() === "") {
      validationError.price = "Product price must be filled";
      setPending(false);
      // return false;
    }
    if (items.in_stock.trim() === "") {
      validationError.in_stock = "Stock number must be filled";
      setPending(false);
      // return false;
    }
    if (items.categories.length === 0) {
      setPending(false);
      // return false;
    }
    if (selectedImage === null) {
      setAddItem("You can't create a product without an image");
      setPending(false);
    } else {
      const file = selectedImage;
      // const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET
      const uploadPreset = "ml_default";
      // const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
      const cloud_name = "drfqge33t";

      const maxWidth = 800;
      const maxHeight = 800;
      const quality = 75;
      const fileType = "image/jpeg";

      Resizer.imageFileResizer(
        file,
        maxWidth,
        maxHeight,
        fileType,
        quality,
        0,
        async (resizedImage) => {
          const formData = new FormData();
          formData.append("file", resizedImage);
          formData.append("upload_preset", uploadPreset);

          try {
            const postCloudinary = await axios.post(
              `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
              formData
            );
            const imageUrl = postCloudinary.data.secure_url;
            await createProduct(
              {
                ...items,
                product_image: imageUrl,
                TOKEN: currentUser?.access_token,
              },
              setAddItem
            );
            setAddItem("Product successfully added");
            setPending(false);
            // setProgress(false);
          } catch (error) {
            setAddItem("Something went wrong uploading image");
            setPending(false);
          }
        },
        "base64"
      );
    }
    console.log(validationError);
    setError(validationError);
  };
  console.log(error);
  return (
    <div className="create_product_container">
      {addItem &&
        setTimeout(() => {
          setAddItem(false);
        }, 5000) && <ItemAdded text={addItem} />}
      <form
        onChange={(e) => handleChange(e)}
        className="create_product flex column gap1rem"
      >
        <h2 className="edtit_header">Create New Product</h2>
        <label htmlFor="upload_image" className="add_prod_image_container">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              className="add_product_image"
              alt=""
            />
          ) : (
            <img src={image} className="add_product_image" alt="" />
          )}
          <div className="cam_container flex align_center justify_center">
            <CiCamera size={24} className="cam_icon" />
          </div>
        </label>
        <input
          type="file"
          className="hide_field"
          name=""
          id="upload_image"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <div className="flex justify_between">
          <div style={{ width: "45%" }} className="flex column gap03rem">
            <label htmlFor="product_name">Product Name</label>

            <input
              className="edit_product_input"
              type="text"
              name="product_name"
              id="product_name"
            />
            {error?.product_name &&
              setTimeout(() => {
                setError(null);
              }, 5000) && (
                <span className="error_text">{error?.product_name}</span>
              )}
          </div>
          <div style={{ width: "45%" }} className="flex column gap03rem">
            <label htmlFor="product_name">Product Category</label>

            <input
              className="edit_product_input"
              type="text"
              name="categories"
              id="product_cat"
            />
            {error?.product_category &&
              setTimeout(() => {
                setError(null);
              }, 5000) && (
                <span className="error_text">{error?.product_category}</span>
              )}
          </div>
        </div>
        <div className="flex column gap03rem">
          <label htmlFor="product_name">Product Desc</label>

          <textarea
            className="edit_product_desc"
            type="text"
            name="product_desc"
            id="product_desc"
          />
          {error?.product_desc &&
            setTimeout(() => {
              setError(null);
            }, 5000) && (
              <span className="error_text">{error?.product_desc}</span>
            )}
        </div>
        <div className="flex justify_between">
          <div style={{ width: "45%" }} className="flex column gap03rem">
            <label htmlFor="">Price</label>
            <input
              className="edit_product_input"
              type="number"
              name="price"
              id="product_price"
            />
            {error?.price &&
              setTimeout(() => {
                setError(null);
              }, 5000) && <span className="error_text">{error?.price}</span>}
          </div>

          <div style={{ width: "45%" }} className="flex column gap03rem">
            <label htmlFor="">Price off</label>
            <input
              className="edit_product_input"
              type="number"
              name=""
              id="product_price_percentage"
            />
          </div>
        </div>

        <div className="flex column gap03rem">
          <label htmlFor="">Stock</label>

          <input
            className="edit_product_input"
            type="number"
            name="in_stock"
            id="product_stock"
          />
          {error?.in_stock &&
            setTimeout(() => {
              setError(null);
            }, 5000) && <span className="error_text">{error?.in_stock}</span>}
        </div>
        <div className="buttons">
          <button
            disabled={pending}
            className={`edit_order_status_btn ${pending && "disable"}`}
            onClick={!pending && submit}
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
