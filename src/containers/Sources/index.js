import React from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import NotFoundPage from "containers/App/pages/NotFoundPage";
import CounterPage from "containers/Sources/pages/Counter";
import GraphPage from "containers/Sources/pages/Graph";
import { Menu, Layout } from "antd";

const Sources = ({ match, location }) => (
  <Layout>
    <Layout.Sider theme="white" width={100}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: "100%", textAlign: "right" }}
      >
        <Menu.Item key={`${match.url}/counter`}>
          <NavLink to={`${match.url}/counter`}>Counter</NavLink>
        </Menu.Item>
        <Menu.Item key={`${match.url}/graph`}>
          <NavLink to={`${match.url}/graph`}>Graphs</NavLink>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
    <Layout>
      <Layout.Content style={{ padding: 16, background: "white" }}>
        <Switch>
          <Redirect
            exact
            path={`${match.path}`}
            to={`${match.path}/counter`}
          />
          <Route path={`${match.path}/counter`} component={CounterPage} />
          <Route path={`${match.path}/graph`} component={GraphPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout.Content>
    </Layout>
  </Layout>
);

export default Sources;
