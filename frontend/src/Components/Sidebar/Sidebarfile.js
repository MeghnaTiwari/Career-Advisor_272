import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import "./Sidebarfile.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Sidebarfile extends Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="body">
        <div style={{ width: 245 }}>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            id="sidebarmenu"
          >
            <Menu
              defaultSelectedKeys={["2"]}
              defaultOpenKeys={["sub2"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Button
                type="primary"
                onClick={this.toggleCollapsed}
                id="togglebutton"
              >
                <Icon
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                />
              </Button>
            </Menu>
            <Menu.Item key="1">
              <Link to="/home">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/courses">
                <Icon type="read" />
                <span>Courses For You</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="6">
              <Link to="/skills">
                <Icon type="file-done" />
                <span>Skillset For You</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/certification">
                <Icon type="file-protect" />
                <span>Certifications For You</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/events">
                <Icon type="calendar" />
                <span>Events For You</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/trending">
                <Icon type="bar-chart" />
                <span>Trending...</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Sidebarfile;

