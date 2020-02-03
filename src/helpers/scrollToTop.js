import React from "react";
import { withRouter } from "react-router";

export const scrollTo = (top = 0, left = 0) => {
  try {
    window.scrollTo({ top, left, behavior: "smooth" });
  } catch (err) {
    if (err instanceof TypeError) {
      window.scroll(top, left);
    } else {
      throw err;
    }
  }
};

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scrollTo();
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
