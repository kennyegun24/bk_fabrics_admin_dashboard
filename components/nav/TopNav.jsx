"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./top_nav.module.css";
import { CiSearch, CiSettings } from "react-icons/ci";
import { FaBars, FaMoon } from "react-icons/fa";
import { GoSun, GoCpu, GoGear } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation";
import { SettingsContext } from "@/context/Settings";

const TopNav = ({ setFullScreen }) => {
  const pathname = usePathname()
    .split("/")
    .filter((each) => each !== "");
  const capFirst =
    pathname.length > 0 ? pathname[0].charAt(0).toUpperCase() : "D";
  const remainingStr =
    pathname.length > 0 ? pathname[0].substring(1) : "ashboard";
  const capSec =
    pathname.length > 1 ? pathname[1].charAt(0).toUpperCase() : "H";
  const remainingSecStr =
    pathname.length > 1 ? pathname[1].substring(1) : "ome";
  const firstPath = capFirst + remainingStr;
  const secondPath = capSec + remainingSecStr;

  const [toggle, setToggle] = useState(false);
  const { setShowSettings } = useContext(SettingsContext);
  const popRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <div className={styles.search_container}>
          <FaBars
            onClick={() => setFullScreen((prev) => !prev)}
            color="#6F747F"
            size={20}
          />
          <div className={styles.input_container}>
            <CiSearch size={20} color="#3C4754" />
            <input
              className={styles.search_input}
              placeholder="Search..."
              type="search"
              id=""
            />
          </div>
        </div>

        <div className={styles.search_container}>
          <div className={styles.light_mode_div} ref={popRef}>
            <GoSun
              onClick={() => setToggle((prev) => !prev)}
              color="#6F747F"
              size={24}
            />
            {toggle && (
              <div>
                <p>
                  <GoSun color="#9d9d9d" size={16} />
                  Light
                </p>
                <p>
                  <FaMoon color="#9d9d9d" size={16} />
                  Dark
                </p>
                <p>
                  <GoCpu color="#9d9d9d" size={16} />
                  Default
                </p>
              </div>
            )}
          </div>

          <div
            className={styles.gear_container}
            onClick={() => setShowSettings(true)}
          >
            <GoGear color="#6f747f" size={24} />
          </div>
          <div className={styles.img} />
        </div>
      </div>

      <div className={styles.tab_text}>
        <h5>Home</h5>
        <MdOutlineKeyboardArrowRight />
        <h5>{firstPath}</h5>
        <MdOutlineKeyboardArrowRight />
        <h5>{secondPath}</h5>
      </div>
    </div>
  );
};

export default TopNav;
