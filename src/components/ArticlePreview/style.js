import { Typography } from "antd";
import styled from "styled-components";

export const Title = styled(Typography.Title)`
  &&& {
    font-size: 16px;
    margin-bottom: 1rem;
  }
`;

export const Text = styled(Typography.Text)`
  &&& {
    font-size: 12px;
  }
`;

export const Paragraph = styled(Typography.Paragraph)`
  &&& {
    font-size: 12px;
    margin-bottom: 0.5rem;
    line-height: normal;
  }
`;
