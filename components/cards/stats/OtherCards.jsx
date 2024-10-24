import React from "react";
import "./style.css";

const OtherCards = ({ text, value, icon }) => {
  return (
    <div className="other_cards_container">
      <p>
        {icon} {text}
      </p>
      <p> {value}</p>
    </div>
  );
};

export default OtherCards;
