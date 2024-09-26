import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ConfigProvider } from "antd";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "reduxConfig/store";
const rootElement = (
  <ConfigProvider
    theme={{
      token: {
        colorLink: "#1677ff",
        colorPrimary: "#AAB396",
        colorInfo: "#129496",
      },
    }}
  >
    <Provider store={store}>
      <Router />
    </Provider>
  </ConfigProvider>
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if (process.env.NODE_ENV === "development")
  root.render(<React.StrictMode>{rootElement}</React.StrictMode>);
else root.render(<>{rootElement}</>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
