import React, { lazy, Suspense, useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import NotFoundPage from "containers/App/pages/NotFoundPage";
import ScrollToTop from "helpers/scrollToTop";

import { Layout } from "antd";
import PageHeader from "components/PageHeader";

const Headlines = lazy(() => import("containers/Headlines"));
const Everything = lazy(() => import("containers/Everything"));
const Sources = lazy(() => import("containers/Sources"));

const IndexPage = ({ match, location, history }) => {
  return (
    <ScrollToTop>
      <Layout style={{ minHeight: "100vh" }}>
        <PageHeader />
        <Layout style={{ padding: "1rem" }}>
          <Layout.Content
            style={{
              background: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Switch>
              <Redirect exact path="/" to="/facts" />
              <Route path={`/headlines`} component={Headlines} />
              <Route path={`/everything`} component={Everything} />
              <Route path={`/sources`} component={Sources} />
              <Route component={NotFoundPage} />
            </Switch>
          </Layout.Content>
        </Layout>
        <div style={{ padding: " 0 1rem 1rem", fontSize: "10px" }}>
          This demo use newsapi.org
        </div>
      </Layout>
    </ScrollToTop>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object
};

export default memo(IndexPage);
