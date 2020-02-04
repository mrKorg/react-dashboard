import React, { memo } from "react";
import { FormikConsumer } from "formik";
import styled from "styled-components";

const FormDebug = () =>
  process.env.NODE_ENV === "development" ? (
    <Wrapper>
      <Header>Form State</Header>
      <FormikConsumer>
        {({ values, errors }) => (
          <Pre>{JSON.stringify({ values, errors }, null, 2)}</Pre>
        )}
      </FormikConsumer>
    </Wrapper>
  ) : null;

export default memo(FormDebug);

const Wrapper = styled.div`
  margin: 3rem 0;
  border-radius: 4px;
  background-color: #f6f8fa;
  box-shadow: 0 0 1px #eee inset;
`;

const Header = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0.5rem 1rem;
  background: #555;
  color: white;
`;

const Pre = styled.pre`
  font-size: 0.65rem;
  padding: 0.5rem 1rem;
  overflow-x: scroll;
`;
