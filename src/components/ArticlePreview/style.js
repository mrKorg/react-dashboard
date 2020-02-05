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
   margin-bottom: .5rem;
   line-height: normal;
  }
`;

export const Link = styled.a`
  &&& {
    color: #1890ff;
    transition: opacity .3s ease;

    .ant-typography {
      color: inherit;
    }

    &:hover {
      opacity: .5;
    }
  }
`;
