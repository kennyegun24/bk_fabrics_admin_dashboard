import React from "react";
import { FcStatistics } from "react-icons/fc";
import { FcSalesPerformance } from "react-icons/fc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { logout } from "../redux/user";
import { useDispatch } from "react-redux";

const nav = [
  {
    link: "/",
    name: "Users",
    icon: <FaUsers size={26} />,
  },
  {
    link: "/products",
    name: "Products",
    icon: <MdOutlineProductionQuantityLimits size={26} />,
  },
  {
    link: "/orders",
    name: "Orders",
    icon: <FcSalesPerformance size={26} />,
  },
  {
    link: "/statistics",
    name: "Statistics",
    icon: <FcStatistics size={26} />,
  },
  {
    link: "/product/new",
    name: "New Product",
    icon: <FaCartPlus size={26} />,
  },
];
const Side_nav = () => {
  const pathName = window.location.pathname;
  const dispatch = useDispatch();
  return (
    <div className="flex justify_between column nav_menu">
      <div className="flex column gap05rem">
        {nav.map((menu, _index) => (
          <a
            href={menu.link}
            className={`flex align_center gap05rem padding05rem ${
              pathName === menu.link && "active_menu"
            }`}
          >
            {menu.icon}
            <p className="font14">{menu.name}</p>
          </a>
        ))}
      </div>
      <button
        className={`flex align_center gap05rem padding05rem logout_btn pointer`}
        onClick={() => dispatch(logout())}
      >
        <AiOutlineLogout size={26} />
        <p className="font14">Logout</p>
      </button>
    </div>
  );
};

export default Side_nav;
