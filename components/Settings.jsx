import React, { useContext, useRef } from "react";
import "./style.css";
import { IoIosClose } from "react-icons/io";
import { SettingsContext } from "@/context/Settings";
import dark from "@/public/dark.svg";
import white2 from "@/public/white2.svg";
import caption from "@/public/caption.svg";
import Image from "next/image";
import { Input, Radio } from "@mui/material";
import rtl from "@/public/rtl.svg";

const Settings = () => {
  const {
    showSettings,
    setShowSettings,
    appDirection,
    ltr,
    shouldShowCaption,
    showCaption,
  } = useContext(SettingsContext);
  const settingsRef = useRef();
  const closeSettings = (e) => {
    if (settingsRef.current && !settingsRef.current.contains(e.target)) {
      setShowSettings(false);
    }
  };

  return (
    <div
      onClick={closeSettings}
      className={`settings_container ${
        showSettings ? "show_settings" : "time_delay_hide hide_settings"
      }`}
    >
      <div
        className={`settings_content_container ${
          showSettings ? "time_show show_settings" : "time_hide hide_settings"
        }`}
        ref={settingsRef}
      >
        <section className="settings_header">
          <h4>Settings</h4>
          <div className="settings_close_div">
            <IoIosClose
              size={30}
              color="#c32323"
              onClick={() => setShowSettings(false)}
            />
          </div>
        </section>

        <div className="settings_content_div">
          <section className="settings_content">
            <div className="settings_content_header">
              <h5>Theme Mode</h5>
              <p>Choose light mode or dark</p>
            </div>

            <form className="settings_body">
              <section>
                <div>
                  <Input type="radio" name="radio_btn1" />
                  <p>Light</p>
                </div>
                <Image src={white2} className="settings_img" />
              </section>
              <section className="selected_setting">
                <div>
                  <Input type="radio" name="radio_btn1" />
                  <p>Dark</p>
                </div>
                <Image src={dark} className="settings_img" />
              </section>
            </form>
          </section>
          <section className="settings_content">
            <section className="settings_content_header">
              <h5>Sidebar Caption</h5>
              <p>Sidebar Caption Show/Hide</p>
            </section>
            <form className="settings_body">
              <section
                className={`${!showCaption && "selected_setting"}`}
                onClick={() => shouldShowCaption(false)}
              >
                <div>
                  <input
                    readOnly
                    checked={!showCaption}
                    type="radio"
                    name="radio_btn1"
                  />
                  <p>Caption Close</p>
                </div>
                <Image src={dark} className="settings_img" />
              </section>
              <section
                className={`${showCaption && "selected_setting"}`}
                onClick={() => shouldShowCaption(true)}
              >
                <div>
                  <input
                    readOnly
                    checked={showCaption}
                    type="radio"
                    name="radio_btn1"
                  />
                  <p>Caption Open</p>
                </div>
                <Image src={caption} className="settings_img" />
              </section>
            </form>
          </section>
          <section className="settings_content">
            <section className="settings_content_header">
              <h5>Theme Layout</h5>
              <p>LTR/RTL</p>
            </section>

            <form className="settings_body">
              <section
                className={`${ltr === "ltr" && "selected_setting"}`}
                onClick={() => appDirection("ltr")}
              >
                <div>
                  <input
                    readOnly
                    checked={ltr === "ltr"}
                    type="radio"
                    name="radio_btn1"
                  />
                  <p>LTR</p>
                </div>
                <Image src={dark} className="settings_img" />
              </section>
              <section
                className={`${ltr === "rtl" && "selected_setting"}`}
                onClick={() => appDirection("rtl")}
              >
                <div>
                  <input
                    readOnly
                    checked={ltr === "rtl"}
                    type="radio"
                    name="radio_btn1"
                  />
                  <p>RTL</p>
                </div>
                <Image src={rtl} className="settings_img" />
              </section>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
