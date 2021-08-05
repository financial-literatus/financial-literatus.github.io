import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import React from "react";
import Logo from "./assets/icons/manual-edited.svg";

import "./style/App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { Education } from "./pages/Education";
import { Showcase } from "./pages/Showcase";
import Simulation from "./pages/Simulation";
import { Settings } from "./pages/Settings";
import { Welcome } from "./pages/Welcome";

import { useDispatch } from "react-redux";
import { toggleSettingsVisibility } from "./actions/mainActions";


function App(): JSX.Element {
  const dispatch = useDispatch();

  const onSettingsOpen = () => {
    dispatch(toggleSettingsVisibility(true))
  };
  
  return (
    <Router>
      <div className="Header-main">
        <div className="Logo">
          <img
            className="Logo-element"
            id="Logo-image"
            src={Logo}
            alt="Logo"
          ></img>
          <h3 className="Logo-element" id="Logo-text">
            Financial Literatus
          </h3>
        </div>
        <Menu
          className="App-header"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="horizontal"
          theme="light"
        >
          <Menu.Item className="Empty-element" id="empty-element">
          </Menu.Item>
          <Menu.Item className="App-header-child">
            <Link to="/education">Education</Link>
          </Menu.Item>
          <Menu.Item className="App-header-child">
            <Link to="/showcase">Showcase</Link>
          </Menu.Item>
          <Menu.Item className="App-header-child">
            <Link to="/simulation">Simulation</Link>
          </Menu.Item>
          <Menu.Item className="App-header-child" id="settings" onClick={onSettingsOpen} >
            <SettingOutlined/>
          </Menu.Item>
        </Menu>
      </div>
      <div className="Body">
        <Route path="/" />
        <Redirect to="/education"></Redirect>
        <Route path="/education" exact component={Education} />
        <Route path="/showcase" component={Showcase} />
        <Route path="/simulation" component={Simulation} />
      </div>
      <Settings></Settings>
      <Welcome></Welcome>
    </Router>
  );
}

export default App;
