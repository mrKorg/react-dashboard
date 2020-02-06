import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { Typography, Menu } from "antd";

const menu = [
  {
    key: "headlines",
    text: "Headlines"
  },
  {
    key: "everything",
    text: "Everything"
  },
  {
    key: "sources",
    text: "Sources"
  }
];

const PageHeader = ({ location }) => {
  const [selectedMenu, setSelectedMenu] = useState([]);
  const metaTitle =
    menu.find(item => item.key === location.pathname)?.text || null;

  useEffect(() => {
    const activeMenuItem = menu.find(element => location.pathname.includes(element.key));
    if (activeMenuItem && activeMenuItem.key) {
      setSelectedMenu(activeMenuItem.key);
    }
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <Helmet>
        <title>{metaTitle ? `${metaTitle} | ` : ""}React News Demo</title>
      </Helmet>
      <Typography.Title>React News Demo</Typography.Title>
      <Menu
        mode="horizontal"
        selectedKeys={[selectedMenu]}
        style={{ borderBottom: "none" }}
      >
        {menu?.length &&
          menu.map(item => (
            <Menu.Item key={item.key}>
              <Link to={`/${item.key}`}>{item.text}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </HeaderContainer>
  );
};

PageHeader.propTypes = {};

export default withRouter(PageHeader);

const HeaderContainer = styled.div`
  padding: 2rem 2rem 0;
  background: white;
  text-align: center;
`;
