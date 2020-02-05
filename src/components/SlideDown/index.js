import React from "react";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

export default function SlideDownComponent(props) {
  return (
    <SlideDown className={"my-dropdown-slidedown"}>
      {props.open ? props.children : null}
    </SlideDown>
  );
}
