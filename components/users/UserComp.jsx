import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const arr = Array.from({ length: 5 });
const UsersCard = () => {
  return (
    <div className="sales_lines_chart_card height_70vh">
      <h3>Users</h3>
      <hr />
      <section className="users_lists">
        {arr.map((user, _) => (
          <section className="user" key={_}>
            <div className="user_list_name_container">
              <div className="img" />
              <p>
                Quinn Flynn <span>Mobile Developer</span>
              </p>
            </div>
            <p>11 may, 2024</p>

            <div className="check_cancel_svgs">
              <div>
                <IoClose color="#F44236" />
              </div>

              <div>
                <FaCheck color="#1DE9B6" />
              </div>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
};

export default UsersCard;
