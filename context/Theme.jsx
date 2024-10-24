"use client";
import { createContext } from "react";
import { ConfigProvider } from "antd";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider>
      <ConfigProvider
        theme={{
          token: {
            // colorText: "var(--primary_text_color)",
          },
          components: {
            Select: {
              colorBgElevated: "transparent",
              colorText: "#fff",
              colorBgContainer: "transparent",
              fontSize: 16,
              optionFontSize: 14,
              optionSelectedColor: "#000",
              padding: "1rem",
            },
            Radio: {
              fontSize: 12,
            },
            Input: {
              colorText: "#000",
              hoverBg: "transparent",
              activeBg: "transparent",
            },
            Upload: {
              actionsColor: "#fff",
            },
            Message: {
              colorText: "#fff",
              contentBg: "#000",
              contentPadding: "0.3rem",
            },
          },
        }}
      >
        <div className="">{children}</div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
// export default wrapper.useWrappedStore(ThemeProvider);
