import React from "react";
// import "./style.css";
import { BsCash } from "react-icons/bs";

const SalesLines = ({ total }) => {
  return (
    <div className="sales_lines_chart_card height_50vh">
      <h3>Sales chart</h3>
      <hr />
      <div className="chart_container">
        <div className="cash_icon_container">
          <BsCash color="#069DE3" />
        </div>
        <p>
          Earnings so far <span>₵{total}</span>
        </p>
      </div>
    </div>
  );
};

export default SalesLines;
