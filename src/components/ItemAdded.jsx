import React from "react";

const ItemAdded = ({ text }) => {
  return (
    <div
      className={`item_added_container ${
        text.toLowerCase() === "product successfully added" ||
        text.toLowerCase() === "delivery status updated successfully" ||
        text.toLowerCase() === "product successfully edited"
          ? // text.toLowerCase() === "product deleted"
            "green"
          : "red"
      }`}
    >
      {text}
    </div>
  );
};

export default ItemAdded;
