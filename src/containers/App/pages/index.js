import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "helpers/scrollToTop";
import { Layout } from "antd";
import NotFoundPage from "containers/App/pages/NotFoundPage";
import PageHeader from "components/PageHeader";
import Headlines from "containers/Headlines";
import Everything from "containers/Everything";
import Sources from "containers/Sources";

const IndexPage = () => {
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
