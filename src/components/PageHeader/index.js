import React from "react";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { Typography, Menu } from "antd";

const menu = [
  { to: "/headlines", text: "Headlines" },
  { to: "/everything", text: "Everything" },
  { to: "/sources", text: "Sources" }
];

const PageHeader = ({ location }) => {
  const metaTitle =
    menu.find(item => item.to === location.pathname)?.text || null;

  return (
    <HeaderContainer>
      <Helmet>
        <title>{metaTitle ? `${metaTitle} | ` : ""}React News Demo</title>
      </Helmet>
      <Typography.Title>React News Demo</Typography.Title>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        style={{ borderBottom: "none" }}
      >
        {menu?.length &&
          menu.map(item => (
            <Menu.Item key={item.to}>
              <Link to={item.to}>{item.text}</Link>
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
`;
