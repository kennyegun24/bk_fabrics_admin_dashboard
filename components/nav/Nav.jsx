"use client";
import React, { useContext } from "react";
import styles from "./style.module.css";
import { FcStatistics } from "react-icons/fc";
import { FaProductHunt, FaUsersRectangle } from "react-icons/fa6";
import { FiDatabase } from "react-icons/fi";
import { IoPieChartOutline } from "react-icons/io5";
import { TfiDashboard } from "react-icons/tfi";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineHomeRepairService,
  MdSell,
} from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SettingsContext } from "@/context/Settings";
import { logout } from "@/redux/user";
import { useDispatch } from "react-redux";

const widgets = [
  {
    name: "Navigation",
    navs: [
      {
        icon: <TfiDashboard key={1} />,
        text: "Dashboard",
        link: "/",
      },
    ],
  },
  {
    name: "Widget",
    navs: [
      {
        icon: <FcStatistics key={2} />,
        link: "/dashboard/statistics",
        text: "Statistics",
      },
      {
        icon: <IoPieChartOutline key={5} />,
        link: "/dashboard/charts",
        text: "Chart",
      },
    ],
  },
  {
    name: "Forms",
    navs: [
      {
        icon: <IoMdAdd key={6} />,
        link: "/add/product",
        text: "Add product",
      },
      // {
      //   icon: <IoMdAdd key={7} />,
      //   link: "/add/service",
      //   text: "Add service",
      // },
      // {
      //   icon: <IoMdAdd key={7} />,
      //   link: "/add/user",
      //   text: "Add user",
      // },
      {
        icon: <IoMdAdd key={7} />,
        link: "/add/shipping_fee",
        text: "Add Shipping Fee",
      },
    ],
  },
  {
    name: "Tables",
    navs: [
      {
        icon: <MdOutlineProductionQuantityLimits key={8} />,
        text: "Products",
        link: "/dashboard/products",
      },
      // {
      //   icon: <MdOutlineHomeRepairService key={9} />,
      //   text: "Services",
      //   link: "/dashboard/services",
      // },
      {
        icon: <FaUsersRectangle key={3} />,
        link: "/dashboard/users",
        text: "Users",
      },
      // {
      //   icon: <MdSell key={3} />,
      //   link: "/dashboard/orders",
      //   text: "Orders",
      // },
    ],
  },
];

const Nav = () => {
  const pathName = usePathname();
  const { showCaption } = useContext(SettingsContext);
  const dispatch = useDispatch();
  const logoff = () => {
    dispatch(logout());
  };
  return (
    <nav className={styles.container}>
      <h1 className={styles.nav_header}>Welcome Boss!</h1>

      {widgets.map((widget, _) => (
        <div key={_} className={styles.navigation_container}>
          <h3
            className={
              showCaption ? styles.show_nav_caption : styles.hide_nav_caption
            }
          >
            {widget.name}
          </h3>

          <div className={styles.navigation_container2}>
            {widget.navs.map((widget, _) => (
              <Link
                className={
                  pathName === widget.link ? styles.active : styles.in_active
                }
                href={widget.link}
                key={_}
              >
                {widget.icon} {widget.text}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <button className={`padding05rem ${styles.active}`} onClick={logoff}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
